import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

const About = () => {
  return (
    <div>

      {/* PAGE TITLE */}
      <div className='text-2xl text-center pt-10 border-t'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      {/* ABOUT SECTION */}
      <div className='my-16 flex flex-col md:flex-row items-center gap-16'>
        <img
          className='w-full md:max-w-[450px] rounded-lg shadow-md'
          src={assets.about_img}
          alt="About our store"
        />

        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600 leading-relaxed'>
          <p>
            We are a modern e-commerce platform built to make online shopping
            simple, reliable, and enjoyable. From everyday essentials to
            carefully curated fashion pieces, we focus on delivering quality
            products at fair prices.
          </p>

          <p>
            Our journey started with a single goal — to bridge the gap between
            great products and great customer experience. We work closely with
            trusted suppliers and brands to ensure every item meets our quality
            standards before reaching you.
          </p>

          <div>
            <b className='text-gray-800 text-lg'>Our Mission</b>
            <p className='mt-2'>
              To empower customers with a seamless shopping experience by
              combining quality products, transparent pricing, and dependable
              service — all in one place.
            </p>
          </div>
        </div>
      </div>

      {/* WHY CHOOSE US */}
      <div className='text-center mb-12'>
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-24'>

        {/* CARD 1 */}
        <div className='border rounded-lg px-8 py-12 flex flex-col gap-4 hover:shadow-lg transition'>
          <b className='text-lg'>Quality Assurance</b>
          <p className='text-gray-600'>
            Every product listed on our platform goes through strict quality
            checks. We partner only with reliable sellers to ensure durability,
            authenticity, and value for money.
          </p>
        </div>

        {/* CARD 2 */}
        <div className='border rounded-lg px-8 py-12 flex flex-col gap-4 hover:shadow-lg transition'>
          <b className='text-lg'>Convenience & Speed</b>
          <p className='text-gray-600'>
            From easy browsing to secure checkout, we’ve designed our platform
            for speed and simplicity. Track orders, manage returns, and shop
            anytime, anywhere.
          </p>
        </div>

        {/* CARD 3 */}
        <div className='border rounded-lg px-8 py-12 flex flex-col gap-4 hover:shadow-lg transition'>
          <b className='text-lg'>Customer-First Support</b>
          <p className='text-gray-600'>
            Our support team is always ready to help. Whether it’s an order
            query, a return, or a product question — your satisfaction comes
            first.
          </p>
        </div>

      </div>

      {/* NEWSLETTER */}
      <NewsLetterBox />
    </div>
  )
}

export default About
