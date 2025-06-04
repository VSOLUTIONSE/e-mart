import { mockProducts, mockCategories, mockStoreSettings } from './mock-data'

export function resetToMockData() {
  localStorage.setItem('emart-products', JSON.stringify(mockProducts))
  localStorage.setItem('emart-categories', JSON.stringify(mockCategories))
  localStorage.setItem('emart-settings', JSON.stringify(mockStoreSettings))
  
  // Force a page reload to reflect changes
  window.location.reload()
}

export function clearStoreData() {
  localStorage.removeItem('emart-products')
  localStorage.removeItem('emart-categories')
  localStorage.removeItem('emart-settings')
  
  // Force a page reload to reflect changes
  window.location.reload()
}
