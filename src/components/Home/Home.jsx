import React, { useEffect, useState } from 'react'
import ProductCart from '../productCart/productCart'
import axios from 'axios'
import MailSlider from '../MailSlider/MailSlider'
import CategorySlider from '../CategorySlider/CategorySlider'


export default function Home() {

    let [products , setProducts ] = useState([])
    let [isLoading , setIsLoading] = useState(true)

    async function getAllProducts() {
      let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
      setProducts(data.data);  
      setIsLoading(false)  
    }

    useEffect(() => {
      getAllProducts()
    } , [])

    

   return (
    <>
    {
      isLoading ? 
      <div className="relative flex justify-center items-center h-screen">
          <div className="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-cyan-500"></div>
          <img src="https://www.svgrepo.com/show/509001/avatar-thinking-9.svg"  className="rounded-full h-28 w-28"/>
      </div> : 
    <section className="text-gray-600 body-font ">

      <div className=" px-5 py-6 mx-auto ">
        <div className="flex flex-wrap justify-center  ">
          { products.map((product) => {
            return  <ProductCart key={product._id} product={product}/>
          }) }
        </div>
      </div>
    </section>
    }
    </>
  )
}
