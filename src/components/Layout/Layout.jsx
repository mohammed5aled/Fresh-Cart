import React, { useEffect, useState } from 'react'
import styles from './Layout.module.css'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'

export default function Layout() {

    let [counter , setCounter ] = useState(0)

    useEffect(() => {} , [])

   return (
    <>
        <Navbar/>
        <div className='my-20'>
          <Outlet/>
        </div>
        <Footer/>
    </>
  )
}
