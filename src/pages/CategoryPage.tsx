import { Link } from 'react-router-dom'
import { getProductsByCategory } from '../data/products'

interface Product {
  name: string
  tag: string
  price: number
  size: number
  image: string
}

interface CategoryPageProps {
  category: 'nike' | 'jordan' | 'yeezy'
  onAddToCart: (product: Product) => void
}

// products now come from shared dataset

export default function CategoryPage({ category, onAddToCart }: CategoryPageProps) {
  const products = getProductsByCategory(category)
  const categoryTitle = category.charAt(0).toUpperCase() + category.slice(1)

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-950 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-5xl sm:text-6xl font-bold">
            {categoryTitle}
            <br />
            <span className="text-primary">Collection</span>
          </h1>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.tag}
              className="bg-gray-900 rounded-lg overflow-hidden hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
            >
              {/* Image Container */}
              <Link to={`/product/${product.tag}`} className="block">
                <div className="aspect-square bg-gray-800 overflow-hidden flex items-center justify-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-3/4 h-3/4 object-contain hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </Link>

              {/* Product Info */}
              <div className="p-4 space-y-3">
                <Link to={`/product/${product.tag}`} className="block">
                  <h3 className="font-bold text-lg line-clamp-2 hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                </Link>

                <div className="flex justify-between items-center text-sm text-gray-400">
                  <span>Size {product.size}</span>
                  <span className="text-primary font-bold">${product.price}</span>
                </div>

                <button
                  onClick={() => onAddToCart(product)}
                  className="w-full bg-primary text-black font-bold py-2 rounded-lg hover:opacity-90 transition-opacity"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
