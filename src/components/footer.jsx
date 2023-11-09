import React from 'react'
import { FaTwitter,FaInstagram,FaThreads,FaFacebook } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className='flex items-center justify-between p-10' id='contact-us'>
      <span className='text-lg font-black'>DevCoLab</span>
      <span className='flex gap-5'>
      <FaTwitter size={40}/>
      <FaInstagram size={40}/>
      <FaThreads size={40}/>
      <FaFacebook size={40}/>
      </span>
    </div>
  )
}

export default Footer