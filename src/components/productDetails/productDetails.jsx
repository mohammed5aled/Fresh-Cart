import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductDetailsCart from '../ProductDetailsCart/ProductDetailsCart';
import RelatedProduct from '../RelatedProduct/RelatedProduct';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

export default function ProductDetails() {
  let { id } = useParams();
  let [product, setProduct] = useState(null);
  let [relatedProduct, setRelatedProduct] = useState([]);
  let [isLoading, setIsLoading] = useState(true);

  async function getProduct() {
    setIsLoading(true)
    let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
    setProduct(data.data);
    console.log(data.data.category._id);
    getRelatedProducts(data.data.category._id);
    
  }

  async function getRelatedProducts(categoryId) {
    let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`, {
      params: {
        'category': categoryId
      }
    });
    setRelatedProduct(data.data);
    setIsLoading(false);
  }

  useEffect(() => {
    getProduct();
  }, [id]);

  return (
    <>
      {isLoading ? (
        <div className="relative flex justify-center items-center h-screen">
          <div className="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-cyan-500"></div>
          <img src="https://www.svgrepo.com/show/509001/avatar-thinking-9.svg" className="rounded-full h-28 w-28" alt="loading" />
        </div>
      ) : (
        <>
          <ProductDetailsCart product={product} />
         <div className="sm:w-11/12 w-9/12 mx-auto">
         <Swiper
            spaceBetween={0}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 0,
              },
              992: {
                slidesPerView: 3,
                spaceBetween: 0,
              },
              1200: {
                slidesPerView: 4,
                spaceBetween: 0,
              },
            }}
          >
            {relatedProduct.map((product, index) => (
              <SwiperSlide key={index}>
                <RelatedProduct product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
         </div>
        </>
      )}
    </>
  );
}
