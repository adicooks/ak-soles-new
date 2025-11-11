export default function About() {
  return (
    <section className="about bg-gray-950 py-20 px-4 sm:px-6 lg:px-8" id="about">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Image */}
        <div className="flex justify-center">
          <img
            src="/img/adi_pic.jpeg"
            alt="Adi Khurana"
            className="rounded-lg w-full max-w-md object-cover"
          />
        </div>

        {/* Content */}
        <div className="space-y-6">
          <p className="text-lg font-semibold">AK Soles Owner </p>
          <h2 className="text-5xl font-bold">
            <span className="text-primary">Adi Khurana</span>
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            My name is Adi Khurana, a high school senior and the founder of AK Soles LLC. I have been running AK Soles since early 2020. I leverage technology as an enabler to grow
            my business, help my customers find limited edition shoes, and assist other business
            owners to scale their business. I am passionate to provide exceptional customer service,
            competitive pricing, and engage in convenient, trustworthy, and transparent transactions.
          </p>
          <p className="text-gray-300 text-lg leading-relaxed">
            In my 5 years running this business, I have supplied thousands of sneakers to thousands of different customers. Every pair is 100% authentic and verified, and I buy, sell, and trade to keep the rotation fresh. Whether you’re hunting for your next grail or cashing out heat from your own collection, I make sure every customer leaves satisfied and confident in what they’re getting.
          </p>
          <a
            href="#contact"
            className="inline-block px-8 py-3 bg-primary text-black font-bold rounded-lg hover:opacity-90 transition-opacity"
          >
            Contact Me
          </a>
        </div>
      </div>
    </section>
  )
}
