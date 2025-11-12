import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Products from './components/Products'
import About from './components/About'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CategoryPage from './pages/CategoryPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import SearchPage from './pages/SearchPage'
import ProductPage from './pages/ProductPage'
import { Analytics } from '@vercel/analytics/react';

interface CartItem {
  name: string
  price: number
  size: number
  quantity: number
}

interface Product {
  name: string
  tag: string
  price: number
  size: number
  image: string
}

export default function App() {
  const [cartItems, setCartItems] = useState<Record<string, CartItem>>({})
  const [cartCount, setCartCount] = useState(0)

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('productsInCart')
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart)
      setCartItems(parsedCart)

      let count = 0
      Object.entries(parsedCart).forEach(([, item]: [string, unknown]) => {
        const cartItem = item as CartItem
        count += cartItem.quantity
      })
      setCartCount(count)
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('productsInCart', JSON.stringify(cartItems))
  }, [cartItems])

  // Update count whenever cart changes
  useEffect(() => {
    let count = 0
    Object.entries(cartItems).forEach(([, item]) => {
      count += item.quantity
    })
    setCartCount(count)
  }, [cartItems])

  const addToCart = (product: Product) => {
    setCartItems((prev: Record<string, CartItem>) => {
      const existing = prev[product.tag]
      if (existing) {
        return {
          ...prev,
          [product.tag]: {
            ...existing,
            quantity: existing.quantity + 1,
          },
        }
      } else {
        return {
          ...prev,
          [product.tag]: {
            name: product.name,
            price: product.price,
            size: product.size,
            quantity: 1,
          },
        }
      }
    })
  }

  const clearCart = () => {
    setCartItems({})
    localStorage.removeItem('productsInCart')
    localStorage.removeItem('cartNumbers')
    localStorage.removeItem('totalCost')
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-black text-white">
        <Analytics />
        <Navbar cartCount={cartCount} />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <Products onAddToCart={addToCart} />
                <About />
                <Testimonials />
                <Contact />
              </>
            }
          />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/product/:tag" element={<ProductPage onAddToCart={addToCart} />} />
          <Route
            path="/shop/nike"
            element={<CategoryPage category="nike" onAddToCart={addToCart} />}
          />
          <Route
            path="/shop/jordan"
            element={<CategoryPage category="jordan" onAddToCart={addToCart} />}
          />
          <Route
            path="/shop/yeezy"
            element={<CategoryPage category="yeezy" onAddToCart={addToCart} />}
          />
          <Route
            path="/cart"
            element={<CartPage cartItems={cartItems} onUpdateCart={setCartItems} />}
          />
          <Route
            path="/checkout"
            element={<CheckoutPage cartItems={cartItems} onClearCart={clearCart} />}
          />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
