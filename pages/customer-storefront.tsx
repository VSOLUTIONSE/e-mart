import { useState } from 'react'


import { ModernNavbar } from '../components/storefront/modern-navbar'
import { Header } from '../components/storefront/header'
import { ProductCatalog } from '../components/storefront/product-catalog'
import { Cart } from '../components/storefront/cart'
import { CheckoutModal } from '../components/storefront/checkout-modal'
import { Footer } from '../components/storefront/footer'
import { useCart } from '../providers/cart-provider'


export default function CustomerStorefront() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const { totalItems } = useCart()

  const handleCheckout = () => {
    setIsCartOpen(false)
    setIsCheckoutOpen(true)
  }

  return (
    <div className="min-h-screen bg-background">
      <ModernNavbar />
      <Header 
        cartItemCount={totalItems} 
        onCartClick={() => setIsCartOpen(true)} 
        searchQuery={searchQuery} 
        onSearchChange={setSearchQuery} 
      />
      <ProductCatalog searchQuery={searchQuery} />

      {isCartOpen && (
        <Cart 
          isOpen={isCartOpen} 
          onClose={() => setIsCartOpen(false)} 
          onCheckout={handleCheckout} 
        />
      )}

      {isCheckoutOpen && (
        <CheckoutModal 
          isOpen={isCheckoutOpen} 
          onClose={() => setIsCheckoutOpen(false)} 
        />
      )}

      <Footer />
    </div>
  )
}