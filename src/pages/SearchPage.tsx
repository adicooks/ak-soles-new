import { useMemo } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { ALL_PRODUCTS } from '../data/products'

function useQuery() {
  const { search } = useLocation()
  return useMemo(() => new URLSearchParams(search), [search])
}

export default function SearchPage() {
  const query = useQuery()
  const q = (query.get('q') || '').trim().toLowerCase()

  const results = useMemo(() => {
    if (!q) return []
    return ALL_PRODUCTS.filter((p) => {
      return (
        p.name.toLowerCase().includes(q) ||
        p.tag.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      )
    })
  }, [q])

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-950 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold">Search Results</h1>
        </div>

        {!q && (
          <p className="text-gray-400">Type a query in the search bar to find products.</p>
        )}

        {q && results.length === 0 && (
          <p className="text-gray-400">No products found for "{q}".</p>
        )}

        {results.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {results.map((product) => (
              <div
                key={product.tag}
                className="bg-gray-900 rounded-lg overflow-hidden hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
              >
                <Link to={`/product/${product.tag}`} className="block">
                  <div className="aspect-square bg-gray-800 overflow-hidden flex items-center justify-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-3/4 h-3/4 object-contain hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </Link>
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
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
