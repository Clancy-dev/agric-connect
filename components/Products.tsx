'use client'

import Image from 'next/image'
import { Star, ShoppingCart, Truck } from 'lucide-react'
import { useCart } from '../context/CartContext'

interface Product {
  id: number
  title: string
  category: string
  image: string
  price: number
  rating: number
  inStock: boolean
  isAvailable: boolean
  isRentable: boolean
}

interface ProductCardProps {
  product: Product
}

const products: Product[] = [
  {
    id: 1,
    title: 'Fresh Apples',
    category: 'Fruits',
    image: '/placeholder.svg',
    price: 2.99,
    rating: 4.5,
    inStock: true,
    isAvailable: true,
    isRentable: false,
  },
  {
    id: 2,
    title: 'Organic Carrots',
    category: 'Vegetables',
    image: '/placeholder.svg',
    price: 1.99,
    rating: 4.2,
    inStock: true,
    isAvailable: true,
    isRentable: false,
  },
  {
    id: 3,
    title: 'Tractor',
    category: 'Farm Equipment',
    image: '/placeholder.svg',
    price: 199.99,
    rating: 4.8,
    inStock: false,
    isAvailable: true,
    isRentable: true,
  },
]

function ProductCard({ product }: ProductCardProps) {
  const { addToCart, removeFromCart, isInCart } = useCart()

  const handleCartAction = () => {
    if (isInCart(product.id)) {
      removeFromCart(product.id)
    } else {
      addToCart(product)
    }
  }

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden transition-opacity duration-500"
    >
      <Image
        src={product.image || "/placeholder.svg"}
        alt={product.title}
        width={300}
        height={200}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <span className="text-sm text-green-600 font-semibold">{product.category}</span>
        <h2 className="text-xl font-bold mt-1">{product.title}</h2>
        <div className="flex items-center mt-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={16}
              className={i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
            />
          ))}
          <span className="ml-2 text-sm text-gray-600">{product.rating.toFixed(1)}</span>
        </div>
        <div className="mt-2">
          {product.inStock ? (
            <span className="text-green-600 font-semibold">In Stock</span>
          ) : product.isAvailable ? (
            <span className="text-blue-600 font-semibold">Available</span>
          ) : (
            <span className="text-red-600 font-semibold">Out of Stock</span>
          )}
        </div>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-2xl font-bold text-green-700">${product.price.toFixed(2)}</span>
          <button
            onClick={handleCartAction}
            className={`px-4 py-2 rounded-full flex items-center ${
              isInCart(product.id)
                ? 'bg-red-500 hover:bg-red-600 text-white'
                : 'bg-green-500 hover:bg-green-600 text-white'
            }`}
          >
            {product.isRentable ? <Truck size={20} className="mr-2" /> : <ShoppingCart size={20} className="mr-2" />}
            {isInCart(product.id)
              ? product.isRentable
                ? 'Cancel Rent'
                : 'Remove'
              : product.isRentable
              ? 'Rent'
              : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Products() {
  return (
    <section className="py-12">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center text-green-800 logo-font">Shop by Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
