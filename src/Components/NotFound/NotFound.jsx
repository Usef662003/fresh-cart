import React from 'react'
import style from './NotFound.module.css'
import error from './../../assets/images/error.svg'

export default function NotFound() {
  
  return <>
  <div className="flex items-center h-[85vh]">
  <img src={error} className='w-[60%] mx-auto  ' alt="error page" />
  </div>
  </>
}
