import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Menu from './components/Menu'
import About from './components/About'
import Testimonials from './components/Testimonials'
import OrderForm from './components/OrderForm'
import Footer from './components/Footer'
import Admin from './components/Admin'
import { getAllItems, saveItems, getAllCategories, saveCategories } from './data/menu'

export default function App() {
  // Menu items - shared state between Menu and Admin
  const [items, setItems] = useState(() => getAllItems())

  // Categories - shared state
  const [categories, setCategories] = useState(() => getAllCategories())

  useEffect(() => { saveItems(items) }, [items])
  useEffect(() => { saveCategories(categories) }, [categories])

  const [isAdminRoute, setIsAdminRoute] = useState(window.location.hash === '#admin')

  useEffect(() => {
    const onHashChange = () => setIsAdminRoute(window.location.hash === '#admin')
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('desibites-cart')
      return saved ? JSON.parse(saved) : []
    } catch { return [] }
  })

  useEffect(() => {
    localStorage.setItem('desibites-cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (item) => {
    if (item.available === false) {
      alert('Sorry, this item is currently unavailable.')
      return
    }
    setCart(prev => {
      const existing = prev.find(c => c.id === item.id)
      if (existing) {
        return prev.map(c => c.id === item.id ? { ...c, qty: c.qty + 1 } : c)
      }
      return [...prev, { ...item, qty: 1 }]
    })
  }

  const updateQty = (id, delta) => {
    setCart(prev => prev
      .map(c => c.id === id ? { ...c, qty: c.qty + delta } : c)
      .filter(c => c.qty > 0)
    )
  }

  const clearCart = () => setCart([])

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0)

  if (isAdminRoute) {
    return <Admin items={items} setItems={setItems} categories={categories} setCategories={setCategories} />
  }

  return (
    <div className="min-h-screen">
      <Navbar cartCount={cartCount} />
      <main>
        <Hero />
        <Menu items={items} categories={categories} addToCart={addToCart} />
        <About />
        <Testimonials />
        <OrderForm cart={cart} updateQty={updateQty} clearCart={clearCart} />
      </main>
      <Footer />
    </div>
  )
}
