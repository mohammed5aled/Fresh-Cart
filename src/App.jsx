import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./components/Home/Home"
import Layout from "./components/Layout/Layout"
import Login from "./components/Login/Login"
import Register from "./components/Register/Register"
import UserContextProvider from "./Context/UserContext"
import Products from "./components/Products/Products"
import Brands from "./components/Brands/Brands"
import Cart from "./components/cart/cart"
import Categories from "./components/Categories/Categories"
import ProtectedRoute from "./components/protectedRoute/protectedRoute"
import NotFound from "./components/NotFound/NotFound"
import ProtectedAuthRoute from "./components/protectedAuthRoute/ProtectedAuthRoute"
import ProductDetails from "./components/productDetails/productDetails"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CartContextProvider from "./Context/CartContext"
import CheckOut from "./components/CheckOut/CheckOut"
import Allorders from "./components/Allorders/Allorders"
import CategoryDetails from "./components/categoryDetails/categoryDetails"
import BrandDetails from "./components/BrandDetails/BrandDetails"
import WishlistContextProvider from "./Context/WishlistContext"
import Wishlist from "./components/Wishlist/Wishlist"

let routes = createBrowserRouter([
  {path : '' , element : <Layout/> , children : [
    {index : true , element : <ProtectedRoute> <Home/> </ProtectedRoute> },
    {path : "products" , element : <ProtectedRoute> <Products/> </ProtectedRoute>},
    {path : "brands" , element : <ProtectedRoute> <Brands/> </ProtectedRoute>},
    {path : "cart" , element : <ProtectedRoute> <Cart/> </ProtectedRoute>},
    {path : "categories" , element : <ProtectedRoute> <Categories/> </ProtectedRoute>},
    {path : "/categoryDetails/:categoryId" , element: <CategoryDetails />},
    {path : "checkout/:cartId" , element : <ProtectedRoute> <CheckOut/> </ProtectedRoute>},
    {path : "CategoryDetails/:id" , element : <ProtectedRoute> <CategoryDetails/> </ProtectedRoute>},
    {path : "ProductDetails/:id" , element : <ProtectedRoute> <ProductDetails/> </ProtectedRoute>},
    {path : "brandDetails/:id" , element : <ProtectedRoute> <BrandDetails/> </ProtectedRoute>},
    {path : "allorders" , element : <ProtectedRoute> <Allorders/> </ProtectedRoute>},
    {path : "wishlist" , element : <ProtectedRoute> <Wishlist/> </ProtectedRoute>},
    {path : "login" , element : <ProtectedAuthRoute> <Login/> </ProtectedAuthRoute> },
    {path : "register" , element : <ProtectedAuthRoute> <Register/> </ProtectedAuthRoute> },
    {path : "*" , element : <NotFound/>},
  ]}
])

function App() {

  return (
    <UserContextProvider>
      <CartContextProvider>
        <WishlistContextProvider>
          <RouterProvider router={routes}/>
          <ToastContainer />
        </WishlistContextProvider>
      </CartContextProvider>
    </UserContextProvider>
  )
}

export default App
