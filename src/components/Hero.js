import React from 'react';
import { useRouter } from 'next/router';
import { FireIcon } from '@heroicons/react/24/outline';

const Hero = () => {
  const router = useRouter();

  return (
    <section className="relative bg-primary overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '30px 30px',
        }} />
      </div>

      <div className="container mx-auto px-4 py-24 relative">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-white/10 rounded-full p-3">
              <FireIcon className="h-12 w-12 text-white" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Usus Fire Crispy
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
            Nikmati sensasi pedas dan renyah dari Mulut Gozi, eh maksudnya usus crispy kami! 
            Dibuat dengan resep rahasia dan bumbu pilihan.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => {
                const productsSection = document.querySelector('#products');
                productsSection?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-white text-primary hover:bg-gray-100 font-bold py-3 px-8 rounded-full transition duration-300 transform hover:scale-105"
            >
              Lihat Menu
            </button>
            
            <button
              onClick={() => router.push('/about')}
              className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-bold py-3 px-8 rounded-full transition duration-300"
            >
              Tentang Kami
            </button>
          </div>

          {/* Features Pills */}
          <div className="flex flex-wrap justify-center gap-4 mt-12">
            {[
              '100% Halal',
              'Renyah Tahan Lama',
              'Pengiriman Cepat',
              'Bumbu Rahasia'
            ].map((feature, index) => (
              <span
                key={index}
                className="bg-white/10 text-white px-4 py-2 rounded-full text-sm font-medium"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Wave Separator */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
        >
          <path
            d="M0 0L48 8.875C96 17.75 192 35.5 288 44.375C384 53.25 480 53.25 576 44.375C672 35.5 768 17.75 864 26.625C960 35.5 1056 71 1152 79.875C1248 88.75 1344 71 1392 62.125L1440 53.25V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0V0Z"
            fill="#F0F0F0"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
