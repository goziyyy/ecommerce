import React from 'react';
import useCartStore from '../store/cartStore';
import toast from 'react-hot-toast';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductCard = ({ id, name, description, price, images }) => {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem({
      id,
      name,
      description,
      price,
      image: `/${images[0]}`,
      quantity: 1,
    });
    toast.success('Added to cart!');
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
        }
      }
    ]
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105">
      <div className="relative h-64">
        <Slider {...settings}>
          {images.map((imageName, index) => (
            <div key={index} className="relative h-64">
              <div className="flex items-center justify-center p-4 h-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/${imageName}`}
                  alt={`${name} view ${index + 1}`}
                  className="max-h-full w-auto object-contain mx-auto"
                  style={{ maxWidth: '100%' }}
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>
      <div className="p-5 text-center">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{name}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex flex-col items-center space-y-3">
          <span className="text-xl font-bold text-primary">
            Rp {price.toLocaleString()}
          </span>
          <button
            onClick={handleAddToCart}
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-red-600 transition duration-300 w-full max-w-[200px]"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
