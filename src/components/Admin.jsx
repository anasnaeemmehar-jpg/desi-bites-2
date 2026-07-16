import { useState, useEffect } from 'react'
import { login, logout, isAuthenticated, getPassword, setPassword } from '../utils/auth'
import { categories, resetToDefaults } from '../data/menu'

const EMPTY_FORM = {
  id: null,
  name: '',
  category: 'biryani',
  price: '',
  description: '',
  image: '',
  images: [],
  badge: '',
  rating: 4.5,
  available: true,
}

export default function Admin({ items, setItems }) {
  const [authed, setAuthed] = useState(isAuthenticated())
  const [password, setPasswordInput] = useState('')

  if (!authed) {
    return <LoginScreen password={password} setPassword={setPasswordInput} onLogin={() => {
      if (login(password)) setAuthed(true)
      else alert('❌ Wrong password!')
    }} />
  }

  return <AdminDashboard items={items} setItems={setItems} onLogout={() => {
    logout()
    window.location.hash = ''
    setAuthed(false)
  }} />
}

function LoginScreen({ password, setPassword, onLogin }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-spice-600 to-spice-800 flex items-center justify-center p-4">
      <div className="bg-white p-8 md:p-10 rounded-3xl shadow-2xl w-full max-w-md animate-slide-up">
        <div className="text-center mb-6">
          <div className="text-6xl mb-3">🔐</div>
          <h1 className="font-display text-3xl font-bold text-spice-800">Admin Login</h1>
          <p className="text-gray-500 text-sm mt-1">DesiBites Management Panel</p>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); onLogin() }} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              required
              autoFocus
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-3 border-2 border-spice-200 rounded-lg focus:border-spice-500 focus:outline-none"
              placeholder="Enter admin password"
            />
            <p className="text-xs text-gray-500 mt-2">
              💡 Default password: <code className="bg-spice-100 px-2 py-0.5 rounded text-spice-700 font-mono">desibites123</code>
            </p>
          </div>
          <button type="submit" className="w-full btn-primary py-3 text-lg">
            Login →
          </button>
          <a href="#home" className="block text-center text-sm text-gray-500 hover:text-spice-600">
            ← Back to website
          </a>
        </form>
      </div>
    </div>
  )
}

function AdminDashboard({ items, setItems, onLogout }) {
  const [showForm, setShowForm] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [search, setSearch] = useState('')
  const [filterCat, setFilterCat] = useState('all')
  const [showSettings, setShowSettings] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(null)

  const filtered = items.filter(item => {
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase())
    const matchCat = filterCat === 'all' || item.category === filterCat
    return matchSearch && matchCat
  })

  const handleSave = (itemData) => {
    if (itemData.id) {
      // Edit
      setItems(prev => prev.map(i => i.id === itemData.id ? itemData : i))
    } else {
      // Add new - generate new ID
      const newId = Math.max(0, ...items.map(i => i.id)) + 1
      setItems(prev => [...prev, { ...itemData, id: newId }])
    }
    setShowForm(false)
    setEditingItem(null)
  }

  const handleDelete = (id) => {
    setItems(prev => prev.filter(i => i.id !== id))
    setConfirmDelete(null)
  }

  const toggleAvailable = (id) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, available: !i.available } : i))
  }

  const handleReset = () => {
    if (confirm('Are you sure? This will reset all items to defaults and lose your custom items.')) {
      setItems(resetToDefaults())
    }
  }

  const exportJSON = () => {
    const json = JSON.stringify(items, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'desibites-menu.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  const stats = {
    total: items.length,
    available: items.filter(i => i.available !== false).length,
    unavailable: items.filter(i => i.available === false).length,
    avgPrice: items.length ? Math.round(items.reduce((s, i) => s + i.price, 0) / items.length) : 0,
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🍛</span>
            <div>
              <h1 className="font-display text-xl font-bold text-spice-800">DesiBites Admin</h1>
              <p className="text-xs text-gray-500">Manage your menu items</p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <button onClick={() => setShowSettings(true)} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium">
              ⚙️ Settings
            </button>
            <a href="#home" target="_blank" rel="noreferrer" className="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg text-sm font-medium">
              👁️ View Site
            </a>
            <button onClick={onLogout} className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg text-sm font-medium">
              🚪 Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard label="Total Items" value={stats.total} icon="📦" color="bg-spice-100 text-spice-700" />
          <StatCard label="Available" value={stats.available} icon="✅" color="bg-green-100 text-green-700" />
          <StatCard label="Unavailable" value={stats.unavailable} icon="❌" color="bg-red-100 text-red-700" />
          <StatCard label="Avg Price" value={`Rs. ${stats.avgPrice}`} icon="💰" color="bg-turmeric/20 text-yellow-700" />
        </div>

        {/* Toolbar */}
        <div className="bg-white p-4 rounded-2xl shadow-sm mb-6">
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => { setEditingItem(EMPTY_FORM); setShowForm(true) }}
              className="btn-primary flex items-center gap-2"
            >
              <span>➕</span> Add New Item
            </button>
            <button onClick={exportJSON} className="px-4 py-2.5 bg-blue-100 hover:bg-blue-200 text-blue-700 font-medium rounded-full text-sm">
              📤 Export JSON
            </button>
            <button onClick={handleReset} className="px-4 py-2.5 bg-orange-100 hover:bg-orange-200 text-orange-700 font-medium rounded-full text-sm">
              🔄 Reset Defaults
            </button>
            <div className="flex-1 min-w-[200px]">
              <input
                type="text"
                placeholder="🔍 Search items..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-full focus:border-spice-500 focus:outline-none"
              />
            </div>
            <select
              value={filterCat}
              onChange={e => setFilterCat(e.target.value)}
              className="px-4 py-2.5 border-2 border-gray-200 rounded-full focus:border-spice-500 focus:outline-none font-medium"
            >
              {categories.map(c => <option key={c.id} value={c.id}>{c.icon} {c.name}</option>)}
            </select>
          </div>
        </div>

        {/* Items table */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-spice-50 border-b border-spice-100">
                <tr className="text-left text-xs font-semibold text-spice-800 uppercase">
                  <th className="px-4 py-3">Image</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Rating</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan="7" className="text-center py-12 text-gray-500">
                    <div className="text-5xl mb-2">🍽️</div>
                    No items found. Click "Add New Item" to create one.
                  </td></tr>
                ) : filtered.map(item => (
                  <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <img src={item.image} alt={item.name} className="w-14 h-14 rounded-lg object-cover bg-gray-100"
                        onError={e => { e.target.src = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23fed7aa"/><text x="50" y="60" font-size="50" text-anchor="middle">🍽️</text></svg>` }} />
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-semibold text-gray-900">{item.name}</div>
                      {item.badge && <span className="inline-block mt-1 text-xs bg-spice-100 text-spice-700 px-2 py-0.5 rounded-full">{item.badge}</span>}
                      <div className="text-xs text-gray-500 mt-1 line-clamp-1">{item.description}</div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 bg-gray-100 rounded-full text-xs font-medium capitalize">{item.category}</span>
                    </td>
                    <td className="px-4 py-3 font-bold text-spice-700">Rs. {item.price}</td>
                    <td className="px-4 py-3 text-sm">⭐ {item.rating || 4.5}</td>
                    <td className="px-4 py-3">
                      <button onClick={() => toggleAvailable(item.id)}
                        className={`px-2 py-1 rounded-full text-xs font-bold ${item.available !== false ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {item.available !== false ? '✅ In Stock' : '❌ Out'}
                      </button>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button onClick={() => { setEditingItem(item); setShowForm(true) }}
                        className="px-3 py-1.5 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg text-sm font-medium mr-1">
                        ✏️ Edit
                      </button>
                      <button onClick={() => setConfirmDelete(item)}
                        className="px-3 py-1.5 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg text-sm font-medium">
                        🗑️ Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showForm && (
        <ItemForm
          item={editingItem}
          onSave={handleSave}
          onCancel={() => { setShowForm(false); setEditingItem(null) }}
        />
      )}

      {/* Delete Confirm */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full animate-slide-up">
            <div className="text-5xl mb-3 text-center">⚠️</div>
            <h3 className="text-xl font-bold text-center mb-2">Delete Item?</h3>
            <p className="text-gray-600 text-center mb-6">
              Are you sure you want to delete <strong>{confirmDelete.name}</strong>? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setConfirmDelete(null)} className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-lg font-semibold">
                Cancel
              </button>
              <button onClick={() => handleDelete(confirmDelete.id)} className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold">
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
    </div>
  )
}

function StatCard({ label, value, icon, color }) {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm flex items-center gap-3">
      <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center text-2xl`}>
        {icon}
      </div>
      <div>
        <div className="text-2xl font-bold text-gray-900">{value}</div>
        <div className="text-xs text-gray-500">{label}</div>
      </div>
    </div>
  )
}

function ItemForm({ item, onSave, onCancel }) {
  const [form, setForm] = useState({
    ...item,
    images: item.images || (item.image ? [item.image] : []),
  })
  const [newImageUrl, setNewImageUrl] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.price || !form.description) {
      alert('Please fill in name, price and description!')
      return
    }
    // First image is the main image
    const images = form.images && form.images.length > 0 ? form.images : (form.image ? [form.image] : [])
    onSave({
      ...form,
      price: Number(form.price),
      rating: Number(form.rating) || 4.5,
      images,
      image: images[0] || form.image,
    })
  }

  const addImage = () => {
    if (!newImageUrl.trim()) return
    setForm({ ...form, images: [...(form.images || []), newImageUrl.trim()] })
    setNewImageUrl('')
  }

  const removeImage = (index) => {
    setForm({ ...form, images: form.images.filter((_, i) => i !== index) })
  }

  const moveImage = (index, direction) => {
    const newImages = [...form.images]
    const newIndex = index + direction
    if (newIndex < 0 || newIndex >= newImages.length) return
    ;[newImages[index], newImages[newIndex]] = [newImages[newIndex], newImages[index]]
    setForm({ ...form, images: newImages })
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
      <div className="bg-white rounded-2xl p-6 md:p-8 max-w-2xl w-full my-8 animate-slide-up">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-2xl font-bold text-spice-800">
            {item.id ? '✏️ Edit Item' : '➕ Add New Item'}
          </h2>
          <button onClick={onCancel} className="text-2xl text-gray-400 hover:text-gray-600">✕</button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold mb-1">Item Name *</label>
              <input
                type="text" required
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-spice-500 focus:outline-none"
                placeholder="e.g. Chicken Biryani"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Category *</label>
              <select
                value={form.category}
                onChange={e => setForm({ ...form, category: e.target.value })}
                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-spice-500 focus:outline-none"
              >
                {categories.filter(c => c.id !== 'all').map(c => (
                  <option key={c.id} value={c.id}>{c.icon} {c.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Price (Rs.) *</label>
              <input
                type="number" required min="0"
                value={form.price}
                onChange={e => setForm({ ...form, price: e.target.value })}
                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-spice-500 focus:outline-none"
                placeholder="350"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold mb-1">Description *</label>
              <textarea
                required rows={2}
                value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-spice-500 focus:outline-none"
                placeholder="A short, tasty description"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold mb-1">Images</label>
              <p className="text-xs text-gray-500 mb-2">First image is the main image. Add multiple to show in gallery.</p>

              {/* Image previews */}
              {form.images && form.images.length > 0 && (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mb-3">
                  {form.images.map((img, i) => (
                    <div key={i} className="relative group">
                      <img src={img} alt={`Image ${i + 1}`} className="w-full h-20 object-cover rounded-lg"
                        onError={e => e.target.style.opacity = '0.3'} />
                      {i === 0 && (
                        <span className="absolute top-1 left-1 bg-spice-600 text-white text-[10px] px-1.5 py-0.5 rounded font-bold">
                          MAIN
                        </span>
                      )}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors rounded-lg flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100">
                        {i > 0 && (
                          <button type="button" onClick={() => moveImage(i, -1)} className="w-6 h-6 bg-white/90 text-gray-800 rounded-full text-xs font-bold">←</button>
                        )}
                        {i < form.images.length - 1 && (
                          <button type="button" onClick={() => moveImage(i, 1)} className="w-6 h-6 bg-white/90 text-gray-800 rounded-full text-xs font-bold">→</button>
                        )}
                        <button type="button" onClick={() => removeImage(i)} className="w-6 h-6 bg-red-500 text-white rounded-full text-xs font-bold">✕</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Add new image */}
              <div className="flex gap-2">
                <input
                  type="url"
                  value={newImageUrl}
                  onChange={e => setNewImageUrl(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addImage() } }}
                  className="flex-1 px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-spice-500 focus:outline-none text-sm"
                  placeholder="https://images.unsplash.com/..."
                />
                <button type="button" onClick={addImage}
                  className="px-4 py-2.5 bg-spice-100 hover:bg-spice-200 text-spice-700 rounded-lg font-semibold text-sm">
                  ➕ Add
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                💡 Tip: Get free images from <a href="https://unsplash.com/s/photos/biryani" target="_blank" rel="noreferrer" className="text-spice-600 underline">unsplash.com</a> and paste URL
              </p>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Badge (optional)</label>
              <input
                type="text"
                value={form.badge}
                onChange={e => setForm({ ...form, badge: e.target.value })}
                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-spice-500 focus:outline-none"
                placeholder="Bestseller, Chef Special..."
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Rating (1-5)</label>
              <input
                type="number" min="1" max="5" step="0.1"
                value={form.rating}
                onChange={e => setForm({ ...form, rating: e.target.value })}
                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-spice-500 focus:outline-none"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.available}
                  onChange={e => setForm({ ...form, available: e.target.checked })}
                  className="w-5 h-5 accent-spice-600"
                />
                <span className="font-semibold">Available for ordering</span>
              </label>
            </div>
          </div>
          <div className="flex gap-3 pt-4">
            <button type="button" onClick={onCancel} className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-lg font-semibold">
              Cancel
            </button>
            <button type="submit" className="flex-1 btn-primary">
              {item.id ? '💾 Save Changes' : '➕ Add Item'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function SettingsModal({ onClose }) {
  const [current, setCurrent] = useState(getPassword())
  const [newPwd, setNewPwd] = useState('')
  const [confirm, setConfirm] = useState('')

  const handleChange = () => {
    if (newPwd.length < 6) {
      alert('Password must be at least 6 characters!')
      return
    }
    if (newPwd !== confirm) {
      alert('Passwords do not match!')
      return
    }
    setPassword(newPwd)
    alert('✅ Password changed successfully!')
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-2xl p-6 md:p-8 max-w-md w-full animate-slide-up">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-2xl font-bold text-spice-800">⚙️ Settings</h2>
          <button onClick={onClose} className="text-2xl text-gray-400 hover:text-gray-600">✕</button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-1">Current Password</label>
            <input type="text" value={current} disabled
              className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg bg-gray-50" />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">New Password</label>
            <input type="password" value={newPwd} onChange={e => setNewPwd(e.target.value)}
              className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-spice-500 focus:outline-none" />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Confirm New Password</label>
            <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)}
              className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-spice-500 focus:outline-none" />
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={onClose} className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-lg font-semibold">
              Cancel
            </button>
            <button onClick={handleChange} className="flex-1 btn-primary">Change Password</button>
          </div>
          <p className="text-xs text-gray-500 text-center pt-2">
            🔒 Password is stored locally in your browser
          </p>
        </div>
      </div>
    </div>
  )
}
