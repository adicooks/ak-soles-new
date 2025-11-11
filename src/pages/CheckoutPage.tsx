import { useNavigate } from 'react-router-dom'

interface CartItem {
  name: string
  price: number
  size: number
  quantity: number
}

interface CheckoutPageProps {
  cartItems: Record<string, CartItem>
  onClearCart: () => void
}

export default function CheckoutPage({ cartItems, onClearCart }: CheckoutPageProps) {
  const navigate = useNavigate()

  const subtotal = Object.values(cartItems).reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )
  const tax = subtotal * 0.065
  const total = subtotal + tax

  const handlePurchase = () => {
    alert('Thank you for your purchase!')
    onClearCart()
    navigate('/')
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-950 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Order Summary */}
          <div className="bg-gray-900 rounded-lg p-8">
            <h2 className="text-3xl font-bold mb-6 text-primary">Order Summary</h2>
            
            <div className="space-y-4 mb-8">
              {Object.entries(cartItems).map(([tag, item]) => (
                <div key={tag} className="flex justify-between items-center border-b border-gray-800 pb-3">
                  <div>
                    <p className="font-bold">{item.name}</p>
                    <p className="text-sm text-gray-400">Size: {item.size} | Qty: {item.quantity}</p>
                  </div>
                  <p className="font-bold text-primary">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="space-y-3 border-t border-gray-800 pt-4">
              <div className="flex justify-between text-lg">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg">
                <span>Tax (6.5%):</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-2xl font-bold border-t border-gray-800 pt-3">
                <span>Total:</span>
                <span className="text-primary">${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/cart')}
              className="w-full mt-6 bg-gray-700 text-white py-3 rounded-lg hover:bg-gray-600 transition"
            >
              ← Back to Cart
            </button>
          </div>

          {/* Right Side - Payment Form */}
          <div className="bg-gray-900 rounded-lg p-8">
            <h2 className="text-3xl font-bold mb-6">Payment Details</h2>

            {/* Apple Pay Button */}
            <button className="w-full bg-black text-white font-bold py-3 rounded-lg mb-4 flex items-center justify-center gap-2 hover:opacity-90 transition">
              <span className="text-2xl">🍎</span>
              Pay
            </button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-gray-900 text-gray-400">Or pay with card</span>
              </div>
            </div>

            {/* Card Details */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold mb-2">Card Number</label>
                <input
                  type="text"
                  placeholder="4242 4242 4242 4242"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:border-primary focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold mb-2">Expiry Date</label>
                  <input
                    type="text"
                    placeholder="MM / YY"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">CVC</label>
                  <input
                    type="text"
                    placeholder="123"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Cardholder Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Billing Address</label>
                <input
                  type="text"
                  placeholder="Street Address"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 mb-3 focus:border-primary focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="City, State, Zipcode"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:border-primary focus:outline-none"
                />
              </div>

              <button
                onClick={handlePurchase}
                className="w-full bg-primary text-black font-bold py-4 rounded-lg hover:opacity-90 transition text-lg mt-6"
              >
                Complete Purchase - ${total.toFixed(2)}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
