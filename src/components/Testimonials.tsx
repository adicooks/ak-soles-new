export default function Testimonials() {
  const testimonials = [
    {
      text: 'Great selection of authentic sneakers. Shipping was fast and the shoes arrived in perfect condition. Highly recommend!',
      customer: 'Marcus T.',
      location: 'New York, USA',
    },
    {
      text: 'Best place to buy limited edition kicks. The prices are competitive and the customer service is excellent.',
      customer: 'Sarah J.',
      location: 'California, USA',
    },
    {
      text: 'Found the exact pair I was looking for. Verified authentic, great condition. Will definitely order again.',
      customer: 'James R.',
      location: 'Texas, USA',
    },
    {
      text: 'Amazing collection of rare sneakers. The whole process from browsing to checkout was smooth and secure.',
      customer: 'Alex M.',
      location: 'Florida, USA',
    },
  ]

  return (
    <section className="testimonial bg-gray-950 py-20 px-4 sm:px-6 lg:px-8" id="testimonials">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-16">
          What Our <span className="text-primary">Customers Say</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-900 rounded-lg p-6 space-y-4 hover:shadow-lg hover:shadow-primary/10 transition-all"
            >
              <div className="flex text-primary mb-2">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-lg">★</span>
                ))}
              </div>
              <p className="text-gray-300 italic text-sm leading-relaxed">"{testimonial.text}"</p>
              <div className="border-t border-gray-800 pt-4 mt-4">
                <p className="font-semibold text-white">{testimonial.customer}</p>
                <p className="text-gray-400 text-sm">Customer • {testimonial.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
