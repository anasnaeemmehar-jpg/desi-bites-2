import { useState, useEffect } from 'react'
import { testimonials } from '../data/menu'

export default function Testimonials() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setActive(a => (a + 1) % testimonials.length), 5000)
    return () => clearInterval(t)
  }, [])

  return (
    <section id="testimonials" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block bg-spice-100 text-spice-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-3">
            ⭐ Reviews
          </span>
          <h2 className="section-title">What Our Customers Say</h2>
          <p className="section-subtitle">Real reviews from real food lovers</p>
        </div>

        {/* Featured testimonial carousel */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="relative bg-gradient-to-br from-spice-100 to-cream p-8 md:p-12 rounded-3xl shadow-xl overflow-hidden">
            {/* Decorative background image */}
            <div
              className="absolute inset-0 bg-cover bg-center opacity-10"
              style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80)' }}
            ></div>
            <div className="relative text-center">
              <div className="absolute top-2 left-4 text-7xl text-spice-200 opacity-50 font-display">"</div>
              <div className="text-6xl mb-4">{testimonials[active].avatar}</div>
              <p className="text-lg md:text-xl text-gray-700 italic mb-6 leading-relaxed">
                "{testimonials[active].comment}"
              </p>
              <div>
                <div className="font-bold text-spice-800 text-lg">{testimonials[active].name}</div>
                <div className="text-gray-500 text-sm">📍 {testimonials[active].location}</div>
                <div className="text-turmeric mt-2 text-lg">{'⭐'.repeat(testimonials[active].rating)}</div>
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`h-2 rounded-full transition-all ${
                  i === active ? 'w-8 bg-spice-600' : 'w-2 bg-spice-200'
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* All testimonials grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map(t => (
            <div
              key={t.id}
              className="bg-spice-50 p-6 rounded-2xl hover:bg-spice-100 transition-all hover:-translate-y-1 hover:shadow-md"
            >
              <div className="text-4xl mb-3">{t.avatar}</div>
              <div className="text-turmeric text-sm mb-2">{'⭐'.repeat(t.rating)}</div>
              <p className="text-gray-700 text-sm mb-3 line-clamp-3">"{t.comment}"</p>
              <div>
                <div className="font-semibold text-spice-800">{t.name}</div>
                <div className="text-gray-500 text-xs">📍 {t.location}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
