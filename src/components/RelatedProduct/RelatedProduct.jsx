import React, { useContext, useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/pagination';
import {Pagination} from 'swiper/modules';
import 'swiper/css';
import ProductCart from '../productCart/productCart'
import { Link } from 'react-router-dom';
import { cartContext } from '../../Context/CartContext';



export default function RelatedProduct({product}) {

    let [counter , setCounter ] = useState(0)

    let {addProductCart}  = useContext(cartContext)

    useEffect(() => {} , [])

   return (
    <>
    <div className="p-4">
      <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden group">
        <Link to={`/productDetails/${product._id}`}>
        <div className="lg:h-48 h-36 w-full  overflow-hidden">
          <img className="w-full h-full object-contain object-center group-hover:scale-150 transition" src={product.imageCover} alt={product.title} />
        </div>
        </Link>
        <div className="p-6">
          <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1 line-clamp-1">{product.category.name}</h2>
          <Link to={`/productDetails/${product._id}`}><h1 className="title-font text-lg font-medium text-gray-900 mb-3 line-clamp-1">{product.title} lorem</h1></Link>
          <p className="leading-relaxed mb-3 line-clamp-3 h-20">{product.description}</p>
          <div className="flex items-center flex-wrap ">
          <h1 className="title-font text-lg font-medium text-gray-900">${product.price} </h1>
            <span className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-2 py-1 border-r-2 border-gray-200">
            {product.ratingsAverage}<i className="fa-solid fa-star text-yellow-500 pl-1"></i>
            </span>
            <span className="text-gray-400 inline-flex items-center leading-none hover:text-red-500 cursor-pointer  transition">
            {product.quantity}
            </span>
          </div>
          <div className="flex">

          <button className="select-none rounded-lg border border-cyan-500 text-cyan-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold w-full mt-4 
          uppercase hover:bg-cyan-500 hover:text-white bg-white transition-all  focus:ring focus:ring-gray-300 active:opacity-[0.85] 
          disabled:pointer-events-none  disabled:opacity-50 disabled:shadow-none" type="button" onClick={() => addProductCart(product._id)} >
            add to cart
          </button>
          </div>
          
        </div>
      </div>
    </div>
    </>
  )
}
