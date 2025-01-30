import { getServerSession } from 'next-auth/next';
import { authOptions } from './auth/[...nextauth]';
import fs from 'fs/promises';
import path from 'path';

const ordersFilePath = path.join(process.cwd(), 'src/data/orders.json');

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    // Read orders file
    const ordersData = JSON.parse(await fs.readFile(ordersFilePath, 'utf-8'));

    if (req.method === 'GET') {
      // Check if user is admin
      const isAdmin = session.user.role === 'admin';

      if (isAdmin) {
        // Admin can see all orders
        return res.status(200).json({ orders: ordersData.orders });
      } else {
        // Regular users can only see their own orders
        const userOrders = ordersData.orders.filter(
          (order) => order.userId === session.user.id
        );
        return res.status(200).json({ orders: userOrders });
      }
    }

    // Admin-only endpoints
    if (session.user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }

    if (req.method === 'PUT') {
      const { orderId, status } = req.body;

      if (!orderId || !status) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      // Find and update order status
      const orderIndex = ordersData.orders.findIndex(
        (order) => order.id === orderId
      );

      if (orderIndex === -1) {
        return res.status(404).json({ message: 'Order not found' });
      }

      // Update order status
      ordersData.orders[orderIndex] = {
        ...ordersData.orders[orderIndex],
        status,
        updatedAt: new Date().toISOString(),
      };

      // Save updated orders
      await fs.writeFile(ordersFilePath, JSON.stringify(ordersData, null, 2));

      return res.status(200).json({
        message: 'Order updated successfully',
        order: ordersData.orders[orderIndex],
      });
    }

    return res.status(405).json({ message: 'Method not allowed' });
  } catch (error) {
    console.error('Orders API error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}