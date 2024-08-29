import React, { useEffect, useState } from 'react'
import styles from './Register.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Register() {
  const [apiError, setApiError] = useState('')
  const [buttonLoading , setButtonLoading] = useState(false)

  let navigateTo = useNavigate()

  const initialValues = {
    name : '' , 
    phone : '' , 
    email : '' , 
    password : '' , 
    rePassword : '' , 
  }

 async function onSubmit(fromValues) {
  setButtonLoading(true)
  axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup` , fromValues).then(response => {
    if(response.data.message ==="success") {
      navigateTo('/login')
    }
    setButtonLoading(false)
  }).catch((error) => {
    setButtonLoading(false)
    setApiError(error.response.data.message);
  })
}

  const  validationSchema = Yup.object({
    name : Yup.string().required('user name is required').min(3 ,"user name must be greater than 2 characters" ).max(20 ,"user name cant be greater than 20 character") ,
    email : Yup.string().required('email is required').email() ,
    phone : Yup.string().required('phone is required').matches(/^01[0125][0-9]{8}$/ , "please enter valid egyptian number") ,
    password : Yup.string().required('password is required').matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/ , 'Minimum eight characters, at least one letter and one number') ,
    rePassword : Yup.string().required('confirm password is required').oneOf([Yup.ref('password')] , 'password and confirm password don\'t matches') ,
  })

  let formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema 
  })

   return (
    <>
    <div className="flex items-center justify-center pt-10">
      <div className="mx-auto w-full max-w-[550px] bg-white">
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-5">
              <label htmlFor="name" className="mb-3 block text-base font-medium text-[#07074D]">
                  Full Name
              </label>
              <input type="text" name="name" id="name" placeholder="Full Name" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
          </div>
         {
          formik.touched.name && formik.errors.name &&  <div className="p-4 mb-4 text-sm text-red-500 rounded-xl bg-red-50 font-normal capitalize" role="alert">
            <span className="font-semibold mr-2">OOPS:</span>{formik.errors.name}
          </div>
         }
          <div className="mb-5">
              <label htmlFor="phone" className="mb-3 block text-base font-medium text-[#07074D]">
                  Phone Number
              </label>
              <input type="tel" name="phone" id="phone" placeholder="Enter your phone number" value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
          </div>
         {
          formik.touched.phone && formik.errors.phone &&  <div className="p-4 mb-4 text-sm text-red-500 rounded-xl bg-red-50 font-normal capitalize" role="alert">
            <span className="font-semibold mr-2">OOPS:</span>{formik.errors.phone}
          </div>
         }
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
                  {
          apiError &&  <div className="p-4 mb-4 text-sm text-red-500 rounded-xl bg-red-50 font-normal capitalize" role="alert">
            <span className="font-semibold mr-2">OOPS:</span>{apiError}
          </div>
         }
          <div className="-mx-3 flex flex-wrap">
              <div className="w-full px-3 sm:w-1/2">
                  <div className="mb-5">
                      <label htmlFor="password" className="mb-3 block text-base font-medium text-[#07074D]">
                      password
                      </label>
                      <input placeholder='Enter Your Password' type="password" name="password" id="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}
                          className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                  </div>
                 {
                  formik.touched.password && formik.errors.password &&  <div className="p-4 mb-4 text-sm text-red-500 rounded-xl bg-red-50 font-normal capitalize" role="alert">
                    <span className="font-semibold mr-2">OOPS:</span>{formik.errors.password}
                  </div>
                 }
              </div>
              <div className="w-full px-3 sm:w-1/2">
                  <div className="mb-5">
                      <label htmlFor="rePassword" className="mb-3 block text-base font-medium text-[#07074D]">
                      Confirm Password
                      </label>
                      <input placeholder='Confirm Your Password' type="password" name="rePassword" id="rePassword" value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur}
                          className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                  </div>
                 {
                  formik.touched.rePassword && formik.errors.rePassword &&  <div className="p-4 mb-4 text-sm text-red-500 rounded-xl bg-red-50 font-normal capitalize" role="alert">
                    <span className="font-semibold mr-2">OOPS:</span>{formik.errors.rePassword}
                  </div>
                 }
              </div>
          </div>
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
