// Categories and items - all admin-managed
// Empty defaults so you can add your own from admin panel

const STORAGE_ITEMS = 'desibites-menu-items'
const STORAGE_CATEGORIES = 'desibites-menu-categories'

// Default categories - you can delete these from admin panel
const DEFAULT_CATEGORIES = [
  { id: 'all', name: 'All', icon: '🍽️', order: 0 },
]

// Empty by default - add your own items from admin
const DEFAULT_ITEMS = []

// ============= CATEGORIES =============
export function getAllCategories() {
  try {
    const stored = localStorage.getItem(STORAGE_CATEGORIES)
    if (stored) return JSON.parse(stored)
  } catch {}
  return DEFAULT_CATEGORIES
}

export function saveCategories(categories) {
  localStorage.setItem(STORAGE_CATEGORIES, JSON.stringify(categories))
}

export function resetCategories() {
  localStorage.removeItem(STORAGE_CATEGORIES)
  return DEFAULT_CATEGORIES
}

// ============= ITEMS =============
export function getAllItems() {
  try {
    const stored = localStorage.getItem(STORAGE_ITEMS)
    if (stored) return JSON.parse(stored)
  } catch {}
  return DEFAULT_ITEMS
}

export function saveItems(items) {
  localStorage.setItem(STORAGE_ITEMS, JSON.stringify(items))
}

export function resetToDefaults() {
  localStorage.removeItem(STORAGE_ITEMS)
  localStorage.removeItem(STORAGE_CATEGORIES)
  return DEFAULT_ITEMS
}

export const testimonials = [
  { id: 1, name: 'Ayesha Khan', location: 'Lahore', rating: 5, comment: 'Amazing food and super fast delivery! Will definitely order again.', avatar: '👩‍🦱' },
  { id: 2, name: 'Ahmed Raza', location: 'Karachi', rating: 5, comment: 'Best food in town! Fresh ingredients and authentic taste every time.', avatar: '👨' },
]

export const WHATSAPP_NUMBER = '923034941006'
