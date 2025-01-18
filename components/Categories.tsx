import { fetchCategory } from '@/actions/Category';
import Image from 'next/image';

interface Category {
  id: string;
  title: string;
  image: string;
}

interface CategoryCardProps {
  category: Category;
}

function CategoryCard({ category }: CategoryCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-opacity duration-500 opacity-100 p-7 py-0">
      <Image
        src={category.image || '/placeholder.svg'}
        alt={category.title}
        width={200}
        height={200}
        className="w-full h-40 object-cover rounded-[60px] border-[3px] border-green-900"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-center text-green-900">{category.title}</h3>
      </div>
    </div>
  );
}

export default async function Categories() {
  // Fetch categories on the server
  const categories: Category[] = await fetchCategory();

  return (
    <section className="py-12 bg-green-50">
      <div className="w-full p-4">
        <h2 className="text-3xl font-bold mb-8 text-center text-green-800 logo-font">Shop by Categories</h2>
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 logo-font">
          {categories.length > 0 ? (
            categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))
          ) : (
            <p className="text-gray-500 text-center col-span-full">No categories available.</p>
          )}
        </div>
      </div>
    </section>
  );
}
