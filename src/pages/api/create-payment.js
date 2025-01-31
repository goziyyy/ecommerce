import { Xendit } from 'xendit-node';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './auth/[...nextauth]';
import fs from 'fs/promises';
import path from 'path';

const xenditClient = new Xendit({
  secretKey: process.env.XENDIT_SECRET_KEY,
});

const { Invoice } = xenditClient;
const ordersFilePath = path.join(process.cwd(), 'src/data/orders.json');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { items, totalAmount } = req.body;
    const orderId = `ORDER-${Date.now()}-${Math.random().toString(36).substr(2, 8)}`;

    // Use NEXT_PUBLIC_BASE_URL if set, otherwise fallback to request headers
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || (() => {
      const protocol = req.headers['x-forwarded-proto'] || 'http';
      const host = req.headers['x-forwarded-host'] || req.headers.host;
      return `${protocol}://${host}`;
    })();

    // Create invoice data
    const data = {
      amount: totalAmount,
      invoiceDuration: 86400,
      externalId: orderId,
      description: "Order payment",
      currency: "IDR",
      reminderTime: 1,
      customer: {
        email: session.user.email,
        givenNames: session.user.name
      },
      successRedirectUrl: `https://a746-114-10-79-54.ngrok-free.app/order-success?orderId=${orderId}`,
      failureRedirectUrl: `https://a746-114-10-79-54.ngrok-free.app/order-failed?orderId=${orderId}`,
      paymentMethods: ["BCA", "BNI", "BRI", "MANDIRI", "PERMATA", "BSI", "OVO", "DANA", "SHOPEEPAY", "QRIS"],
    };

    // Create invoice in Xendit
    const invoice = await Invoice.createInvoice({ data });

    // Read existing orders
    let ordersData = { orders: [] };
    try {
      const ordersContent = await fs.readFile(ordersFilePath, 'utf-8');
      ordersData = JSON.parse(ordersContent);
    } catch (error) {
      console.log('No existing orders file, creating new one');
    }

    // Add new order
    const newOrder = {
      id: orderId,
      userId: session.user.id,
      items,
      totalAmount,
      status: 'PENDING',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      paymentDetails: {
        invoiceId: invoice.id,
        invoiceUrl: invoice.invoiceUrl,
      }
    };

    ordersData.orders.push(newOrder);

    // Save updated orders
    await fs.writeFile(ordersFilePath, JSON.stringify(ordersData, null, 2));

    // Return success response
    return res.status(200).json({
      message: 'Order created successfully',
      orderId,
      invoiceUrl: invoice.invoiceUrl
    });

  } catch (error) {
    console.error('Error creating payment:', error);
    return res.status(500).json({
      message: 'Error creating payment',
      error: error.message
    });
  }
}