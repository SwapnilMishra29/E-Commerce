import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

const Contact = () => {
  return (
    <div>

      {/* PAGE TITLE */}
      <div className='text-center text-2xl pt-10 border-t'>
        <Title text1={'CONTACT'} text2={'US'} />
      </div>

      {/* CONTACT SECTION */}
      <div className='my-16 flex flex-col items-center md:flex-row gap-12 mb-28'>

        <img
          className='w-full md:max-w-[480px] rounded-lg shadow-md'
          src={assets.contact_img}
          alt="Contact us"
        />

        <div className='flex flex-col justify-center items-start gap-6 max-w-md text-gray-600'>

          <div>
            <p className='font-semibold text-xl text-gray-800'>Our Store</p>
            <p className='mt-2 text-gray-500'>
              54701 Williams Station Road <br />
              Suite 350, Washington, USA
            </p>
          </div>

          <div>
            <p className='text-gray-500'>
              <span className='font-medium text-gray-700'>Phone:</span> (415) 555-0132 <br />
              <span className='font-medium text-gray-700'>Email:</span> support@forever.com
            </p>
          </div>

          <div className='pt-2'>
            <p className='font-semibold text-xl text-gray-800'>Careers at Forever</p>
            <p className='mt-2 text-gray-500'>
              We’re always looking for passionate people to join our growing
              team. Explore open roles and build the future of e-commerce with us.
            </p>
          </div>

          <button className='mt-2 border border-black px-8 py-3 text-sm font-medium hover:bg-black hover:text-white transition'>
            Explore Careers
          </button>

        </div>
      </div>

      {/* NEWSLETTER */}
      <NewsLetterBox />
    </div>
  )
}

export default Contact
