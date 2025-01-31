import '../styles/globals.css'
import { SessionProvider } from "next-auth/react"
import { Toaster } from 'react-hot-toast';
import Navbar from '../components/Navbar';
import { useRouter } from 'next/router';

function Loading() {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  );
}

export default function App({ Component, pageProps }) {
  const router = useRouter();

  // Pages that already include Navbar in their component
  const pagesWithNavbar = [
    '/cart', 
    '/orders', 
    '/admin/orders',
    '/admin',
    '/order-success',
    '/order-failed'
  ];
  
  // Check if current path starts with any of the paths in pagesWithNavbar
  const showNavbar = !pagesWithNavbar.some(path => 
    router.pathname === path || router.pathname.startsWith(`${path}/`)
  );

  return (
    <SessionProvider session={pageProps.session}>
      <div className="min-h-screen flex flex-col bg-background">
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#333',
              color: '#fff',
            },
            success: {
              iconTheme: {
                primary: '#22c55e',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
        {showNavbar && <Navbar />}
        <main className="flex-grow">
          <Component {...pageProps} />
        </main>
        {showNavbar && (
          <footer className="bg-white shadow-md mt-auto">
            <div className="container mx-auto px-4 py-6">
              <div className="text-center text-gray-600 text-sm">
                © {new Date().getFullYear()} Usus Fire Crispy. All rights reserved.
              </div>
            </div>
          </footer>
        )}
      </div>
    </SessionProvider>
  );
}
