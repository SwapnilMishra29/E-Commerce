import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'

const Navbar = () => {
  const [visible, setVisible] = useState(false)
  const {
    setShowSearch,
    getCartCount,
    token,
    setToken,
    setCartItems,
  } = useContext(ShopContext)

  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem('token')
    setToken('')
    setCartItems({})
    navigate('/login')
  }

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = visible ? 'hidden' : 'auto'
  }, [visible])

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'COLLECTION', path: '/collection' },
    { name: 'ABOUT', path: '/about' },
    { name: 'CONTACT', path: '/contact' },
  ]

  return (
    <>
      {/* ================= DESKTOP NAVBAR ================= */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="max-w-[1400px] mx-auto px-4 flex items-center justify-between py-5 font-medium">

          {/* Logo */}
          <Link to="/">
            <img src={assets.logo} className="w-36" alt="logo" />
          </Link>

          {/* Desktop Links */}
          <ul className="hidden sm:flex gap-6 text-sm text-gray-700">
            {navLinks.map(link => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `flex flex-col items-center gap-1 ${
                    isActive ? 'text-black' : ''
                  }`
                }
              >
                <p>{link.name}</p>
                <span className="w-2/4 h-[2px] bg-black scale-x-0 group-hover:scale-x-100 transition-transform" />
              </NavLink>
            ))}
          </ul>

          {/* Right Icons */}
          <div className="flex items-center gap-6">

            {/* Search */}
            <img
              onClick={() => {
                setShowSearch(true)
                navigate('/collection')
              }}
              src={assets.search_icon}
              className="w-5 cursor-pointer"
              alt="search"
            />

            {/* Profile */}
            <div className="relative group">
              <img
                onClick={() => !token && navigate('/login')}
                src={assets.profile_icon}
                className="w-5 cursor-pointer"
                alt="profile"
              />

              {token && (
                <div className="absolute right-0 pt-4 hidden group-hover:block">
                  <div className="w-40 bg-white shadow-lg rounded-md border text-gray-600 text-sm">
                    <p className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      My Profile
                    </p>
                    <p
                      onClick={() => navigate('/orders')}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      Orders
                    </p>
                    <p
                      onClick={logout}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      Logout
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Cart */}
            <Link to="/cart" className="relative">
              <img src={assets.cart_icon} className="w-5" alt="cart" />
              <span className="absolute -right-2 -bottom-2 w-4 h-4 flex items-center justify-center bg-black text-white rounded-full text-[10px]">
                {getCartCount()}
              </span>
            </Link>

            {/* Mobile Menu Icon */}
            <img
              onClick={() => setVisible(true)}
              src={assets.menu_icon}
              className="w-5 cursor-pointer sm:hidden"
              alt="menu"
            />
          </div>
        </div>
      </header>

      {/* ================= MOBILE SIDEBAR ================= */}
      <div
        className={`fixed inset-0 z-[999] bg-white transform transition-transform duration-300
        ${visible ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex flex-col h-full">

          {/* Back */}
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-4 border-b cursor-pointer"
          >
            <img src={assets.dropdown_icon} className="h-4 rotate-180" alt="" />
            <p className="font-medium">Back</p>
          </div>

          {/* Mobile Links */}
          {navLinks.map(link => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setVisible(false)}
              className={({ isActive }) =>
                `py-4 pl-6 border-b text-base font-medium ${
                  isActive
                    ? 'bg-gray-100 text-black'
                    : 'text-gray-700'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>
      </div>
    </>
  )
}

export default Navbar
