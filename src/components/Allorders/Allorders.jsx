import React, { useEffect, useState } from 'react'
import styles from './Allorders.module.css'
import { Link } from 'react-router-dom'

export default function Allorders() {

    let [counter , setCounter ] = useState(0)

    useEffect(() => {} , [])

   return (
    <>
       <div className="w-full h-screen flex justify-center items-center flex-col ">
       <h1 className='text-cyan-500 bg-cyan-100 px-20 py-5 rounded text-center text-2xl mb-20 capitalize'>transaction has ended successfully</h1> 
       <Link to={'/'} className='bg-cyan-500 text-white w-1/2 text-center py-4 rounded '>Home</Link>
       </div>
    </>
  )
}
