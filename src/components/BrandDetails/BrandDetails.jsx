// BrandDetails.jsx
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { cartContext } from '../../Context/CartContext';

export default function BrandDetails() {
  const { brandId } = useParams();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { addProductCart } = useContext(cartContext);

 
  async function getProductsByBrand() {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?brand=${brandId}`);
      setProducts(data.data);
    } catch (error) {
      console.error('Error fetching products:', error.message);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    if (brandId) {
      getProductsByBrand();
    }
  }, [brandId]);

  return (
    <div>
      {isLoading ? (
        <div className="relative flex justify-center items-center h-screen">
          <div className="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-cyan-500"></div>
          <img
            src="https://www.svgrepo.com/show/509001/avatar-thinking-9.svg"
            className="rounded-full h-28 w-28"
            alt="Loading"
          />
        </div>
      ) : products.length === 0 ? (
       
        <div className="text-center text-xl text-cyan-500 mt-8 w-full h-screen flex justify-center items-center">
          No products available for this brand.
        </div>
      ) : (
       
        <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <div className="xl:w-full" key={product._id}>
                <div className="p-4 w-full">
                  <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden group">
                    <Link to={`/productDetails/${product._id}`}>
                      <div className="lg:h-48 h-36 w-full overflow-hidden">
                        <img
                          className="w-full h-full object-contain object-center group-hover:scale-150 transition"
                          src={product.imageCover}
                          alt={product.title}
                        />
                      </div>
                    </Link>
                    <div className="p-6">
                      <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1 line-clamp-1">
                        {product.category.name}
                      </h2>
                      <Link to={`/productDetails/${product._id}`}>
                        <h1 className="title-font text-lg font-medium text-gray-900 mb-3 line-clamp-1">
                          {product.title}
                        </h1>
                      </Link>
                      <p className="leading-relaxed mb-3 line-clamp-3 h-20">
                        {product.description}
                      </p>
                      <div className="flex items-center flex-wrap">
                        <h1 className="title-font text-lg font-medium text-gray-900">
                          ${product.price}
                        </h1>
                        <span className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto ml-auto leading-none text-sm pr-2 py-1 border-r-2 border-gray-200">
                          {product.ratingsAverage}
                          <i className="fa-solid fa-star text-yellow-500 pl-1"></i>
                        </span>
                        <span className="text-gray-400 inline-flex items-center leading-none hover:text-red-500 cursor-pointer transition">
                          {product.quantity}
                        </span>
                      </div>
                      <div className="flex">
                        <button
                          className="select-none rounded-lg border border-cyan-500 bg-cyan-500 text-white hover:bg-white hover:text-cyan-500 py-3 px-6 text-center align-middle
                     font-sans text-xs  
                    font-bold w-1/2 mt-4 mr-2 uppercase transition-all focus:ring focus:ring-gray-300 
                    active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                          type="button"
                        >
                          wishlist
                        </button>
                        <button
                          className="select-none rounded-lg border border-cyan-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold w-1/2 mt-4 
                    uppercase hover:bg-cyan-500 hover:text-white text-cyan-500 transition-all focus:ring focus:ring-gray-300 active:opacity-[0.85] 
                    disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                          type="button"
                          onClick={() => addProductCart(product._id)}
                        >
                          add to cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
