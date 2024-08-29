import axios from "axios";
import { createContext, useState } from "react";
import React from 'react';
import { Bounce, toast } from "react-toastify";

export let WishlistContext = createContext();

export default function WishlistContextProvider(props) {
  const [wishlist, setWishlist] = useState([]);
  let [isLoading , setIsLoading] = useState(true)


  async function addToWishlist(productId) {
    try {
      let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, 
        { productId: productId },
        { headers: { token: localStorage.getItem('userToken') } }
      );
      if (data.status) {
        setWishlist((prevWishlist) => [...prevWishlist, productId]);
        toast.success(`${data.message}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
      console.log(data);
    } catch (error) {
      console.error("Failed to add to wishlist:", error);
    }
  }

  async function removeFromWishlist(productId) {
    try {
      let { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
        headers: { token: localStorage.getItem('userToken') }
      });
  
      if (data.status) {
        setWishlist((prevWishlist) => prevWishlist.filter(id => id._id !== productId));
        
        toast.success(`${data.message}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
      
      console.log(data);
    } catch (error) {
      console.error("Failed to remove from wishlist:", error);
    }
  }
  

  async function getAllWishlist() {
    setIsLoading(true)
    let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist` , {
      headers : {
        token : localStorage.getItem('userToken')
      }
    })
    setWishlist(data.data); 
    console.log(data.data); 
    setIsLoading(false)
  }

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist , getAllWishlist ,wishlist ,isLoading}}>
      {props.children}
    </WishlistContext.Provider>
  );
}
