import React, { useContext, useEffect } from 'react'
import { WishlistContext } from '../../Context/WishlistContext'
import { Link } from 'react-router-dom'
import { cartContext } from '../../Context/CartContext'

export default function Wishlist() {

    let {getAllWishlist,wishlist, isLoading ,removeFromWishlist} = useContext(WishlistContext)
    let {addProductCart} = useContext(cartContext)

    useEffect(() => {
      getAllWishlist()
    } , [])

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
        <h2 className="title font-manrope font-bold text-4xl leading-10 mb-8 text-center text-black">Wishlist Cart </h2>
        {
          wishlist.length === 0 ? (
            <div className="text-center text-xl text-gray-500">
              Sorry, there are no products added to Wishlist.
            </div>
          ) : (
            <div className=" w-full flex flex-wrap ">
              {
                wishlist.map((product, index) => {
                  return <div className="p-4 xl:w-1/4 lg:w-1/3 sm:w-1/2" key={product._id} >
                  <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden group">
                    <Link to={`/productDetails/${product._id}`}>
                      <div className="lg:h-48 h-36 w-full overflow-hidden">
                        <img className="w-full h-full object-contain object-center group-hover:scale-150 transition" src={product.imageCover} alt={product.title} />
                      </div>
                    </Link>
                    <div className="p-6">
                      <Link to={`/productDetails/${product._id}`}><h1 className="title-font text-lg font-medium text-gray-900 mb-3 line-clamp-1">{product.title}</h1></Link>
                      <p className="leading-relaxed mb-3 line-clamp-3 h-20">{product.description}</p>
                      <div className="flex items-center flex-wrap">
                        <h1 className="title-font text-lg font-medium text-gray-900">${product.price}</h1>
                        <span className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto ml-auto leading-none text-sm pr-2 py-1 border-r-2 border-gray-200">
                          {product.ratingsAverage}<i className="fa-solid fa-star text-yellow-500 pl-1"></i>
                        </span>
                        <span className="text-gray-400 inline-flex items-center leading-none hover:text-red-500 cursor-pointer transition">
                          {product.quantity}
                        </span>
                      </div>
                        <button
                          className="select-none rounded-lg border border-cyan-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold w-full mt-4 uppercase hover:bg-white hover:text-cyan-500 text-white bg-cyan-500 mr-2 transition-all disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                          type="button"
                          onClick={() => removeFromWishlist(product._id)}
                        >
                          Remove from Wishlist
                        </button>
                        <button
                          className="select-none rounded-lg border border-cyan-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold w-full mt-4 uppercase hover:bg-cyan-500 hover:text-white text-cyan-500 transition-all focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                          type="button"
                          onClick={() => addProductCart(product._id)}
                        >
                          Add to Cart
                        </button>
                    </div>
                  </div>
                </div>
                })
              }
            </div>
          )
        }
        </div>
      </section>
    }                            
    </>
  )
}
