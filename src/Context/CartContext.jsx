import axios from "axios";
import React, { createContext, useState } from "react";
import { Bounce, toast } from "react-toastify";

export let cartContext = createContext()


export default function CartContextProvider(props) {
    let [numberOfProductCart , setNumberOfProductCart] = useState(0) 
    let [cartProduct , setCartProduct] = useState([]) 
    let [cartId , setCartId] = useState('') 
    let [totalCartPrice , setTotalCartPrice] = useState(0) 

    async function addProductCart(productId) {
        let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/cart` , {
          productId : productId
        } , {
          headers : {
            token : localStorage.getItem('userToken')
          }
        })
        if(data.status) {
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
    }

    async function getUserCart() {
      let {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/cart',{
        headers : {
          token : localStorage.getItem('userToken')
        }
      })
      setNumberOfProductCart(data.numOfCartItems);
      setCartProduct(data.data.products);
      setTotalCartPrice(data.data.totalCartPrice);
      setCartId(data.cartId);
    }

    async function removeUserCart(productId) {
      let {data} = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
        headers : {
          token : localStorage.getItem('userToken')
        }
      })
      setCartProduct(data.data.products)
      setNumberOfProductCart(data.numOfCartItems);
      setTotalCartPrice(data.data.totalCartPrice);
      if(data.status==='success') {
        toast.error(`product deleted `, {
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
    }

    async function updateProductCount(productId , productCount) {
       return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}` , {
        count : productCount
      } , {
        headers : {
          token : localStorage.getItem('userToken')
        }
      }).then((response) => {
        setCartProduct(response.data.data.products)
        setNumberOfProductCart(response.data.numOfCartItems);
        setTotalCartPrice(response.data.data.totalCartPrice);
        return response
      } )
    }

    async function clearCartProduct() {
        await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart` , {
          headers : {
            token : localStorage.getItem('userToken')
          }
        })
        setNumberOfProductCart(0);
        setCartProduct([]);
    }

    
  return (

    <>
    <cartContext.Provider value={{addProductCart ,getUserCart , numberOfProductCart , cartProduct , totalCartPrice ,removeUserCart ,updateProductCount , cartId ,clearCartProduct}}>
    {props.children}    
    </cartContext.Provider>  
    </>
  )
}
