import nodemailer from 'nodemailer';

interface OrderEmailData {
    orderNumber: string;
    customerName: string;
    customerEmail: string;
    totalPrice: number;
    currency: string;
    products: { name: string; quantity: number }[];
    orderDate: string;
}

export async function sendOrderConfirmationEmail(data: OrderEmailData) {
    const { orderNumber, customerName, customerEmail, totalPrice, currency, products, orderDate } = data;

    // Validate email
    if (!customerEmail || !/\S+@\S+\.\S+/.test(customerEmail)) {
        const error = new Error(`Invalid customer email: ${customerEmail}`);
        console.error(`Error sending email for order ${orderNumber}:`, error);
        throw error;
    }

    // Validate SMTP credentials
    if (!process.env.SMTP_EMAIL || !process.env.SMTP_APP_PASSWORD) {
        const error = new Error('SMTP_EMAIL or SMTP_APP_PASSWORD not set');
        console.error(`Error sending email for order ${orderNumber}:`, error);
        throw error;
    }

    // Log SMTP credentials (obfuscated)
    console.log(`SMTP config: Email=${process.env.SMTP_EMAIL}, App Password=${process.env.SMTP_APP_PASSWORD ? 'Set' : 'Missing'}`);

    // Create transporter with explicit TLS settings
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.SMTP_APP_PASSWORD,
        },
        tls: {
            rejectUnauthorized: true,
        },
    });

    // Verify SMTP connection
    try {
        await transporter.verify();
        console.log(`SMTP connection verified for order ${orderNumber}`);
    } catch (error) {
        console.error(`SMTP connection failed for order ${orderNumber}:`, error instanceof Error ? error.message : 'Unknown error', error instanceof Error ? error.stack : '');
        throw new Error(`SMTP verification failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }

    // HTML email template with pink-white theme
    const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #fff1f2;">
      <h1 style="color: #4b5563; font-size: 24px; text-align: center;">Order Confirmation</h1>
      <p style="color: #6b7280;">Dear ${customerName},</p>
      <p style="color: #6b7280;">Thank you for your order with ABCart! Your order has been successfully placed.</p>
      <h2 style="color: #4b5563; font-size: 18px; margin-top: 20px;">Order Details</h2>
      <p style="color: #6b7280;"><strong>Order Number:</strong> ${orderNumber}</p>
      <p style="color: #6b7280;"><strong>Order Date:</strong> ${new Date(orderDate).toLocaleDateString()}</p>
      <p style="color: #6b7280;"><strong>Total:</strong> ${currency} ${(totalPrice || 0).toFixed(2)}</p>
      <h3 style="color: #4b5563; font-size: 16px; margin-top: 20px;">Items Ordered</h3>
      <ul style="color: #6b7280; padding-left: 20px;">
        ${products.map((item) => `<li>${item.name} (Qty: ${item.quantity})</li>`).join('')}
      </ul>
      <p style="color: #6b7280; margin-top: 20px;">We'll notify you when your order ships. If you have any questions, contact us at <a href="mailto:${process.env.SMTP_EMAIL}" style="color: #ec4899;">${process.env.SMTP_EMAIL}</a>.</p>
      <p style="color: #6b7280; text-align: center; margin-top: 20px;">© ABCart</p>
    </div>
  `;

    try {
        const info = await transporter.sendMail({
            from: `"ABCart" <${process.env.SMTP_EMAIL}>`,
            to: customerEmail,
            subject: `Your ABCart Order Confirmation - ${orderNumber}`,
            html: htmlContent,
        });
        console.log(`Email sent to ${customerEmail} for order ${orderNumber}: Message ID ${info.messageId}`);
        return info;
    } catch (error) {
        console.error(`Email sending failed for order ${orderNumber} to ${customerEmail}:`, error instanceof Error ? error.message : 'Unknown error', error instanceof Error ? error.stack : '');
        throw new Error(`Email sending failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}