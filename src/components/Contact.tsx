import { Mail, Youtube, Twitter } from 'lucide-react'

export default function Contact() {
  return (
    <section className="contact bg-gray-950 py-20 px-4 sm:px-6 lg:px-8" id="contact">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-5xl font-bold">
            Contact Us <span className="text-primary">Via Email</span>
          </h2>
        </div>

        {/* Email Signup */}
        <div className="bg-gray-900 rounded-lg p-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary transition"
            />
            <button className="px-8 py-3 bg-primary text-black font-bold rounded-lg hover:opacity-90 transition-opacity whitespace-nowrap">
              Sign Up
            </button>
          </div>
        </div>

        {/* Social Links */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold">Connect with Us</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a
              href="https://discord.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-gray-900 rounded-lg p-6 hover:bg-gray-800 transition"
            >
              <Mail size={32} className="text-primary" />
              <div>
                <p className="font-semibold">Discord</p>
                <p className="text-gray-400">adicooks</p>
              </div>
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-gray-900 rounded-lg p-6 hover:bg-gray-800 transition"
            >
              <Youtube size={32} className="text-primary" />
              <div>
                <p className="font-semibold">YouTube</p>
                <p className="text-gray-400">Adi Cooks</p>
              </div>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-gray-900 rounded-lg p-6 hover:bg-gray-800 transition"
            >
              <Twitter size={32} className="text-primary" />
              <div>
                <p className="font-semibold">Twitter</p>
                <p className="text-gray-400">@adicooks</p>
              </div>
            </a>
            <a
              href="mailto:contact@adicooks.com"
              className="flex items-center gap-4 bg-gray-900 rounded-lg p-6 hover:bg-gray-800 transition"
            >
              <Mail size={32} className="text-primary" />
              <div>
                <p className="font-semibold">Email</p>
                <p className="text-gray-400">contact@adicooks.com</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
