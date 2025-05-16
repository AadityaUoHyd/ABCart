"use server";

import stripe from "@/lib/stripe";
import Stripe from "stripe";
import { urlFor } from "@/sanity/lib/image";
import { CartItem } from "@/store";

export interface Metadata {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  clerkUserId: string;
  customerAddress: {
    line1: string;
    city: string;
    state: string;
    postalCode: string;
    country: string; // Use 2-letter country code, e.g., "IN"
  };
}

export interface GroupedCartItems {
  product: CartItem["product"];
  quantity: number;
}

export async function createCheckoutSession(
    items: GroupedCartItems[],
    metadata: Metadata
) {
  try {
    // Validate address
    const { customerAddress } = metadata;
    if (customerAddress.country !== "IN") {
      throw new Error("Country must be India (IN) for INR payments");
    }
    if (!/^\d{6}$/.test(customerAddress.postalCode)) {
      throw new Error("Postal code must be a 6-digit number");
    }
    if (!customerAddress.line1 || !customerAddress.city || !customerAddress.state) {
      throw new Error("Address is missing required fields");
    }

    // Validate if any grouped items don't have a price
    const itemsWithoutPrice = items.filter((item) => !item.product.price);
    if (itemsWithoutPrice.length > 0) {
      throw new Error("Some items do not have a price");
    }

    // Retrieve an existing customer or create a new one
    const customers = await stripe.customers.list({
      email: metadata.customerEmail,
      limit: 1,
    });

    const customerId = customers.data.length > 0 ? customers.data[0].id : "";

    const sessionPayload: Stripe.Checkout.SessionCreateParams = {
      metadata: {
        orderNumber: metadata.orderNumber,
        customerName: metadata.customerName,
        customerEmail: metadata.customerEmail,
        clerkUserId: metadata.clerkUserId,
      },
      billing_address_collection: "required",
      mode: "payment",
      allow_promotion_codes: true,
      payment_method_types: ["card"],
      success_url: `${
          process.env.NEXT_PUBLIC_BASE_URL || `https://${process.env.VERCEL_URL}`
      }/success?session_id={CHECKOUT_SESSION_ID}&orderNumber=${metadata.orderNumber}`,
      cancel_url: `${
          process.env.NEXT_PUBLIC_BASE_URL || `https://${process.env.VERCEL_URL}`
      }/cart`,
      line_items: items.map((item) => ({
        price_data: {
          currency: "INR",
          unit_amount: Math.round(item.product.price! * 100), // in paise
          product_data: {
            name: item.product.name || "Unnamed Product",
            description: item.product.description,
            metadata: { id: item.product._id },
            images: item.product.image
                ? [urlFor(item.product.image).url()]
                : undefined,
          },
        },
        quantity: item.quantity,
      })),
      payment_intent_data: {
        description: `Order ${metadata.orderNumber} by ${metadata.customerName}`,
        receipt_email: metadata.customerEmail,
        shipping: {
          name: metadata.customerName,
          address: {
            line1: customerAddress.line1,
            city: customerAddress.city,
            state: customerAddress.state,
            postal_code: customerAddress.postalCode,
            country: customerAddress.country,
          },
        },
      },
    };

    // Conditionally add customer or customer_email
    if (customerId) {
      sessionPayload.customer = customerId;
    } else {
      sessionPayload.customer_email = metadata.customerEmail;
    }

    const session = await stripe.checkout.sessions.create(sessionPayload);

    return session.url;
  } catch (error) {
    console.error("Error creating checkout session:", error);
    throw error;
  }
}