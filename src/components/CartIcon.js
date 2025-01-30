import React from 'react';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import useCartStore from '../store/cartStore';
import { useRouter } from 'next/router';

const CartIcon = () => {
  const totalItems = useCartStore((state) => state.totalItems);
  const router = useRouter();

  return (
    <button
      onClick={() => router.push('/cart')}
      className="relative p-2 text-gray-600 hover:text-primary transition-colors"
      aria-label="Shopping Cart"
    >
      <ShoppingCartIcon className="h-6 w-6" />
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
          {totalItems}
        </span>
      )}
    </button>
  );
};

export default CartIcon;