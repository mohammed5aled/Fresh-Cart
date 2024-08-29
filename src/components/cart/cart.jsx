import React, {useContext, useEffect, useState } from 'react'
import { cartContext } from '../../Context/CartContext';
import { Link } from 'react-router-dom';

export default function Cart() {
  let [isLoading , setIsLoading] = useState(true)
  
    const {getUserCart , numberOfProductCart, cartProduct , totalCartPrice ,removeUserCart ,updateProductCount ,cartId ,clearCartProduct} = useContext(cartContext)
    useEffect(() => {
      const fetchCartData = async () => {
        await getUserCart();
        setIsLoading(false);
      };
      fetchCartData();
      
    }, []);

    
   return (
    <>
     {
      isLoading ? 
      <div className="relative flex justify-center items-center h-screen">
          <div className="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-cyan-500"></div>
          <img src="https://www.svgrepo.com/show/509001/avatar-thinking-9.svg"  className="rounded-full h-28 w-28"/>
      </div> : 
    <section className="py-24 relative">
        <div className="w-11/12  px-4 md:px-5 lg-6 mx-auto">
        <h2 className="title font-manrope font-bold text-4xl leading-10 mb-8 text-center text-black">Shopping Cart </h2>
        {
          cartProduct.length === 0 ? (
            <div className="text-center text-xl text-gray-500">
              Sorry, there are no products added.
            </div>
          ) : (
            <>
        <div className="hidden lg:grid grid-cols-2 py-6">
            <div className="font-normal text-xl leading-8 text-gray-500">Product</div>
            <p className="font-normal text-xl leading-8 text-gray-500 flex items-center justify-between">
                <span className="w-full max-w-[260px] text-center">Quantity</span>
                <span className="w-full max-w-[200px] text-center">Total</span>
                <span className="w-full max-w-[200px] text-center">Actions</span>
            </p>
        </div>
        {
          cartProduct.map((product, index) => {
            return <div className="grid grid-cols-1 lg:grid-cols-2 min-[550px]:gap-6 border-t border-gray-200 py-6" key={`${product.product.id}-${index}`}>
                <div
                    className="flex items-center flex-col min-[550px]:flex-row gap-3 min-[550px]:gap-6 w-full max-xl:justify-center max-xl:max-w-xl max-xl:mx-auto">
                    <div className="img-box"><img src={product.product.imageCover} alt={product.product.title} className="xl:w-[140px] rounded-xl"/></div>
                    <div className="pro-data w-full max-w-sm ">
                        <h5 className="font-semibold text-xl leading-8 text-black max-[550px]:text-center">{product.product.title} </h5>
                        <p className="font-normal text-lg leading-8 text-gray-500 my-2 min-[550px]:my-3 max-[550px]:text-center"> {product.product.category.name}</p>
                        <h6 className="font-medium text-lg leading-8 text-cyan-600  max-[550px]:text-center">${product.price}</h6>
                    </div>
                </div>
                <div className="flex items-center flex-col min-[550px]:flex-row w-full max-xl:max-w-xl max-xl:mx-auto gap-2">
                  <div className="flex items-center w-full mx-auto justify-center">
                      <button
                          className="group rounded-l-full px-6 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:border-gray-300 hover:bg-gray-50"
                          onClick={() =>updateProductCount(product.product._id , product.count - 1 )}>
                          -
                      </button>
                      <input type="text" className="border-y border-gray-200 outline-none text-gray-900 font-semibold text-lg w-full max-w-[118px] min-w-[80px] 
                      placeholder:text-gray-900 py-[15px] text-center bg-transparent" placeholder={product.count}/>
                      <button
                          className="group rounded-r-full px-6 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:border-gray-300 hover:bg-gray-50"
                          onClick={() =>updateProductCount(product.product._id , product.count + 1)}>
                          +
                      </button>
                      <h6 className="text-cyan-600 font-manrope font-bold text-2xl leading-9 w-full max-w-[176px] text-center"> ${product.count * product.price }</h6>
                  </div>
                  <div className="flex flex-col w-full max-w-[176px]">
                    
                    <button className="text-red-600 bg-red-50 rounded-xl py-2 font-manrope  text-xl leading-9 w-full max-w-[176px] text-center"
                    onClick={() => removeUserCart(product.product._id)}> 
                    Delete
                  </button>
                  </div>
                </div>
            </div>
          })
        }
            <div className=" rounded-xl p-6 w-full mb-8 max-lg:max-w-xl max-lg:mx-auto">
                <div className="flex items-center justify-between w-full py-6 border-t border-cyan-200">
                    <p className="font-manrope font-medium text-2xl leading-9 text-gray-900">Total Products</p>
                    <h6 className="font-manrope font-medium text-2xl leading-9 text-cyan-500">${totalCartPrice}</h6>
                </div>
                    <Link to={`/checkOut/${cartId}`} className='bg-cyan-500 text-white w-full rounded py-4 block text-center'>checkout</Link>
                    <button className='bg-red-500 text-white w-full rounded py-4 block text-center mt-5' onClick={clearCartProduct}>clear all</button>
            </div>
            </>
          )
            }
        </div>
    </section>
    }                            
    </>
  )
}
