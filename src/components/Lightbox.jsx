import { useState, useEffect } from 'react'

export default function Lightbox({ images, name, description, price, badge, isOpen, onClose }) {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (isOpen) {
      setActiveIndex(0)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  useEffect(() => {
    const onKey = (e) => {
      if (!isOpen) return
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') setActiveIndex(i => (i + 1) % images.length)
      if (e.key === 'ArrowLeft') setActiveIndex(i => (i - 1 + images.length) % images.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, images.length, onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white text-3xl w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10"
        aria-label="Close"
      >
        ✕
      </button>

      {/* Image counter */}
      {images.length > 1 && (
        <div className="absolute top-4 left-4 text-white bg-black/50 px-4 py-2 rounded-full text-sm font-semibold z-10">
          {activeIndex + 1} / {images.length}
        </div>
      )}

      {/* Previous button */}
      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); setActiveIndex(i => (i - 1 + images.length) % images.length) }}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-2xl w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10"
        >
          ‹
        </button>
      )}

      {/* Next button */}
      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); setActiveIndex(i => (i + 1) % images.length) }}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-2xl w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10"
        >
          ›
        </button>
      )}

      {/* Main content */}
      <div
        className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Main image */}
        <div className="relative w-full flex-1 min-h-0 flex items-center justify-center">
          <img
            src={images[activeIndex]}
            alt={name}
            className="max-w-full max-h-[70vh] object-contain rounded-2xl shadow-2xl"
            onError={(e) => {
              e.target.src = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><rect width="800" height="600" fill="%23fed7aa"/><text x="400" y="320" font-size="200" text-anchor="middle">🍽️</text></svg>`
            }}
          />
        </div>

        {/* Info bar */}
        <div className="w-full bg-white/10 backdrop-blur-md rounded-2xl p-5 mt-4 text-white">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex-1 min-w-[200px]">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <h3 className="font-display text-2xl font-bold">{name}</h3>
                {badge && <span className="bg-chili text-white text-xs font-bold px-2 py-0.5 rounded-full">{badge}</span>}
              </div>
              <p className="text-gray-300 text-sm">{description}</p>
            </div>
            <div className="text-3xl font-bold text-turmeric whitespace-nowrap">Rs. {price}</div>
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                    i === activeIndex ? 'border-spice-500 scale-105' : 'border-white/20 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`${name} ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
