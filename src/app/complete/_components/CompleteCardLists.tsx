'use client';

import { Card } from '@/components/common';
import { useProducts } from '@/hooks/queries/useProducts';
import { Carousel } from 'ji-react-carousel';
import { useEffect, useState } from 'react';

export default function CompleteCardLists() {
  const { products } = useProducts({});
  const [deviceType, setDeviceType] = useState('desktop');

  const LeftArrow = ({ onClick }: { onClick?: () => void }) => (
    <button
      onClick={onClick}
      className={`absolute left-[40px] top-1/2 transform -translate-y-1/2 bg-gray-400 text-white p-2 shadow-md hover:bg-gray-700 transition 
  rounded-l-none rounded-r-full w-[38px] h-[38px]`}
      aria-label="Previous Slide"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="19" y1="12" x2="5" y2="12"></line>
        <polyline points="12 19 5 12 12 5"></polyline>
      </svg>
    </button>
  );

  const RightArrow = ({ onClick }: { onClick?: () => void }) => (
    <button
      onClick={onClick}
      className={`absolute right-[40px] top-1/2 transform -translate-y-1/2 bg-gray-400 text-white p-2 shadow-md hover:bg-gray-700 transition 
  rounded-r-none rounded-l-full w-[38px] h-[38px]`}
      aria-label="Next Slide"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="5" y1="12" x2="19" y2="12"></line>
        <polyline points="12 5 19 12 12 19"></polyline>
      </svg>
    </button>
  );

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 430) {
        setDeviceType('mobile');
      } else if (window.innerWidth <= 895) {
        setDeviceType('tablet');
      } else {
        setDeviceType('desktop');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [products]);

  return (
    <div className="mt-10 max-w-[875px] relative">
      <h3 className="text-left ml-10 max-sm:ml-0 text-sm md:text-base font-medium mb-4">이런 상품 어떠신가요?</h3>
      {deviceType === 'mobile' ? (
        <div className="grid grid-cols-2 gap-4">
          {products
            ?.slice(0, 6)
            ?.map((product) => (
              <Card
                key={product.productId}
                productId={product.productId}
                imgUrl={product.options[0].optionDetails[0].url}
                title={product.name}
                price={product.price}
                review={product.rating}
              />
            ))}
        </div>
      ) : deviceType === 'tablet' ? (
        <div className="grid grid-cols-3 gap-4">
          {products
            ?.slice(0, 3)
            ?.map((product) => (
              <Card
                key={product.productId}
                productId={product.productId}
                imgUrl={product.options[0].optionDetails[0].url}
                title={product.name}
                price={product.price}
                review={product.rating}
              />
            ))}
        </div>
      ) : (
        <>
          {products && (
            <Carousel
              infinite={false}
              viewCount={4}
              width={200}
              LeftArrow={<LeftArrow />}
              RightArrow={<RightArrow />}
              hasDeleteButton={false}
            >
              {products.slice(0, 4).map((product) => (
                <Card
                  key={product.productId}
                  productId={product.productId}
                  imgUrl={product.options[0].optionDetails[0].url}
                  title={product.name}
                  price={product.price}
                  review={product.rating}
                />
              ))}
            </Carousel>
          )}
        </>
      )}
    </div>
  );
}
