import React, { useEffect, useState } from 'react'
import styles from './TemplateName.module.css'

export default function TemplateName() {

    let [counter , setCounter ] = useState(0)

    useEffect(() => {} , [])

   return (
    <>
        <h1 className='text-red-500 text-center my-5 text-2xl'>TemplateName</h1> 
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consectetur iusto doloremque cupiditate aperiam. Quasi nesciunt nulla optio dignissimos id eum eveniet expedita, natus voluptatibus suscipit atque laudantium, quo repellendus neque.</p>
    </>
  )
}
