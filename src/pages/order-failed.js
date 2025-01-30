import React from 'react';
import { useRouter } from 'next/router';
import { XCircleIcon } from '@heroicons/react/24/outline';
import Navbar from '../components/Navbar';

const OrderFailedPage = () => {
  const router = useRouter();
  const { orderId } = router.query;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8 text-center">
          <XCircleIcon className="h-16 w-16 text-red-500 mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Payment Failed
          </h1>
          <p className="text-gray-600 mb-6">
            We're sorry, but there was an issue processing your payment for order:
            <br />
            <span className="font-mono font-medium text-primary">{orderId}</span>
          </p>
          <div className="space-y-4">
            <p className="text-sm text-gray-500">
              Don't worry! Your order is saved and you can try the payment again.
            </p>
            <div className="border-t pt-6">
              <h2 className="font-semibold text-gray-800 mb-2">What Can You Do?</h2>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Check your payment method</li>
                <li>• Ensure sufficient funds are available</li>
                <li>• Try again with a different payment method</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 space-y-4">
            <button
              onClick={() => router.push('/cart')}
              className="w-full bg-primary hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
            >
              Try Payment Again
            </button>
            <button
              onClick={() => router.push('/')}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg transition duration-300"
            >
              Return to Home
            </button>
            <button
              onClick={() => router.push('/contact')}
              className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 font-semibold py-2 px-4 rounded-lg transition duration-300"
            >
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderFailedPage;