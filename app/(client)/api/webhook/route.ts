import { Metadata } from "@/actions/createCheckoutSession";
import stripe from "@/lib/stripe";
import { backendClient } from "@/sanity/lib/backendClient";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { sendOrderConfirmationEmail } from "@/lib/sendEmail";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const headersList = await headers();
  const sig = headersList.get("stripe-signature");

  console.log("Webhook received with body length:", body.length);

  if (!sig) {
    console.error("No signature provided");
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error("Stripe webhook secret is not set");
    return NextResponse.json({ error: "Stripe webhook secret is not set" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    console.log("Webhook event constructed:", event.type, "ID:", event.id);
  } catch (error) {
    console.error("Webhook signature verification failed:", error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json({ error: `Webhook Error: ${error instanceof Error ? error.message : 'Unknown error'}` }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    try {
      console.log("Processing checkout.session.completed for session:", session.id);

      // Log metadata
      console.log("Session metadata:", JSON.stringify(session.metadata, null, 2));

      // Validate metadata
      const { orderNumber, customerName, customerEmail, clerkUserId } = session.metadata as unknown as Metadata;
      if (!orderNumber || !customerName || !customerEmail || !clerkUserId) {
        console.error("Missing metadata fields:", { orderNumber, customerName, customerEmail, clerkUserId });
        throw new Error("Missing required metadata fields");
      }

      const order = await createOrderInSanity(session);
      console.log("Order created in Sanity:", order._id, order.orderNumber);

      // Send email
      if (!/\S+@\S+\.\S+/.test(customerEmail)) {
        console.error(`Invalid customer email for order ${order.orderNumber}: ${customerEmail}`);
        throw new Error("Invalid customer email");
      }

      await sendOrderConfirmationEmail({
        orderNumber: order.orderNumber,
        customerName: order.customerName,
        customerEmail: order.email,
        totalPrice: order.totalPrice,
        currency: order.currency || 'INR',
        products: order.products.map((item: { product?: { _ref: string }; quantity: number }) => ({
          name: `Product ID: ${item.product?._ref || 'Unknown'}`,
          quantity: item.quantity,
        })),
        orderDate: order.orderDate,
      });
      console.log(`Email sent successfully for order ${order.orderNumber}`);
    } catch (error) {
      console.error("Error processing webhook:", error instanceof Error ? error.message : 'Unknown error', error instanceof Error ? error.stack : '');
      return NextResponse.json({ error: `Error processing webhook: ${error instanceof Error ? error.message : 'Unknown error'}` }, { status: 500 });
    }
  } else {
    console.log("Unhandled event type:", event.type);
  }

  return NextResponse.json({ received: true });
}

interface SanityOrder {
  _id: string;
  _type: string;
  orderNumber: string;
  stripeCheckoutSessionId: string;
  stripePaymentIntentId?: string;
  customerName: string;
  stripeCustomerId: string;
  clerkUserId: string;
  email: string;
  currency: string;
  amountDiscount: number;
  products: Array<{
    _key: string;
    quantity: number;
    product?: {
      _type: string;
      _ref: string;
    };
  }>;
  totalPrice: number;
  status: string;
  orderDate: string;
}

async function createOrderInSanity(session: Stripe.Checkout.Session, retryCount = 0): Promise<SanityOrder> {
  const maxRetries = 2;
  console.log("Creating order in Sanity for session:", session.id, "Retry:", retryCount);

  const {
    id,
    amount_total,
    currency,
    metadata,
    payment_intent,
    total_details,
  } = session;

  const { orderNumber, customerName, customerEmail, clerkUserId } = metadata as unknown as Metadata;

  console.log("Metadata:", { orderNumber, customerName, customerEmail, clerkUserId });

  const lineItemsWithProduct = await stripe.checkout.sessions.listLineItems(id, {
    expand: ["data.price.product"],
  });

  console.log("Line items retrieved:", lineItemsWithProduct.data.length);

  // Create Sanity product entries defensively
  const sanityProducts = lineItemsWithProduct.data.map((item, index) => {
    const productId = (item.price?.product as Stripe.Product)?.metadata?.id;
    console.log(`Line item ${index}: Product ID=${productId || 'missing'}, Name=${(item.price?.product as Stripe.Product)?.name || 'Unknown'}`);
    return {
      _key: crypto.randomUUID(),
      quantity: item?.quantity || 0,
      ...(productId ? { product: { _type: "reference", _ref: productId } } : {}),
    };
  }).filter(item => item.quantity > 0);

  console.log("Sanity products prepared:", JSON.stringify(sanityProducts, null, 2));

  // Log Sanity configuration
  console.log("Sanity config:", {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    token: process.env.SANITY_API_TOKEN ? 'Set' : 'Missing',
  });

  try {
    const order = await backendClient.create({
      _type: "order",
      orderNumber,
      stripeCheckoutSessionId: id,
      stripePaymentIntentId: typeof payment_intent === 'string' ? payment_intent : payment_intent?.id,
      customerName,
      stripeCustomerId: session.customer ? String(session.customer) : customerEmail,
      clerkUserId,
      email: customerEmail,
      currency: currency || 'INR',
      amountDiscount: total_details?.amount_discount ? total_details.amount_discount / 100 : 0,
      products: sanityProducts,
      totalPrice: amount_total ? amount_total / 100 : 0,
      status: "paid",
      orderDate: new Date().toISOString(),
    });
    console.log("Order successfully created:", order._id, order.orderNumber);
    return order;
  } catch (sanityError) {
    console.error("Failed to create order in Sanity:", sanityError instanceof Error ? sanityError.message : 'Unknown error', sanityError instanceof Error ? sanityError.stack : '');
    if (retryCount < maxRetries) {
      console.log(`Retrying Sanity create (attempt ${retryCount + 2})`);
      await new Promise(resolve => setTimeout(resolve, 1000));
      return createOrderInSanity(session, retryCount + 1);
    }
    throw new Error(`Sanity create failed after ${maxRetries} retries: ${sanityError instanceof Error ? sanityError.message : 'Unknown error'}`);
  }
}