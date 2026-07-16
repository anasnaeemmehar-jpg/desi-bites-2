export default function About() {
  const features = [
    { icon: '👨‍🍳', title: 'Expert Chefs', desc: '30+ years of combined experience in authentic Desi cooking', bg: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&h=300&fit=crop' },
    { icon: '🌿', title: 'Fresh Ingredients', desc: 'Locally sourced, organic ingredients delivered daily', bg: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop' },
    { icon: '🔥', title: 'Hot & Fresh', desc: 'Cooked fresh and delivered within 30 minutes', bg: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop' },
    { icon: '💯', title: 'Quality First', desc: 'No shortcuts, no preservatives — just pure authentic taste', bg: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop' },
  ]

  return (
    <section id="about" className="relative py-24 overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=80)' }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-spice-900/90 via-spice-800/85 to-black/90"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 text-white">
          <span className="inline-block bg-spice-600/80 backdrop-blur px-4 py-1.5 rounded-full text-sm font-semibold mb-3">
            ✨ Why Choose Us
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-3">Why DesiBites?</h2>
          <p className="text-spice-100 text-lg max-w-2xl mx-auto">
            We bring the authentic taste of home-cooked Desi food straight to your table
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="group relative bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:-translate-y-2 text-center overflow-hidden"
            >
              {/* Background image on hover */}
              <div
                className="absolute inset-0 bg-cover bg-center opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                style={{ backgroundImage: `url(${f.bg})` }}
              ></div>
              <div className="relative">
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform inline-block">
                  {f.icon}
                </div>
                <h3 className="font-display text-xl font-bold text-white mb-2">{f.title}</h3>
                <p className="text-spice-100 text-sm">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
