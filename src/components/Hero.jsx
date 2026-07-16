import { WHATSAPP_NUMBER } from '../data/menu'

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden">
      {/* Dark moody background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=1920&q=80)',
        }}
      >
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/70 to-spice-900/80"></div>
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Floating food emojis (decorative) */}
      <div className="absolute top-20 left-10 text-4xl opacity-30 animate-float hidden md:block">🍚</div>
      <div className="absolute top-40 right-20 text-5xl opacity-30 animate-float hidden md:block" style={{ animationDelay: '1s' }}>🌶️</div>
      <div className="absolute bottom-32 left-20 text-4xl opacity-30 animate-float hidden md:block" style={{ animationDelay: '2s' }}>🫓</div>
      <div className="absolute bottom-20 right-32 text-5xl opacity-30 animate-float hidden md:block" style={{ animationDelay: '1.5s' }}>🍗</div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center w-full">
        {/* Left content */}
        <div className="animate-slide-up text-white">
          <span className="inline-block bg-spice-600/90 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-sm font-semibold mb-4 border border-spice-400/30">
            🔥 Now delivering in your area
          </span>
          <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight mb-6">
            Authentic <span className="text-spice-500">Desi</span> Food,
            <br />
            <span className="bg-gradient-to-r from-spice-500 via-turmeric to-spice-400 bg-clip-text text-transparent">
              Delivered Hot
            </span>
          </h1>
          <p className="text-lg text-gray-200 mb-8 max-w-lg">
            From our kitchen to your doorstep — sizzling karahis, fragrant biryanis, and
            traditional recipes cooked with love. Order now on WhatsApp and get it fresh in 30 minutes.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#menu" className="btn-primary text-lg shadow-2xl shadow-spice-600/50">
              Explore Menu 🍽️
            </a>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi!%20I%20want%20to%20place%20an%20order`}
              target="_blank"
              rel="noreferrer"
              className="btn-whatsapp text-lg shadow-2xl shadow-green-500/50"
            >
              <span className="text-xl">💬</span> Order on WhatsApp
            </a>
          </div>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-3 gap-4 max-w-md">
            <div>
              <div className="text-3xl font-bold text-spice-400">500+</div>
              <div className="text-sm text-gray-300">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-spice-400">30min</div>
              <div className="text-sm text-gray-300">Fast Delivery</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-spice-400">4.9⭐</div>
              <div className="text-sm text-gray-300">Customer Rating</div>
            </div>
          </div>
        </div>

        {/* Right visual - hero card */}
        <div className="relative animate-fade-in hidden md:block">
          <div className="relative">
            {/* Decorative circles */}
            <div className="absolute -top-8 -right-8 w-72 h-72 bg-spice-500 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-pulse"></div>
            <div className="absolute -bottom-8 -left-8 w-72 h-72 bg-turmeric rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>

            {/* Main food card */}
            <div className="relative aspect-square max-w-md mx-auto rounded-3xl overflow-hidden shadow-2xl border-4 border-spice-500/30 group">
              <img
                src="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&q=80"
                alt="Delicious Biryani"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              {/* Steam effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="text-sm text-spice-300 font-semibold mb-1">⭐ BESTSELLER</div>
                <div className="font-display text-3xl font-bold mb-1">Chicken Biryani</div>
                <div className="text-gray-200 text-sm">Aromatic basmati rice with tender chicken</div>
                <div className="mt-3 text-2xl font-bold text-turmeric">Rs. 350</div>
              </div>
            </div>

            {/* Floating badges */}
            <div className="absolute -top-4 -left-4 bg-white rounded-2xl shadow-2xl p-3 animate-float">
              <div className="flex items-center gap-2">
                <span className="text-2xl">⚡</span>
                <div>
                  <div className="text-xs text-gray-500">Delivery</div>
                  <div className="font-bold text-gray-900 text-sm">30 min</div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-2xl p-3 animate-float" style={{ animationDelay: '1s' }}>
              <div className="flex items-center gap-2">
                <span className="text-2xl">🔥</span>
                <div>
                  <div className="text-xs text-gray-500">Fresh & Hot</div>
                  <div className="font-bold text-gray-900 text-sm">100%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-spice-400 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-spice-400 rounded-full"></div>
        </div>
      </div>
    </section>
  )
}
