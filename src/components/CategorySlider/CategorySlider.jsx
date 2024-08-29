import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/pagination';
import {Pagination} from 'swiper/modules';
import 'swiper/css';



export default function CategorySlider() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function getAllCategories() {
    setIsLoading(true);
    try {
      let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
      setCategories(data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getAllCategories();
  }, []);

  if (isLoading) {
    return <p className="text-center my-5">Loading...</p>;
  }

  return (
    <>
      <Swiper
        spaceBetween={20} 
        slidesPerView={4} 
        slidesPerGroup={4} 

        breakpoints={{
          640: {
            slidesPerView: 2, 
            slidesPerGroup: 2,
          },
          768: {
            slidesPerView: 4, 
            slidesPerGroup: 4,
          },
        }}
        className=""
      >
        {categories.map((category) => (
          <SwiperSlide key={category._id} className="flex flex-col items-center">
            <img src={category.image} alt={category.name} className="w-full h-32 object-cover" />
            <p className="mt-2 text-center text-sm">{category.name}</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
