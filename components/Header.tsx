'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { ShoppingCart, X, Menu, Home, Tractor, Truck, Users } from 'lucide-react'
import { useCart } from '../context/CartContext'
import SearchBar from './SearchBar'

export default function Header() {
  const { cartItems, removeFromCart, getTotal } = useCart()
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/farmers', label: 'Farmers', icon: Tractor },
    { href: '/transport-providers', label: 'Transport Providers', icon: Truck },
    { href: '/consumers', label: 'Consumers', icon: Users },
  ]

  useEffect(() => {
    const closeMenus = () => {
      setIsCartOpen(false)
      setIsMenuOpen(false)
    }

    window.addEventListener('resize', closeMenus)
    return () => window.removeEventListener('resize', closeMenus)
  }, [])

  const NavLink = ({ href, label, icon: Icon }:any) => {
    const isActive = pathname === href
    return (
      <Link
        href={href}
        className={`flex items-center px-4 py-2 rounded-md transition-colors duration-200
          ${isActive
            ? 'bg-green-700 text-white border-b-2 border-white'
            : 'text-white hover:bg-green-500'
          }`}
      >
        <Icon size={20} className="mr-2" />
        {label}
      </Link>
    )
  }

  return (
    <>
      <header className="bg-gradient-to-r from-green-600 to-green-400 text-white p-4 sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold logo-font flex items-center justify-center gap-2">
          <div className='w-30 h-30'>
            <Image
            alt="logo"
            src="/ac-logo.png"
            width={50}
            height={50}
            className="w-full h-full object-cover rounded-[50px]"
            />

          </div>
          


            Agri-Connect
          </Link>
          <nav className="hidden md:flex space-x-4">
            {navItems.map((item) => (
              <NavLink key={item.href} {...item} />
            ))}
          </nav>
          <div className="flex items-center space-x-4">
            <button
              className="text-white hover:text-green-200 relative"
              onClick={() => setIsCartOpen(!isCartOpen)}
            >
              <ShoppingCart size={24} />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartItems.length}
                </span>
              )}
            </button>
            <button
              className="md:hidden text-white hover:text-green-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>
      <SearchBar />
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="bg-gradient-to-r from-green-600 to-green-400 w-64 h-full overflow-y-auto shadow-lg transform transition-transform duration-300 ease-in-out">
            <div className="flex justify-between items-center p-4 border-b border-green-300">
              <h2 className="text-xl font-bold text-white">Menu</h2>
              <button onClick={() => setIsMenuOpen(false)} className="text-white hover:text-green-200">
                <X size={24} />
              </button>
            </div>
            <nav className="p-4">
              {navItems.map((item) => (
                <NavLink key={item.href} {...item} />
              ))}
            </nav>
          </div>
        </div>
      )}
      {isCartOpen && (
        <div className="fixed right-0 top-0 h-full w-64 bg-white shadow-lg z-50 overflow-y-auto">
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="text-xl font-bold text-green-600">Your Cart</h2>
            <button onClick={() => setIsCartOpen(false)} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>
          <div className="py-4">
            {cartItems.length === 0 ? (
              <p className="text-gray-700 px-4 py-2">Your cart is empty</p>
            ) : (
              <>
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center px-4 py-2 hover:bg-gray-100">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{item.title}</p>
                      <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
                <div className="border-t border-gray-200 px-4 py-2 mt-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-900">Total</span>
                    <span className="text-sm font-medium text-gray-900">${getTotal().toFixed(2)}</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}

