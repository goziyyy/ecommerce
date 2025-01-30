import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ShoppingCartIcon, UserIcon } from '@heroicons/react/24/outline';
import CartIcon from './CartIcon';

const Navbar = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push('/');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold text-primary">Usus Fire Crispy</span>
          </Link>

          <div className="flex items-center space-x-4">
            {session ? (
              <>
                <Link href="/orders" className="text-gray-600 hover:text-gray-900">
                  Orders
                </Link>
                
                {session.user.role === 'admin' && (
                  <Link href="/admin/orders" className="text-gray-600 hover:text-gray-900">
                    Admin Dashboard
                  </Link>
                )}

                <Link href="/cart">
                  <CartIcon />
                </Link>

                <div className="relative group">
                  <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-900">
                    <UserIcon className="h-6 w-6" />
                    <span>{session.user.name}</span>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 hidden group-hover:block">
                    <button
                      onClick={handleSignOut}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/login"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;