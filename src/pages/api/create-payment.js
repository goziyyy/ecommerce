import { Xendit } from 'xendit-node';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './auth/[...nextauth]';
import fs from 'fs/promises';
import path from 'path';

// Initialize Xendit client
const xenditClient = new Xendit({
  secretKey: process.env.XENDIT_SECRET_KEY,
});

// Get Invoice service
const { Invoice } = xenditClient;

const ordersFilePath = path.join(process.cwd(), 'src/data/orders.json');
const ordersDir = path.dirname(ordersFilePath);

// Ensure orders directory and file exist
const initOrdersFile = async () => {
  try {
    // Create directory if it doesn't exist
    await fs.mkdir(ordersDir, { recursive: true });
    
    try {
      // Try to read the file
      await fs.access(ordersFilePath);
    } catch {
      // Create file if it doesn't exist
      await fs.writeFile(ordersFilePath, JSON.stringify({ orders: [] }, null, 2));
    }
  } catch (error) {
    console.error('Error initializing orders file:', error);
    throw error;
  }
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Get session using getServerSession
    const session = await getServerSession(req, res, authOptions);
    
    if (!session) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { items, totalAmount, userId } = req.body;

    if (!items || !totalAmount || !userId) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Validate userId matches session user
    if (userId !== session.user.id) {
      return res.status(403).json({ message: 'User ID mismatch' });
    }

    // Create unique order ID
    const orderId = `ORDER-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // Get the base URL from request headers or environment
    const baseUrl = process.env.NEXTAUTH_URL || `https://${req.headers.host}`;

    // Create invoice data according to documentation
    const data = {
      amount: totalAmount,
      invoiceDuration: 86400, // 24 hours
      externalId: orderId,
      description: `Order ${orderId} - Usus Fire Crispy`,
      currency: 'IDR',
      reminderTime: 1,
      payerEmail: session.user.email,
      successRedirectUrl: `${baseUrl}/order-success?orderId=${orderId}`,
      failureRedirectUrl: `${baseUrl}/order-failed?orderId=${orderId}`,
    };

    console.log('Creating invoice with data:', data);

    // Create invoice with Xendit using the documented format
    const invoice = await Invoice.createInvoice({
      data,
    });

    console.log('Invoice created:', invoice);

    // Initialize orders file
    await initOrdersFile();

    // Read and update orders
    const ordersData = JSON.parse(await fs.readFile(ordersFilePath, 'utf-8'));
    
    ordersData.orders.push({
      id: orderId,
      userId,
      items,
      totalAmount,
      status: 'PENDING',
      paymentId: invoice.id,
      invoiceUrl: invoice.invoiceUrl, // Changed from invoice_url to invoiceUrl
      expiryDate: invoice.expiryDate, // Changed from expiry_date to expiryDate
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    await fs.writeFile(ordersFilePath, JSON.stringify(ordersData, null, 2));

    // Return success response with correct property names
    return res.status(200).json({
      message: 'Payment initiated successfully',
      invoiceUrl: invoice.invoiceUrl, // Changed from invoice_url to invoiceUrl
      orderId,
      expiryDate: invoice.expiryDate // Changed from expiry_date to expiryDate
    });

  } catch (error) {
    console.error('Payment creation error:', error);
    
    // Handle specific Xendit errors
    if (error.status) {
      return res.status(error.status).json({
        message: error.message || 'Payment creation failed',
        code: error.code,
        error: error.errors
      });
    }

    return res.status(500).json({
      message: 'Internal server error during payment creation',
      error: error.message
    });
  }
}