import { Trash2, Plus, Minus } from 'lucide-react'
import { Link } from 'react-router-dom'

interface CartItem {
  name: string
  price: number
  size: number
  quantity: number
}

interface CartPageProps {
  cartItems: Record<string, CartItem>
  onUpdateCart: (items: Record<string, CartItem>) => void
}

export default function CartPage({ cartItems, onUpdateCart }: CartPageProps) {
  const total = Object.values(cartItems).reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  const handleIncrement = (tag: string) => {
    const item = cartItems[tag]
    if (item) {
      onUpdateCart({
        ...cartItems,
        [tag]: { ...item, quantity: item.quantity + 1 },
      })
    }
  }

  const handleDecrement = (tag: string) => {
    const item = cartItems[tag]
    if (item && item.quantity > 1) {
      onUpdateCart({
        ...cartItems,
        [tag]: { ...item, quantity: item.quantity - 1 },
      })
    }
  }

  const handleRemove = (tag: string) => {
    const newCart = { ...cartItems }
    delete newCart[tag]
    onUpdateCart(newCart)
  }

  const isEmpty = Object.keys(cartItems).length === 0

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-950 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold mb-12">
          Shopping <span className="text-primary">Cart</span>
        </h1>

        {isEmpty ? (
          <div className="bg-gray-900 rounded-lg p-12 text-center">
            <p className="text-2xl text-gray-400 mb-6">
              Your cart is empty. Go and buy something!
            </p>
            <Link
              to="/"
              className="inline-block px-8 py-3 bg-primary text-black font-bold rounded-lg hover:opacity-90 transition-opacity"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Cart Items */}
            <div className="space-y-4">
              {Object.entries(cartItems).map(([tag, item]) => (
                <div
                  key={tag}
                  className="bg-gray-900 rounded-lg p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                >
                  <div className="flex-grow">
                    <h3 className="font-bold text-lg">{item.name}</h3>
                    <p className="text-gray-400">Size: {item.size}</p>
                    <p className="text-primary font-bold mt-2">${item.price}</p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3 bg-gray-800 rounded-lg p-2">
                    <button
                      onClick={() => handleDecrement(tag)}
                      className="p-1 hover:bg-gray-700 rounded transition"
                      disabled={item.quantity === 1}
                    >
                      <Minus size={20} />
                    </button>
                    <span className="px-4 font-bold">{item.quantity}</span>
                    <button
                      onClick={() => handleIncrement(tag)}
                      className="p-1 hover:bg-gray-700 rounded transition"
                    >
                      <Plus size={20} />
                    </button>
                  </div>

                  {/* Item Total */}
                  <div className="text-right">
                    <p className="text-gray-400 text-sm">Subtotal</p>
                    <p className="text-2xl font-bold text-primary">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => handleRemove(tag)}
                    className="p-2 text-red-500 hover:bg-red-500 hover:text-white rounded transition"
                  >
                    <Trash2 size={24} />
                  </button>
                </div>
              ))}
            </div>

            {/* Cart Summary */}
            <div className="bg-gray-900 rounded-lg p-8 space-y-4 border-t border-gray-800">
              <div className="flex justify-between text-lg">
                <span>Subtotal:</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <div className="border-t border-gray-800 pt-4 flex justify-between text-2xl font-bold">
                <span>Total:</span>
                <span className="text-primary">${total.toFixed(2)}</span>
              </div>

              <a
                href="/checkout.html"
                className="block text-center w-full mt-6 bg-primary text-black font-bold py-3 rounded-lg hover:opacity-90 transition-opacity text-lg"
              >
                Proceed to Checkout
              </a>
            </div>

            {/* Continue Shopping */}
            <Link
              to="/"
              className="inline-block px-8 py-3 bg-gray-800 text-white font-bold rounded-lg hover:bg-gray-700 transition"
            >
              Continue Shopping
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
