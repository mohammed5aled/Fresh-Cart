import React, { useContext, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
import { cartContext } from '../../Context/CartContext';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  let {userToken , setUserToken} = useContext(UserContext)
  let {numberOfProductCart} = useContext(cartContext)
  let navigateTo = useNavigate()

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  function handleLogout() {
    localStorage.removeItem('userToken')
    setUserToken(null)
    navigateTo('/login')
  }

  return (
    <div className="grid place-items-center">
      <div className="w-full">
        <nav className="fixed top-0 z-10 w-full px-4 py-4 text-cyan-500 bg-white shadow-md border-white/80 bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200 lg:px-8 lg:py-5">
          <div className="flex items-center justify-between text-blue-gray-900">
            <Link to={'/'}
              className="mr-auto block cursor-pointer font-sans font-semibold text-xl leading-relaxed text-inherit antialiased">
              Fresh <i className="fa-brands fa-opencart mx-1"></i> Cart
            </Link>

            {
            userToken ?
            <ul className="hidden lg:flex flex-col lg:flex-row lg:items-center gap-6">
              <li><NavLink to={'/'} className="p-1 px-4 py-2  font-sans font-normal leading-normal capitalize">home</NavLink></li>
              <li><NavLink to={'products'} className="p-1 px-4 py-2  font-sans font-normal leading-normal capitalize">products</NavLink></li>
              <li><NavLink to={'categories'} className="p-1 px-4 py-2  font-sans font-normal leading-normal capitalize">categories</NavLink></li>
              <li><NavLink to={'brands'} className="p-1 px-4 py-2  font-sans font-normal leading-normal capitalize">brands</NavLink></li>
              <li><NavLink to={'wishlist'} className="p-1 px-4 py-2  font-sans font-normal leading-normal capitalize">wishlist</NavLink></li>
            </ul> : 
            null
            }


            <div className="hidden lg:flex items-center gap-4 ml-auto">
               
              {
                !userToken ? 
              <>
              <Link to={'/login'}>
              <button className="px-4 py-2 font-sans text-sm font-semibold uppercase align-middle transition-all rounded-lg select-none bg-cyan-100 text-cyan-600" type="button">
                Log In
              </button>
              </Link>
              <Link to={'/register'}>
              <button className="rounded-lg py-2 px-4 text-sm font-semibold uppercase text-white bg-cyan-500 shadow-md transition-all hover:shadow-lg active:opacity-85" type="button">
                Register
              </button>
              </Link>
              </> :
              <>
              <div className="relative">
                <Link to={'/cart'}>
                  <i className="fa-solid fa-cart-shopping p-1 font-sans font-normal leading-normal capitalize"></i>
                  {numberOfProductCart > 0 && (
                    <span className="absolute -top-1 -right-2 flex items-center justify-center w-5 h-5 bg-red-500 text-white text-xs rounded-full">
                      {numberOfProductCart}
                    </span>
                  )}
                </Link>
              </div> 
              <button className="rounded-lg py-2 px-4 text-sm font-semibold uppercase bg-red-50 text-red-500 transition-all active:opacity-85" type="button" onClick={handleLogout}>
                LogOut
              </button>
              </>
              
              }
          </div>
            <button className="lg:hidden ml-auto h-6 w-6 text-center align-middle transition-all" type="button" onClick={toggleMobileMenu}>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>

          {isMobileMenuOpen && (
            <div className="lg:hidden">
              <ul className="flex flex-col items-center gap-2 mt-4">
              <li ><NavLink  to={'/'} className="p-1 font-sans font-normal leading-normal capitalize">home</NavLink ></li>
              <li ><NavLink  to={'products'} className="p-1 font-sans font-normal leading-normal capitalize">products</NavLink ></li>
              <li ><NavLink  to={'categories'} className="p-1 font-sans font-normal leading-normal capitalize">categories</NavLink ></li>
              <li ><NavLink  to={'brands'} className="p-1 font-sans font-normal leading-normal capitalize">brands</NavLink ></li>
              <li ><NavLink  to={'cart'} className="p-1 font-sans font-normal leading-normal capitalize">carts</NavLink ></li>
              <li ><NavLink  to={'wishlist'} className="p-1 font-sans font-normal leading-normal capitalize">wishlist</NavLink ></li>
              {
                !userToken ? 
              <>
              <Link to={'/login'}>
              <button className="px-8 py-2 font-sans text-sm font-semibold uppercase align-middle transition-all rounded-lg select-none 
              bg-cyan-100" type="button">
                Log In
              </button>
              </Link>
              <Link to={'/register'}>
              <button className="rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 py-2 px-4 text-sm font-semibold uppercase text-white shadow-md transition-all hover:shadow-lg active:opacity-85" type="button">
                Register
              </button>
              </Link>
              </> :
              <>
                <button className="rounded-lg py-2 px-4 text-sm font-semibold uppercase text-red-500 transition-all active:opacity-85" type="button" onClick={handleLogout}>
                  LogOut
                </button>
              </>
              }
              
              </ul>
              
            </div>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
