import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {

  const {productId} = useParams();
 
  const {products,currency,addToCart} = useContext(ShopContext);
  const [productData, setProductData] = useState(false)
  const [image,setImage] = useState('');
  const [size, setSize] = useState('')
  const [activeTab, setActiveTab] = useState('description')


  const fetchProductData = async () => {
    products.map((item)=>{
      if (item._id === productId) {
        setProductData(item)
        setImage(item.image[0]);
        return null;
      }
    })
  }
  useEffect(()=>{
    fetchProductData()
  },[productId,products])

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacaity-100'>
      {/*Product data */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        {/*Product images */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auti sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {
              productData.image.map((item,index)=>(
                <img onClick={()=>setImage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 slex-shrink-0 cursor-pointer' alt="" />
              ))
            }
          </div>
          <div className='w-full sm:w-[80%]'>
            <img src={image} className='w-full h-auto' alt="" />
          </div>
        </div>
        {/* -----product Info-------- */}
        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
            <img className='w-3 5' src={assets.star_icon} alt="" />
            <img className='w-3 5' src={assets.star_icon} alt="" />
            <img className='w-3 5' src={assets.star_icon} alt="" />
            <img className='w-3 5' src={assets.star_icon} alt="" />
            <img className='w-3 5' src={assets.star_dull_icon} alt="" />
            <p className='pl-2'>{122}</p>
          </div>
           <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
           <p className='mt-5 text-gray-500 w-4/5'>{productData.description}</p>
           <div className='flex flex-col gap-4 my-8'>
             <p>Select Size</p>
             <div className='flex gap-2'>
              {productData.sizes.map((item,index)=>(
                <button onClick={()=>setSize(item)} className={`border py-2 px-4 bg-gray-100 ${item == size ? 'border-orange-500' : ''}`} key={index}>{item}</button>
              ))}
             </div>
           </div>
           <button onClick={()=>addToCart(productData._id,size)} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>ADD TO CART</button>
           <hr className='mt-8 sm:4/5' />
           <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p>100% Original Product</p>
            <p>Cash on delivery is available on this product</p>
            <p>Easy return and exchange policy within 7 days</p>
           </div>
        </div>
      </div>

      {/* -------Desciption and Review section __________________ */}

      {/* ------- Description and Review section ------- */}
<div className='mt-20'>
  {/* Tabs */}
  <div className='flex border-b'>
    <button
      onClick={() => setActiveTab('description')}
      className={`px-6 py-3 text-sm font-medium ${
        activeTab === 'description'
          ? 'border-b-2 border-black text-black'
          : 'text-gray-500'
      }`}
    >
      Description
    </button>

    <button
      onClick={() => setActiveTab('reviews')}
      className={`px-6 py-3 text-sm font-medium ${
        activeTab === 'reviews'
          ? 'border-b-2 border-black text-black'
          : 'text-gray-500'
      }`}
    >
      Reviews (3)
    </button>
  </div>

  {/* Description */}
  {activeTab === 'description' && (
    <div className='px-6 py-6 text-sm text-gray-600 flex flex-col gap-4'>
      <p>
        Experience the perfect blend of quality, comfort, and modern design.
        Crafted with premium materials, this product ensures durability and
        long-lasting performance.
      </p>
      <p>
        Designed for everyday use, it offers a stylish look while maintaining
        maximum comfort. Ideal for casual as well as regular wear.
      </p>
      <ul className='list-disc pl-5'>
        <li>Premium quality fabric</li>
        <li>Soft & breathable material</li>
        <li>Long-lasting durability</li>
        <li>Easy to maintain</li>
      </ul>
    </div>
  )}

  {/* Reviews */}
  {activeTab === 'reviews' && (
    <div className='px-6 py-6 flex flex-col gap-6'>
      
      {/* Review 1 */}
      <div className='border-b pb-4'>
        <div className='flex items-center gap-3'>
          <p className='font-medium'>Rahul Sharma</p>
          <div className='flex gap-1'>
            <img src={assets.star_icon} className='w-4' />
            <img src={assets.star_icon} className='w-4' />
            <img src={assets.star_icon} className='w-4' />
            <img src={assets.star_icon} className='w-4' />
            <img src={assets.star_dull_icon} className='w-4' />
          </div>
        </div>
        <p className='text-sm text-gray-500 mt-2'>
          Very good quality product. Fabric feels premium and fits perfectly.
          Totally worth the price.
        </p>
      </div>

      {/* Review 2 */}
      <div className='border-b pb-4'>
        <div className='flex items-center gap-3'>
          <p className='font-medium'>Anjali Verma</p>
          <div className='flex gap-1'>
            <img src={assets.star_icon} className='w-4' />
            <img src={assets.star_icon} className='w-4' />
            <img src={assets.star_icon} className='w-4' />
            <img src={assets.star_dull_icon} className='w-4' />
            <img src={assets.star_dull_icon} className='w-4' />
          </div>
        </div>
        <p className='text-sm text-gray-500 mt-2'>
          Nice product but delivery was slightly delayed. Otherwise satisfied
          with the purchase.
        </p>
      </div>

      {/* Review 3 */}
      <div>
        <div className='flex items-center gap-3'>
          <p className='font-medium'>Amit Patel</p>
          <div className='flex gap-1'>
            <img src={assets.star_icon} className='w-4' />
            <img src={assets.star_icon} className='w-4' />
            <img src={assets.star_icon} className='w-4' />
            <img src={assets.star_icon} className='w-4' />
            <img src={assets.star_icon} className='w-4' />
          </div>
        </div>
        <p className='text-sm text-gray-500 mt-2'>
          Excellent product! Looks exactly like the images. Highly recommended.
        </p>
      </div>

    </div>
  )}
</div>

      
      {/* ___________display related Porducts __________ */}
       <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
    </div>
  ) : <div className='opacity-0'></div>

}

export default Product
