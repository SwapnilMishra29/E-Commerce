import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Collection from './pages/Collection'
import Contact from './pages/Contact'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Login from './pages/Login'
import PlaceOrder from './pages/PlaceOrder'
import Orders from './pages/Orders'
import Navbar from './components/Navbar'
import About from './pages/About'
import Footer from './components/Footer'
import Searchbar from './components/Searchbar'
import ScrollToTop from './components/ScrollToTop'
 import { ToastContainer, toast } from 'react-toastify';
import Verify from './pages/verify'

const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vh] lg:px-[9vw]'>
      <ToastContainer />
      <Navbar />
      <ScrollToTop />
      <Searchbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/collection' element={<Collection />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/product/:productId' element={<Product />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/login' element={<Login />} />
        <Route path='/place_order' element={<PlaceOrder />} />
        <Route path='/orders' element={<Orders />} />
         <Route path='/verify' element={<Verify />} />

      </Routes>
      <Footer />
    </div>
  )
}

export default App
