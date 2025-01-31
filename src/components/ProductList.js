import React from 'react';
import ProductCard from './ProductCard';
import productsData from '../data/products.json';

const ProductList = () => {
  // Group products by category
  const originalProducts = productsData.products.filter(p => p.category === 'original');
  const spicyProducts = productsData.products.filter(p => p.category === 'spicy');

  return (
    <div className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-12">Pilihan Produk Kami</h2>
        
          {/* Original Products */}
          <div className="mb-16">
            <h3 className="text-2xl font-semibold mb-8">
              Usus Crispy Original
            </h3>
            <div className="flex justify-center">
              <div className="max-w-lg w-full">
                <div className="flex flex-col items-center space-y-8">
                  {originalProducts.map(product => (
                    <div key={product.id} className="w-full max-w-sm">
                      <ProductCard
                        id={product.id}
                        name={product.name}
                        description={product.description}
                        price={product.price}
                        images={product.images}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Spicy Products */}
          <div>
            <h3 className="text-2xl font-semibold mb-8">
              Usus Crispy Spicy
            </h3>
            <div className="flex justify-center">
              <div className="max-w-lg w-full">
                <div className="flex flex-col items-center space-y-8">
                  {spicyProducts.map(product => (
                    <div key={product.id} className="w-full max-w-sm">
                      <ProductCard
                        id={product.id}
                        name={product.name}
                        description={product.description}
                        price={product.price}
                        images={product.images}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
