import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { ALL_PRODUCTS } from '../data/products'

interface Product {
  name: string
  tag: string
  price: number
  size: number
  image: string
}

interface ProductsProps {
  onAddToCart: (product: Product) => void
}

const PRODUCTS: Product[] = ALL_PRODUCTS

export default function Products({ onAddToCart }: ProductsProps) {
  const itemsPerPage = 4
  const shuffled = useMemo(() => {
    const arr = [...PRODUCTS]
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr
  }, [])
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev + itemsPerPage >= shuffled.length ? 0 : prev + itemsPerPage
    )
  }

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev - itemsPerPage < 0 ? Math.max(0, shuffled.length - itemsPerPage) : prev - itemsPerPage
    )
  }

  const visibleProducts = shuffled.slice(currentIndex, currentIndex + itemsPerPage)

  return (
    <section id="products" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-950">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold">
            Popular <span className="text-primary">Products</span>
          </h2>
          <div className="flex gap-4">
            <button
              onClick={prevSlide}
              className="p-2 hover:bg-gray-800 rounded-lg transition"
              aria-label="Previous"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextSlide}
              className="p-2 hover:bg-gray-800 rounded-lg transition"
              aria-label="Next"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {visibleProducts.map((product) => (
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
