import { ShoppingCart, Search, Menu } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

interface NavbarProps {
  cartCount: number
}

export default function Navbar({ cartCount }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const onSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const q = query.trim()
    if (q) {
      navigate(`/search?q=${encodeURIComponent(q)}`)
      setIsOpen(false)
    }
  }

  return (
    <nav className="bg-black border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center text-2xl font-bold text-white">
              <img src="/img/icon_copy.png" alt="AK Soles" className="w-8 h-8 mr-2 rounded" />
              AK Soles
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="hover:text-primary transition">
              Home
            </Link>
            <div className="group relative">
              <button className="hover:text-primary transition flex items-center">
                Shop
                <span className="ml-1 text-xs">▼</span>
              </button>
              <div className="absolute left-0 mt-0 w-48 bg-gray-900 rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition">
                <Link to="/shop/nike" className="block px-4 py-2 hover:bg-gray-800">
                  Nike
                </Link>
                <Link to="/shop/jordan" className="block px-4 py-2 hover:bg-gray-800">
                  Jordan
                </Link>
                <Link to="/shop/yeezy" className="block px-4 py-2 hover:bg-gray-800">
                  Yeezy
                </Link>
              </div>
            </div>
            <a href="#about" className="hover:text-primary transition">
              About
            </a>
            <a href="#testimonials" className="hover:text-primary transition">
              Testimonials
            </a>
            <a href="#contact" className="hover:text-primary transition">
              Contact
            </a>
          </div>

          {/* Right side: search + icons */}
          <div className="flex items-center space-x-4">
            <form onSubmit={onSearchSubmit} className="hidden md:flex items-center gap-2">
              <div className="relative">
                <Search size={18} className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search products..."
                  className="pl-8 pr-3 py-2 rounded bg-gray-900 border border-gray-800 focus:border-primary outline-none text-sm w-56"
                />
              </div>
            </form>
            <Link to="/cart" className="relative p-2 hover:bg-gray-900 rounded">
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-primary text-black text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <button
              className="md:hidden p-2 hover:bg-gray-900 rounded"
              onClick={() => setIsOpen(!isOpen)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <form onSubmit={onSearchSubmit} className="px-4">
              <div className="relative">
                <Search size={18} className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search products..."
                  className="pl-8 pr-3 py-2 rounded bg-gray-900 border border-gray-800 focus:border-primary outline-none text-sm w-full"
                />
              </div>
            </form>
            <Link to="/" className="block px-4 py-2 hover:bg-gray-900 rounded">
              Home
            </Link>
            <Link to="/shop/nike" className="block px-4 py-2 hover:bg-gray-900 rounded">
              Nike
            </Link>
            <Link to="/shop/jordan" className="block px-4 py-2 hover:bg-gray-900 rounded">
              Jordan
            </Link>
            <Link to="/shop/yeezy" className="block px-4 py-2 hover:bg-gray-900 rounded">
              Yeezy
            </Link>
            <a href="#about" className="block px-4 py-2 hover:bg-gray-900 rounded">
              About
            </a>
            <a href="#testimonials" className="block px-4 py-2 hover:bg-gray-900 rounded">
              Testimonials
            </a>
            <a href="#contact" className="block px-4 py-2 hover:bg-gray-900 rounded">
              Contact
            </a>
          </div>
        )}
      </div>
    </nav>
  )
}
