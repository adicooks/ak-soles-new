export default function Hero() {
  return (
    <div className="relative min-h-screen flex items-center justify-between px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background image effect */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage: 'url(https://backiee.com/static/wallpapers/560x315/363510.jpg)',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 gap-8 items-center">
        {/* Left side - Text */}
        <div className="animate-slideInLeft space-y-6">
          <div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold leading-tight">
              Premium Sneakers
              <br />
              Without the <span className="text-primary">Premium Price</span>
            </h1>
          </div>

          <p className="text-xl sm:text-2xl text-gray-300">
            Find your kicks
          </p>

          <a
            href="#products"
            className="inline-block px-8 py-3 bg-primary text-black font-bold rounded-lg hover:opacity-90 transition-opacity"
          >
            Shop Now
          </a>
        </div>

        
      </div>
    </div>
  )
}
