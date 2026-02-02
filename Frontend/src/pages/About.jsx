import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={"ABOUT"} text2={'US'} />
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil ad perferendis itaque fugiat ullam, eaque vero neque debitis molestias magni recusandae numquam eveniet, quasi aut a minus iste ipsam? Id.</p>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque, a dicta? Error voluptatem, doloribus id, aut, consequatur sapiente alias asperiores qui commodi iste quod excepturi harum quo quia consequuntur iure?</p>
        <b className='text-gray-800'>Our Mission</b>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, mollitia hic? Repellendus corrupti quasi ipsa reprehenderit, quidem aspernatur nulla voluptatibus reiciendis totam illo natus ipsam inventore molestias rem sed id?</p>
        </div>
      </div>
      <div className='text-4-xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>
      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance:</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam illo enim quos nam quas earum, non quod eos in facere ipsa libero dolore, esse natus. Neque saepe minus repudiandae iusto?</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience:</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam illo enim quos nam quas earum, non quod eos in facere ipsa libero dolore, esse natus. Neque saepe minus repudiandae iusto?</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service:</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam illo enim quos nam quas earum, non quod eos in facere ipsa libero dolore, esse natus. Neque saepe minus repudiandae iusto?</p>
        </div>
      </div>
      <NewsLetterBox />
    </div>
  )
}

export default About
