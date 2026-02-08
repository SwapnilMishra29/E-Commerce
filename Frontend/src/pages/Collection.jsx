import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'

const Collection = () => {

  const { products, search, showSearch } = useContext(ShopContext)

  const [showFilter, setShowFilter] = useState(false)
  const [filterProducts, setFilterProducts] = useState([])
  const [category, setCategory] = useState([])
  const [subCategory, setSubCategory] = useState([])
  const [sortType, setSortType] = useState('relevent')

  // Toggle Category
  const toggleCategory = (e) => {
    const value = e.target.value
    setCategory(prev =>
      prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value]
    )
  }

  // Toggle SubCategory
  const toggleSubCategory = (e) => {
    const value = e.target.value
    setSubCategory(prev =>
      prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value]
    )
  }

  // Apply Filters + Sorting
  const applyFilter = () => {
    let filtered = [...products]

    if (showSearch && search) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
      )
    }

    if (category.length > 0) {
      filtered = filtered.filter(item =>
        category.includes(item.category)
      )
    }

    if (subCategory.length > 0) {
      filtered = filtered.filter(item =>
        subCategory.includes(item.subCategory)
      )
    }

    if (sortType === 'low-high') {
      filtered = [...filtered].sort((a, b) => a.price - b.price)
    }

    if (sortType === 'high-low') {
      filtered = [...filtered].sort((a, b) => b.price - a.price)
    }

    setFilterProducts(filtered)
  }

  useEffect(() => {
    applyFilter()
  }, [products, category, subCategory, search, showSearch, sortType])

  return (
    <div className='flex flex-col sm:flex-row gap-4 sm:gap-10 pt-10 border-t'>

      {/* FILTER SIDEBAR */}
      <div className='sticky top-20 min-w-60 h-fit self-start bg-white shadow-sm'>

        <p
          onClick={() => setShowFilter(!showFilter)}
          className='my-2 text-xl flex items-center cursor-pointer gap-2 font-medium'
        >
          FILTERS
          <img
            className={`h-3 sm:hidden transition-transform ${showFilter ? 'rotate-90' : ''}`}
            src={assets.dropdown_icon}
            alt=""
          />
        </p>

        {/* CATEGORY FILTER */}
        <div className={`border border-gray-300 pl-5 py-3 my-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm text-gray-700'>
            {['Men', 'Women', 'Kids'].map(cat => (
              <label key={cat} className='flex items-center gap-2 cursor-pointer'>
                <input type="checkbox" value={cat} onChange={toggleCategory} />
                {cat}
              </label>
            ))}
          </div>
        </div>

        {/* SUBCATEGORY FILTER */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm text-gray-700'>
            {['Topwear', 'Bottomwear', 'Winterwear'].map(type => (
              <label key={type} className='flex items-center gap-2 cursor-pointer'>
                <input type="checkbox" value={type} onChange={toggleSubCategory} />
                {type}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* PRODUCTS SECTION */}
      <div className='flex-1'>

        <div className='flex justify-between items-center text-base sm:text-2xl mb-4'>
          <Title text1={'ALL'} text2={'COLLECTION'} />

          <select
            onChange={(e) => setSortType(e.target.value)}
            className='border-2 border-gray-300 text-sm px-2 py-1'
          >
            <option value="relevent">Sort by: Relevent</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* PRODUCT GRID */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {filterProducts.length > 0 ? (
            filterProducts.map((item) => (
              <ProductItem
                key={item._id}
                id={item._id}
                name={item.name}
                price={item.price}
                image={item.image}
              />
            ))
          ) : (
            <p className='text-gray-500 col-span-full text-center'>
              No products found
            </p>
          )}
        </div>

      </div>
    </div>
  )
}

export default Collection
