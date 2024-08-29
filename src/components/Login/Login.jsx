import React, { useContext, useEffect, useState } from 'react'
import styles from './Login.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { UserContext } from '../../Context/UserContext'
import { useNavigate } from 'react-router-dom'
export default function Login() {
  const [apiError, setApiError] = useState('')
  const [buttonLoading , setButtonLoading] = useState(false)

  let navigateTo = useNavigate() 

  const {setUserToken} = useContext(UserContext)


    const initialValues = {
      email : '',
      password : '',
    }
    async function onSubmit(fromValues) {
      setApiError('')
      setButtonLoading(true)
      await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin` , fromValues).then(response => {
        if(response.data.message === "success") {
          localStorage.setItem('userToken' , response.data.token)
          setUserToken(response.data.token)
          if(location.pathname == '/login') {
            navigateTo('/')
          } else {
            navigateTo(location.pathname)
          }
        }
        setButtonLoading(false)
      }).catch(error => {
        setButtonLoading(false)
        setApiError(error.response.data.message);
      }) 
    }
    const validationSchema = Yup.object({
      email : Yup.string().required('email is required').email('enter a valid email'),
      password : Yup.string().required('password is required').matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/ , 'Minimum eight characters, at least one letter and one number')
    })
    const formik = useFormik({
      initialValues,
      onSubmit,
      validationSchema,
    })

   return (
    <>
    <div className="flex items-center justify-center pt-10">
      <div className="mx-auto w-full max-w-[550px] bg-white">
        <form onSubmit={formik.handleSubmit} >
          <div className="mb-5">
              <label htmlFor="email" className="mb-3 block text-base font-medium text-[#07074D]">
                  Email Address
              </label>
              <input type="email" name="email" id="email" placeholder="Enter your email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
          </div>
          {
          formik.touched.email && formik.errors.email &&  <div className="p-4 mb-4 text-sm text-red-500 rounded-xl bg-red-50 font-normal capitalize" role="alert">
            <span className="font-semibold mr-2">OOPS:</span>{formik.errors.email}
          </div>
         }
          <div className="-mx-3 flex flex-wrap">
              <div className="w-full px-3 ">
                  <div className="mb-5">
                      <label htmlFor="password" className="mb-3 block text-base font-medium text-[#07074D]">
                      password
                      </label>
                      <input placeholder='Enter Your Password' type="password" name="password" id="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}
                          className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                  </div>
              </div>
          </div>
              {
                formik.touched.password && formik.errors.password &&  <div className="p-4 mb-4 text-sm text-red-500 rounded-xl bg-red-50 font-normal capitalize" role="alert">
                  <span className="font-semibold mr-2">OOPS:</span>{formik.errors.password}
                </div>
              }

          {
            apiError &&  <div className="p-4 mb-4 text-sm text-red-500 rounded-xl bg-red-50 font-normal capitalize" role="alert">
            <span className="font-semibold mr-2">OOPS:</span>{apiError}
          </div>
         }
          <div>
            <button
              className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none disabled:bg-slate-800 disabled:cursor-not-allowed" disabled={buttonLoading}>
              {buttonLoading ? <i className="fa-solid fa-spinner fa-spin"></i> : 'Register'}
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  )
}
