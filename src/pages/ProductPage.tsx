import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getProductByTag } from '../data/products'

interface ProductPageProps {
  onAddToCart: (product: {
    name: string
    tag: string
    price: number
    size: number
    image: string
  }) => void
}

export default function ProductPage({ onAddToCart }: ProductPageProps) {
  const { tag } = useParams<{ tag: string }>()
  const [showSizePopup, setShowSizePopup] = useState(false)

  const product = useMemo(() => {
    if (!tag) return undefined
    return getProductByTag(tag)
  }, [tag])

  const availableSizes = [8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13]

  if (!product) {
    return (
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-950 min-h-screen">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">Product not found</h1>
          <p className="text-gray-400">This product may have been removed or the link is incorrect.</p>
        </div>
      </section>
    )
  }

  const handleAddToCart = () => {
    setShowSizePopup(true)
  }

  const handleSizeSelect = (size: number) => {
    setShowSizePopup(false)
    onAddToCart({
      ...product,
      size: size
    })
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-950 min-h-screen">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="bg-gray-900 rounded-lg p-6 flex items-center justify-center">
          <img src={product.image} alt={product.name} className="w-full max-w-md object-contain" />
        </div>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold leading-tight">{product.name}</h1>
            <div className="mt-2 text-gray-400">Category: <span className="capitalize">{product.category}</span></div>
          </div>
          <div className="text-2xl text-primary font-bold">${product.price}</div>
          <button
            onClick={handleAddToCart}
            className="w-full md:w-auto bg-primary text-black font-bold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Size Selection Popup */}
      {showSizePopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-lg p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold mb-6 text-white">Select Size</h2>
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
              onClick={() => setShowSizePopup(false)}
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
