'use client'

import Image from 'next/image'
import { useIntersectionObserver } from '../utils/useIntersectionObserver'

interface Category {
  id: number
  title: string
  image: string
}

interface CategoryCardProps {
  category: Category
}

const categories: Category[] = [
  { id: 1, title: 'Fruits', image: '/placeholder.svg' },
  { id: 2, title: 'Vegetables', image: '/placeholder.svg' },
  { id: 3, title: 'Grains', image: '/placeholder.svg' },
  { id: 4, title: 'Dairy', image: '/placeholder.svg' },
  { id: 5, title: 'Meat', image: '/placeholder.svg' },
]

function CategoryCard({ category }: CategoryCardProps) {
  const [targetRef, isIntersecting] = useIntersectionObserver({ threshold: 0.1 })

  return (
    <div
      ref={targetRef}
      className={`bg-white rounded-lg shadow-md overflow-hidden transition-opacity duration-500 ${
        isIntersecting ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <Image
        src={category.image || "/placeholder.svg"}
        alt={category.title}
        width={200}
        height={200}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-center">{category.title}</h3>
      </div>
    </div>
  )
}

export default function Categories() {
  return (
    <section className="py-12 bg-green-50">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center text-green-800">Shop by Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  )
}

