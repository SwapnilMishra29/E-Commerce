import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Footer = () => {

  const navigate = useNavigate()

  return (
    <footer className='bg-gray-50 mt-40'>
      <div className='max-w-7xl mx-auto px-6'>

        {/* TOP SECTION */}
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-14 py-16 text-sm'>

          {/* BRAND */}
          <div>
            <img className='mb-5 w-32' src={assets.logo} alt="Forever logo" />
            <p className='text-gray-600 leading-relaxed md:w-2/3'>
              Forever is a modern e-commerce platform focused on delivering
              quality products with a seamless shopping experience. From
              trending fashion to everyday essentials — we’ve got you covered.
            </p>
          </div>

          {/* COMPANY LINKS */}
          <div>
            <p className='text-lg font-semibold mb-5'>Company</p>
            <ul className='flex flex-col gap-2 text-gray-600'>
              <li onClick={() => navigate('/')} className='hover:text-black cursor-pointer transition'>Home</li>
              <li onClick={() => navigate('/about')} className='hover:text-black cursor-pointer transition'>About Us</li>
              <li onClick={() => navigate('/orders')} className='hover:text-black cursor-pointer transition'>Delivery Information</li>
              <li className='hover:text-black cursor-pointer transition'>Privacy Policy</li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <p className='text-lg font-semibold mb-5'>Get in Touch</p>
            <ul className='flex flex-col gap-2 text-gray-600'>
              <li>📞 +1 (212) 456-7890</li>
              <li>✉️ support@forever.com</li>
              <li>🕒 Mon – Sat: 9AM – 8PM</li>
            </ul>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className='border-t'>
          <p className='py-6 text-sm text-center text-gray-500'>
            © {new Date().getFullYear()} Forever. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  )
}

export default Footer
