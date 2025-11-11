import { useMemo } from 'react'
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

  const product = useMemo(() => {
    if (!tag) return undefined
    return getProductByTag(tag)
  }, [tag])

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
          <div className="text-gray-300">Size: {product.size}</div>
          <button
            onClick={() => onAddToCart(product)}
            className="w-full md:w-auto bg-primary text-black font-bold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </section>
  )
}
