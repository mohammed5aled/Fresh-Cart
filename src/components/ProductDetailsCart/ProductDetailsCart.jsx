import React, { useContext, useEffect, useState } from 'react'
import styles from './ProductDetailsCart.module.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/pagination';
import {Pagination} from 'swiper/modules';
import 'swiper/css';
import { cartContext } from '../../Context/CartContext';
export default function ProductDetailsCart( {product} ) {

  let {addProductCart} = useContext(cartContext)

    let [counter , setCounter ] = useState(0)

    useEffect(() => {} , [])

   return (
    <>
       <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <div className="lg:w-1/2 w-full h-96 border border-gray-200 rounded-3xl overflow-hidden">
              <Swiper slidesPerView={1} className='w-full h-full'  modules={[Pagination]}  pagination={{ clickable: true }}>
                {product?.images?.map((img, index) => (
                  <SwiperSlide key={index}>
                    <img alt={product?.title} className="object-cover w-full h-full rounded" src={img} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="lg:w-1/2 w-full lg:pl-10 lg:mt-0 mt-5 ">
              <h2 className="title-font text-gray-500 tracking-widest">{product?.brand.name}</h2>
              <h2 className="my-4 title-font text-gray-500 tracking-widest">{product?.category.name}</h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{product?.title}</h1>
              <div className="flex my-4">
                <span className="flex items-center">
                  { product?.ratingsAverage }
                  <i className='fa-solid fa-star text-yellow-500 px-2'></i> ({product?.ratingsQuantity})
                  <span className='mx-2'> |</span>
                  <span className="text-gray-600 ">{product?.quantity} Remains</span>
                  <span className='mx-2'> |</span>
                  <span className="text-gray-600 ">{product?.sold} sold</span>

                </span>
              </div>
              <p className="leading-relaxed">{product?.description}</p>

              <div className="flex my-5">
                <span className="title-font font-medium text-2xl text-gray-900">${product?.price}</span>
              </div>
                <button className="text-white bg-cyan-500 border border-cyan-500 py-2 px-6 focus:outline-none hover:bg-white hover:text-cyan-500 rounded w-full" onClick={() => addProductCart(product._id)} >Add To Cart</button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
