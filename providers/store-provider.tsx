'use client'
import type React from 'react'
import {createContext, useContext, useState, useEffect} from 'react'
import { StoreSettings } from '../types/store-settings'
import { Product } from '../types/product'
import { Category } from '../types/category'
import { mockProducts, mockCategories, mockStoreSettings } from '@/lib/mock-data'


interface StoreContextType {
 products: Product[]
 categories: Category[]
 settings: StoreSettings
 addProduct: (product: Product) => void
 updateProduct: (id: string, product: Partial<Product>) => void
 deleteProduct: (id: string) => void
 addCategory: (category: Category) => void
 updateCategory: (id: string, category: Partial<Category>) => void
 deleteCategory: (id: string) => void
 updateSettings: (settings: Partial<StoreSettings>) => void
}

const StoreContext = createContext<StoreContextType | undefined>(undefined)

export function StoreProvider({children}: {children: React.ReactNode}) {
 // Initialize with mock data
 const [products, setProducts] = useState<Product[]>(mockProducts)
 const [categories, setCategories] = useState<Category[]>(mockCategories)
 const [settings, setSettings] = useState<StoreSettings>(mockStoreSettings)

 // Load persisted data if available
 useEffect(() => {
  const loadPersistedData = () => {
   try {
    const persistedProducts = localStorage.getItem('emart-products')
    const persistedCategories = localStorage.getItem('emart-categories')
    const persistedSettings = localStorage.getItem('emart-settings')

    if (persistedProducts) setProducts(JSON.parse(persistedProducts))
    if (persistedCategories) setCategories(JSON.parse(persistedCategories))
    if (persistedSettings) setSettings(JSON.parse(persistedSettings))
   } catch (error) {
    console.warn('Failed to load persisted data:', error)
   }
  }

  loadPersistedData()
 }, [])

 // Persist data changes
 useEffect(() => {
  const persistData = () => {
   try {
    localStorage.setItem('emart-products', JSON.stringify(products))
    localStorage.setItem('emart-categories', JSON.stringify(categories))
    localStorage.setItem('emart-settings', JSON.stringify(settings))
   } catch (error) {
    console.warn('Failed to persist data:', error)
   }
  }

  persistData()
 }, [products, categories, settings])

 const addProduct = (product: Product) => {
  setProducts(prev => [...prev, {...product, id: crypto.randomUUID()}])
 }

 const updateProduct = (id: string, productUpdate: Partial<Product>) => {
  setProducts(prev => prev.map(p => p.id === id ? {...p, ...productUpdate} : p))
 }

 const deleteProduct = (id: string) => {
  setProducts(prev => prev.filter(p => p.id !== id))
 }

 const addCategory = (category: Category) => {
  setCategories(prev => [...prev, {...category, id: crypto.randomUUID()}])
 }

 const updateCategory = (id: string, categoryUpdate: Partial<Category>) => {
  setCategories(prev => prev.map(c => c.id === id ? {...c, ...categoryUpdate} : c))
 }

 const deleteCategory = (id: string) => {
  setCategories(prev => prev.filter(c => c.id !== id))
 }

 const updateSettings = (settingsUpdate: Partial<StoreSettings>) => {
  setSettings(prev => ({...prev, ...settingsUpdate}))
 }

 return (
  <StoreContext.Provider
   value={{
    products,
    categories,
    settings,
    addProduct,
    updateProduct,
    deleteProduct,
    addCategory,
    updateCategory,
    deleteCategory,
    updateSettings
   }}
  >
   {children}
  </StoreContext.Provider>
 )
}

export function useStore() {
 const context = useContext(StoreContext)
 if (context === undefined) {
  throw new Error('useStore must be used within a StoreProvider')
 }
 return context
}