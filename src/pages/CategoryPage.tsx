import { useState } from 'react'
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
  const [showSizePopup, setShowSizePopup] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const availableSizes = [8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13]

  const handleAddToCartClick = (product: Product) => {
    setSelectedProduct(product)
    setShowSizePopup(true)
  }

  const handleSizeSelect = (size: number) => {
    if (selectedProduct) {
      onAddToCart({
        ...selectedProduct,
        size: size
      })
      setShowSizePopup(false)
      setSelectedProduct(null)
    }
  }

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
                  onClick={() => handleAddToCartClick(product)}
                  className="w-full bg-primary text-black font-bold py-2 rounded-lg hover:opacity-90 transition-opacity"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Size Selection Popup */}
      {showSizePopup && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-lg p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold mb-2 text-white">{selectedProduct.name}</h2>
            <p className="text-gray-400 mb-6">Select Size</p>
            <div className="grid grid-cols-3 gap-3 mb-6">
              {availableSizes.map((size) => (
                <button
                  key={size}
                  onClick={() => handleSizeSelect(size)}
                  className="bg-gray-800 text-white py-3 px-4 rounded-lg hover:bg-primary hover:text-black transition-colors font-bold"
                >
                  {size}
                </button>
              ))}
            </div>
            <button
              onClick={() => {
                setShowSizePopup(false)
                setSelectedProduct(null)
              }}
              className="w-full bg-gray-700 text-white py-3 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
