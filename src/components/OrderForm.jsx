import { useState } from 'react'
import { WHATSAPP_NUMBER } from '../data/menu'

export default function OrderForm({ cart, updateQty, clearCart }) {
  const [form, setForm] = useState({ name: '', phone: '', address: '', notes: '' })
  const [success, setSuccess] = useState(false)

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (cart.length === 0) {
      alert('Please add items to your cart first!')
      return
    }
    if (!form.name || !form.phone || !form.address) {
      alert('Please fill in all required fields!')
      return
    }

    // Build WhatsApp message
    let msg = `🍛 *New Order from DesiBites*\n\n`
    msg += `👤 *Name:* ${form.name}\n`
    msg += `📞 *Phone:* ${form.phone}\n`
    msg += `📍 *Address:* ${form.address}\n`
    if (form.notes) msg += `📝 *Notes:* ${form.notes}\n\n`
    msg += `🛒 *Order Items:*\n`
    cart.forEach(item => {
      msg += `• ${item.name} x${item.qty} — Rs. ${item.price * item.qty}\n`
    })
    msg += `\n💰 *Total: Rs. ${total}*`
    msg += `\n\nPlease confirm my order. Thank you!`

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`
    window.open(url, '_blank')

    setSuccess(true)
    setTimeout(() => {
      setSuccess(false)
      clearCart()
      setForm({ name: '', phone: '', address: '', notes: '' })
    }, 3000)
  }

  return (
    <section id="order" className="py-20 bg-gradient-to-br from-spice-600 to-spice-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-3">Place Your Order</h2>
          <p className="text-spice-100 text-lg max-w-2xl mx-auto">
            Add items to cart, fill in your details, and we'll send your order directly to WhatsApp
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Cart */}
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
            <h3 className="font-display text-2xl font-bold mb-4 flex items-center gap-2">
              🛒 Your Cart <span className="text-spice-200 text-sm font-normal">({cart.length} items)</span>
            </h3>

            {cart.length === 0 ? (
              <div className="text-center py-12 text-spice-200">
                <div className="text-6xl mb-3">🍽️</div>
                <p>Your cart is empty. Add some delicious items from the menu!</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                {cart.map(item => (
                  <div key={item.id} className="bg-white/10 p-4 rounded-xl flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-lg object-cover bg-white/20"
                      onError={e => {
                        e.target.style.display = 'none'
                        e.target.parentElement.innerHTML = `<div class="w-16 h-16 rounded-lg bg-white/20 flex items-center justify-center text-3xl">🍽️</div>`
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold truncate">{item.name}</div>
                      <div className="text-spice-200 text-sm">Rs. {item.price}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => updateQty(item.id, -1)}
                        className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full font-bold">-</button>
                      <span className="w-8 text-center font-bold">{item.qty}</span>
                      <button onClick={() => updateQty(item.id, 1)}
                        className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full font-bold">+</button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {cart.length > 0 && (
              <div className="mt-6 pt-4 border-t border-white/20">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg">Total:</span>
                  <span className="text-2xl font-bold text-turmeric">Rs. {total}</span>
                </div>
                <button onClick={clearCart}
                  className="text-sm text-spice-200 hover:text-white underline">
                  Clear cart
                </button>
              </div>
            )}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
            <h3 className="font-display text-2xl font-bold mb-4">📋 Delivery Details</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name *</label>
                <input
                  type="text" required
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 placeholder-spice-200 text-white focus:outline-none focus:border-turmeric"
                  placeholder="e.g. Ahmed Khan"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone Number *</label>
                <input
                  type="tel" required
                  value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 placeholder-spice-200 text-white focus:outline-none focus:border-turmeric"
                  placeholder="0300-1234567"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Delivery Address *</label>
                <textarea
                  required rows={3}
                  value={form.address}
                  onChange={e => setForm({ ...form, address: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 placeholder-spice-200 text-white focus:outline-none focus:border-turmeric"
                  placeholder="House #, Street, Area, City"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Special Instructions (Optional)</label>
                <textarea
                  rows={2}
                  value={form.notes}
                  onChange={e => setForm({ ...form, notes: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 placeholder-spice-200 text-white focus:outline-none focus:border-turmeric"
                  placeholder="Extra spicy, no onions, etc."
                />
              </div>

              {success && (
                <div className="bg-green-500 text-white p-3 rounded-lg text-center font-semibold animate-fade-in">
                  ✅ Order sent to WhatsApp! We'll confirm shortly.
                </div>
              )}

              <button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-lg shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] flex items-center justify-center gap-2 text-lg">
                <span className="text-2xl">💬</span> Send Order via WhatsApp
              </button>
              <p className="text-xs text-center text-spice-200">
                By placing an order you agree to be contacted on WhatsApp
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
