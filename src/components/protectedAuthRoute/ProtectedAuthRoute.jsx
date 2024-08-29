import React, { useContext } from 'react'
import { UserContext } from '../../Context/UserContext'
import { Navigate, useNavigate } from 'react-router-dom'
import Home from '../Home/Home';

export default function ProtectedAuthRoute({ children }) {    
    let {userToken} = useContext(UserContext)
    
  return (
    <>
      {
        userToken ? <Navigate to={'/'} /> : children
      }
    </>
  )
}
