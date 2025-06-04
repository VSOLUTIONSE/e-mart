import React from 'react'
import {Sheet, SheetContent, SheetHeader, SheetTitle} from '@/components/ui/sheet'
import {Button} from '@/components/ui/button'
import {Plus, Minus, Trash, ShoppingCart, Sparkles} from 'lucide-react'
import {useCart} from '@/providers/cart-provider'
import {useStore} from '@/providers/store-provider'

interface CartProps {
 isOpen: boolean
 onClose: () => void
 onCheckout: () => void
}

export function Cart({isOpen, onClose, onCheckout}: CartProps) {
 const {items, updateQuantity, removeItem, totalPrice, clearCart} = useCart()
 const {settings} = useStore()

 if (items.length === 0) {
  return (
   <Sheet open={isOpen} onOpenChange={onClose}>
    <SheetContent className="w-full sm:max-w-lg">
     <SheetHeader>
      <SheetTitle className="flex items-center gap-2">
       <ShoppingCart className="h-5 w-5" />
       Your Cart
      </SheetTitle>
     </SheetHeader>

     <div className="flex flex-col items-center justify-center h-64 animate-in fade-in duration-500">
      <div className="relative">
       <ShoppingCart className="h-16 w-16 text-muted-foreground" />
       <div className="absolute -top-2 -right-2 h-6 w-6 bg-muted rounded-full animate-pulse" />
      </div>
      <p className="text-muted-foreground text-center mt-4 animate-in slide-in-from-bottom-2 duration-700 delay-300">Your cart is empty</p>
      <p className="text-sm text-muted-foreground text-center mt-2 animate-in slide-in-from-bottom-2 duration-700 delay-500">Add some products to get started!</p>
     </div>
    </SheetContent>
   </Sheet>
  )
 }

 return (
  <Sheet open={isOpen} onOpenChange={onClose}>
   <SheetContent className="w-full sm:max-w-lg flex flex-col">
    <SheetHeader>
     <SheetTitle className="flex items-center justify-between">
      <span className="flex items-center gap-2">
       <div className="relative">
        <ShoppingCart className="h-5 w-5" />
        <div className="absolute -top-1 -right-1 h-3 w-3 bg-green-500 rounded-full animate-pulse" />
       </div>
       Your Cart ({items.length} items)
      </span>
      <Button variant="ghost" size="sm" onClick={clearCart} className="transition-all duration-200 hover:scale-105 hover:bg-destructive/10 hover:text-destructive">
       Clear All
      </Button>
     </SheetTitle>
    </SheetHeader>

    <div className="flex-1 overflow-y-auto py-4 space-y-4">
     {items.map((item, index) => (
      <div key={`${item.id}-${item.selectedVariant}`} className="flex gap-3 p-3 border rounded-lg transition-all duration-300 hover:shadow-md hover:scale-[1.02] animate-in slide-in-from-right-2" style={{animationDelay: `${index * 100}ms`}}>
       <div className="relative w-16 h-16 flex-shrink-0 overflow-hidden rounded-lg">
        <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover transition-transform duration-300 hover:scale-110" />
       </div>

       <div className="flex-1 min-w-0">
        <h4 className="font-medium text-sm truncate hover:text-primary transition-colors">{item.name}</h4>
        {item.selectedVariant && <p className="text-xs text-muted-foreground mt-1">{item.selectedVariant}</p>}
        <p className="text-sm font-semibold mt-1 transition-all duration-300 hover:scale-105 inline-block" style={{color: settings.themeColor}}>
         {settings.currency}
         {item.price.toFixed(2)}
        </p>

        <div className="flex items-center justify-between mt-2">
         <div className="flex items-center gap-1 bg-muted/50 rounded-full p-1">
          <Button variant="ghost" size="sm" onClick={() => updateQuantity(item.id, item.quantity - 1)} className="h-6 w-6 p-0 rounded-full transition-all duration-200 hover:scale-110 hover:bg-destructive/10" disabled={item.quantity <= 1}>
           <Minus className="h-3 w-3" />
          </Button>
          <span className="text-sm font-medium min-w-[2rem] text-center px-2">{item.quantity}</span>
          <Button variant="ghost" size="sm" onClick={() => updateQuantity(item.id, item.quantity + 1)} className="h-6 w-6 p-0 rounded-full transition-all duration-200 hover:scale-110 hover:bg-primary/10">
           <Plus className="h-3 w-3" />
          </Button>
         </div>

         <Button variant="ghost" size="sm" onClick={() => removeItem(item.id)} className="h-6 w-6 p-0 text-destructive hover:text-destructive hover:bg-destructive/10 transition-all duration-200 hover:scale-110">
          <Trash className="h-3 w-3" />
         </Button>
        </div>
       </div>
      </div>
     ))}
    </div>

    <div className="border-t pt-4 space-y-4 animate-in slide-in-from-bottom-2 duration-500">
     {/* Savings indicator */}
     <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
      <Sparkles className="h-4 w-4" style={{color: settings.themeColor}} />
      <span>Free delivery • No hidden charges</span>
     </div>

     <div className="flex items-center justify-between text-lg font-semibold p-3 bg-muted/30 rounded-lg">
      <span>Total:</span>
      <span className="text-2xl transition-all duration-300 hover:scale-110 animate-pulse" style={{color: settings.themeColor}}>
       {settings.currency}
       {totalPrice.toFixed(2)}
      </span>
     </div>

     <Button onClick={onCheckout} className="w-full h-12 text-base font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25" style={{backgroundColor: settings.themeColor}}>
      <ShoppingCart className="h-5 w-5 mr-2" />
      Proceed to Checkout
     </Button>
    </div>
   </SheetContent>
  </Sheet>
 )
}