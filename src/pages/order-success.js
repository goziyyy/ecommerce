import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import useCartStore from '../store/cartStore';
import Navbar from '../components/Navbar';

const OrderSuccessPage = () => {
  const router = useRouter();
  const { orderId } = router.query;
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    if (orderId) {
      clearCart(); // Clear the cart after successful payment
    }
  }, [orderId, clearCart]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8 text-center">
          <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Payment Successful!
          </h1>
          <p className="text-gray-600 mb-6">
            Thank you for your order. Your order ID is:
            <br />
            <span className="font-mono font-medium text-primary">{orderId}</span>
          </p>
          <div className="space-y-4">
            <p className="text-sm text-gray-500">
              A confirmation email has been sent to your registered email address.
            </p>
            <div className="border-t pt-6">
              <h2 className="font-semibold text-gray-800 mb-2">What's Next?</h2>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Your order is being processed</li>
                <li>• You'll receive updates via email</li>
                <li>• Track your order status in your account</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 space-y-4">
            <button
              onClick={() => router.push('/orders')}
              className="w-full bg-secondary hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
            >
              View Order Status
            </button>
            <button
              onClick={() => router.push('/')}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg transition duration-300"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;