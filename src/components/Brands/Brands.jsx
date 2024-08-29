import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function getAllBrands() {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
      setBrands(data.data); 
    } catch (error) {
      console.error('Error fetching brands:', error.message);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    getAllBrands(); 
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="relative flex justify-center items-center h-screen">
          <div className="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-cyan-500"></div>
          <img
            src="https://www.svgrepo.com/show/509001/avatar-thinking-9.svg"
            className="rounded-full h-28 w-28"
            alt="Loading"
          />
        </div>
      ) : (
        <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {brands.map((brand) => (
              <Link to={`/brandDetails/${brand._id}`} key={brand._id}>
                <div className="rounded overflow-hidden shadow-lg flex flex-col">
                  <div className="relative h-60">
                    <img
                      className="w-full h-full object-cover"
                      src={brand.image}
                      alt={brand.name}
                    />
                    <div className="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25"></div>
                  </div>
                  <div className="px-6 py-4 mb-auto">
                    <p
                      className="font-medium text-lg inline-block hover:text-cyan-600 transition duration-500 ease-in-out inline-block mb-2"
                    >
                      {brand.name}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
