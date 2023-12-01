import React from 'react'
import { FaTwitter,FaInstagram,FaThreads,FaFacebook } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className='flex items-center justify-between p-10' id='contact-us'>
      <span className='lg:text-lg sm:text-sm font-black'>DevCoLab</span>
      <span className='flex gap-5 lg:hidden'>
      <FaTwitter size={20}/>
      <FaInstagram size={20}/>
      <FaThreads size={20}/>
      <FaFacebook size={20}/>
      </span>
      <span className=' gap-5 lg:flex sm:hidden'>
      <FaTwitter size={40}/>
      <FaInstagram size={40}/>
      <FaThreads size={40}/>
      <FaFacebook size={40}/>
      </span>
    </div>
  )
}

export default Footer