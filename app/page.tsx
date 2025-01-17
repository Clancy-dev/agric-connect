
import Categories from '@/components/Categories'
import Products from '../components/Products'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <main>
        <Categories />
        <Products />
      </main>
    </div>
  )
}

