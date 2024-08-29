import React, { useContext, useEffect, useState } from 'react'
import styles from './ProtectedRoute.module.css'
import { Navigate } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext'
import Login from '../Login/Login'

export default function ProtectedRoute({children}) {
  let {userToken} = useContext(UserContext)

   return (
    <>
       {
        userToken ? 
        children : 
        <Login/>
       }
    </>
  )
}
