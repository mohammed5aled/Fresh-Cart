import React, { useEffect, useState } from 'react'
import styles from './CheckOut.module.css'
import { useFormik } from 'formik'
import * as Yup from "yup"
import axios from 'axios'
import { useParams } from 'react-router-dom'

export default function CheckOut() {
  let [buttonLoading , setButtonLoading] = useState(false)

  let {cartId} = useParams()

  const initialValues = {
    details : '',
    phone : '',
    city : '',
  }
  async function onSubmit(formValues) {
    setButtonLoading(true)
    await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}` , {shippingAddress : formValues} , {
      headers : {
        token : localStorage.getItem('userToken')
      }, params :{
        url : 'http://localhost:5173'
      },
    } , 
  ).then(
    data => {
      location.href = data.data.session.url      
      setButtonLoading(false)
    }
  )

  }
    let formik = useFormik({
      initialValues , 
      onSubmit,
      validationSchema : Yup.object({
        city : Yup.string().required('city is required'),
        phone : Yup.string().required('phone is required').matches(/^01[0125][0-9]{8}$/ , "please enter valid egyptian number") ,
        details : Yup.string().required('details is required'),
      })
    })




    useEffect(() => {} , [])

   return (
    <>
      <div className="flex items-center justify-center pt-10">
      <div className="mx-auto w-full max-w-[550px] bg-white">
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-5">
              <label htmlFor="details" className="mb-3 block text-base font-medium text-[#07074D]">
                  Details Address
              </label>
              <input type="text" name="details" id="details" placeholder="Enter your details" value={formik.values.details} onChange={formik.handleChange} onBlur={formik.handleBlur}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
          </div>
          { formik.touched.details && formik.errors.details &&  <div className="p-4 mb-4 text-sm text-red-500 rounded-xl bg-red-50 font-normal capitalize" role="alert">
            <span className="font-semibold mr-2">OOPS:</span>{formik.errors.details}
          </div>
          }
          <div className="mb-5">
              <label htmlFor="phone" className="mb-3 block text-base font-medium text-[#07074D]">
              phone
              </label>
              <input type="tel" name="phone" id="phone" placeholder="Enter your phone" value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
          </div>
          { formik.touched.phone && formik.errors.phone &&  <div className="p-4 mb-4 text-sm text-red-500 rounded-xl bg-red-50 font-normal capitalize" role="alert">
            <span className="font-semibold mr-2">OOPS:</span>{formik.errors.phone}
          </div>
          }
          <div className="-mx-3 flex flex-wrap">
              <div className="w-full px-3 ">
                  <div className="mb-5">
                      <label htmlFor="city" className="mb-3 block text-base font-medium text-[#07074D]">
                      city
                      </label>
                      <input placeholder='Enter Your city' type="text" name="city" id="city" value={formik.values.city} onChange={formik.handleChange} onBlur={formik.handleBlur}
                          className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                  </div>
              </div>
          </div>
              {
                formik.touched.city && formik.errors.city &&  <div className="p-4 mb-4 text-sm text-red-500 rounded-xl bg-red-50 font-normal capitalize" role="alert">
                  <span className="font-semibold mr-2">OOPS:</span>{formik.errors.city}
                </div>
              }
          <div>
            <button
              className="hover:shadow-form w-full rounded-md bg-cyan-500 py-3 px-8 text-center text-base font-semibold text-white outline-none disabled:bg-slate-800 disabled:cursor-not-allowed" disabled={buttonLoading}>
              {buttonLoading ? <i className="fa-solid fa-spinner fa-spin"></i> : 'check out now'}
            </button>
          </div>
        </form>
      </div>
      </div>
    </>
  )
}
