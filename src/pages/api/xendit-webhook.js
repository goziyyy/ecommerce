import fs from 'fs/promises';
import path from 'path';

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
    // Initialize orders file
    await initOrdersFile();

    // Log the entire webhook payload for debugging
    console.log('Received webhook payload:', JSON.stringify(req.body, null, 2));

    // Extract data from webhook according to InvoiceCallback format
    const {
      id,
      external_id,
      status,
      amount,
      paid_amount,
      paid_at,
      payment_method,
      payment_channel,
      payment_destination,
      created,
      updated,
      currency,
      merchant_name,
      payer_email,
      description,
    } = req.body;

    console.log('Processing invoice callback:', {
      id,
      external_id,
      status,
      payment_method
    });

    // Read current orders
    const ordersData = JSON.parse(await fs.readFile(ordersFilePath, 'utf-8'));

    // Find the order using external_id
    const orderIndex = ordersData.orders.findIndex(
      (order) => order.id === external_id
    );

    if (orderIndex === -1) {
      console.error(`Order not found: ${external_id}`);
      return res.status(404).json({ message: 'Order not found' });
    }

    // Map status
    let orderStatus;
    switch (status) {
      case 'PAID':
      case 'SETTLED':
        orderStatus = 'COMPLETED';
        break;
      case 'EXPIRED':
        orderStatus = 'EXPIRED';
        break;
      default:
        orderStatus = 'PENDING';
    }

    // Update order with complete payment details
    ordersData.orders[orderIndex] = {
      ...ordersData.orders[orderIndex],
      status: orderStatus,
      paymentDetails: {
        xenditId: id,
        method: payment_method,
        channel: payment_channel,
        destination: payment_destination,
        amount: paid_amount || amount,
        paidAt: paid_at,
        currency,
        merchantName: merchant_name,
        payerEmail: payer_email,
        description,
        created,
        updated
      },
      updatedAt: new Date().toISOString(),
    };

    // Save updated orders
    await fs.writeFile(ordersFilePath, JSON.stringify(ordersData, null, 2));

    console.log(`Updated order ${external_id} status to ${orderStatus}`);

    return res.status(200).json({
      message: 'Webhook processed successfully',
      orderId: external_id,
      status: orderStatus,
    });
  } catch (error) {
    console.error('Webhook processing error:', error);
    return res.status(500).json({
      message: 'Failed to process webhook',
      error: error.message,
    });
  }
}