import Head from 'next/head';
import Hero from '../components/Hero';
import ProductList from '../components/ProductList';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { ShoppingBagIcon, FireIcon, TruckIcon } from '@heroicons/react/24/outline';

const Feature = ({ icon: Icon, title, description }) => (
  <div className="flex flex-col items-center text-center p-6">
    <div className="bg-primary/10 rounded-full p-4 mb-4">
      <Icon className="h-8 w-8 text-primary" />
    </div>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return;
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [session, status, router]);

  if (status === 'loading' || status === 'unauthenticated') {
    return (
      <div className="flex justify-center items-center min-h-screen bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Usus Fire Crispy - Pedas dan Renyah</title>
        <meta name="description" content="Nikmati sensasi pedas dan renyah dari usus crispy kami!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-background">
        <Hero />
        
        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Mengapa Memilih Kami?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Feature
                icon={FireIcon}
                title="Rasa Pedas Autentik"
                description="Dibuat dengan racikan bumbu rahasia yang memberikan sensasi pedas yang khas"
              />
              <Feature
                icon={ShoppingBagIcon}
                title="Kualitas Premium"
                description="Menggunakan bahan berkualitas tinggi untuk hasil yang renyah dan lezat"
              />
              <Feature
                icon={TruckIcon}
                title="Pengiriman Cepat"
                description="Layanan pengiriman cepat untuk menjaga kerenyahan produk"
              />
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4">Menu Favorit</h2>
            <p className="text-gray-600 text-center mb-12">
              Pilihan menu terbaik yang siap memanjakan lidah Anda
            </p>
            <ProductList />
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Apa Kata Mereka?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Budi Santoso",
                  role: "Food Blogger",
                  comment: "Rasa pedasnya pas dan kerenyahannya terjaga. Recommended!",
                  rating: 5
                },
                {
                  name: "Siti Aminah",
                  role: "Customer",
                  comment: "Porsinya pas dan harganya terjangkau. Pasti repeat order!",
                  rating: 5
                },
                {
                  name: "Rudi Hermawan",
                  role: "Food Vlogger",
                  comment: "Salah satu usus crispy terenak yang pernah saya coba!",
                  rating: 5
                }
              ].map((testimonial, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-xl shadow-sm">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">"{testimonial.comment}"</p>
                  <div>
                    <p className="font-semibold text-gray-800">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
