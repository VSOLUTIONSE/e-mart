import type React from 'react'
import {Card, CardContent} from '@/components/ui/card'
import {Button} from '@/components/ui/button'
import {Badge} from '@/components/ui/badge'
import {Plus, Star, Eye, ShoppingCart, ChevronLeft, ChevronRight} from 'lucide-react'
import type {Product} from '@/types/product'
import {useCart} from '@/providers/cart-provider'
import {useStore} from '@/providers/store-provider'
import {useState} from 'react'

interface ProductCardProps {
 product: Product
 viewMode?: 'grid' | 'list'
 onClick: () => void
 highlightText?: (text: string) => React.ReactNode
}

export function ProductCard({product, viewMode = 'grid', onClick, highlightText}: ProductCardProps) {
 const {addItem} = useCart()
 const {settings} = useStore()
 const [currentImageIndex, setCurrentImageIndex] = useState(0)

 const handleAddToCart = (e: React.MouseEvent) => {
  e.stopPropagation()
  addItem(product)

  // Add a subtle shake animation to the button
  const button = e.currentTarget as HTMLButtonElement
  button.style.animation = 'none'
  setTimeout(() => {
   button.style.animation = 'shake 0.5s ease-in-out'
  }, 10)
 }

 const renderText = (text: string) => {
  return highlightText ? highlightText(text) : text
 }

 const nextImage = (e: React.MouseEvent) => {
  e.stopPropagation()
  setCurrentImageIndex(prev => (prev + 1) % product.images.length)
 }

 const prevImage = (e: React.MouseEvent) => {
  e.stopPropagation()
  setCurrentImageIndex(prev => (prev - 1 + product.images.length) % product.images.length)
 }

 const currentImage = product.images[currentImageIndex] || product.images[0]

 if (viewMode === 'list') {
  return (
   <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer group hover:scale-[1.02] animate-in slide-in-from-bottom-2" onClick={onClick}>
    <CardContent className="p-4">
     <div className="flex gap-4">
      <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden rounded-lg">
       <img src={currentImage} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
       
       {/* Image navigation for multiple images */}
       {product.images.length > 1 && (
        <div className="absolute inset-0 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
         <Button
          size="sm"
          variant="secondary"
          onClick={prevImage}
          className="h-6 w-6 p-0 ml-1 bg-white/80 hover:bg-white"
         >
          <ChevronLeft className="h-3 w-3" />
         </Button>
         <Button
          size="sm"
          variant="secondary"
          onClick={nextImage}
          className="h-6 w-6 p-0 mr-1 bg-white/80 hover:bg-white"
         >
          <ChevronRight className="h-3 w-3" />
         </Button>
        </div>
       )}

       {/* Image count indicator */}
       {product.images.length > 1 && (
        <div className="absolute bottom-1 right-1 bg-black/60 text-white text-xs px-1.5 py-0.5 rounded">
         {currentImageIndex + 1}/{product.images.length}
        </div>
       )}

       {product.featured && (
        <Badge className="absolute -top-2 -right-2 bg-yellow-500 text-white animate-pulse">
         <Star className="h-3 w-3" />
        </Badge>
       )}
      </div>

      <div className="flex-1 min-w-0">
       <div className="flex items-start justify-between">
        <div className="space-y-1">
         <h3 className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">{renderText(product.name)}</h3>
         <p className="text-sm text-muted-foreground line-clamp-2">{renderText(product.description)}</p>
         <p className="text-lg font-bold transition-all duration-300 group-hover:scale-110 inline-block" style={{color: settings.themeColor}}>
          {settings.currency}
          {product.price.toFixed(2)}
         </p>
        </div>

        <div className="flex gap-2 ml-4">
         <Button variant="outline" size="sm" onClick={onClick} className="transition-all duration-200 hover:scale-110">
          <Eye className="h-4 w-4" />
         </Button>
         <Button size="sm" onClick={handleAddToCart} style={{backgroundColor: settings.themeColor}} className="transition-all duration-200 hover:scale-110 hover:shadow-lg">
          <Plus className="h-4 w-4" />
         </Button>
        </div>
       </div>
      </div>
     </div>
    </CardContent>
   </Card>
  )
 }

 return (
  <Card className="hover:shadow-2xl transition-all duration-300 cursor-pointer group hover:scale-105 animate-in slide-in-from-bottom-2 border-0 shadow-md bg-card" onClick={onClick}>
   <CardContent className="p-0">
    <div className="relative overflow-hidden rounded-t-lg">
     <img src={currentImage} alt={product.name} className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110" />
     
     {product.featured && (
      <Badge className="absolute top-3 right-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white animate-bounce border-0 shadow-lg">
       <Star className="h-3 w-3 mr-1" />
       Featured
      </Badge>
     )}

     {/* Image navigation for multiple images */}
     {product.images.length > 1 && (
      <div className="absolute inset-0 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity px-2">
       <Button
        size="sm"
        variant="secondary"
        onClick={prevImage}
        className="h-8 w-8 p-0 rounded-full backdrop-blur-sm bg-white/90 hover:bg-white transition-all duration-200"
       >
        <ChevronLeft className="h-4 w-4" />
       </Button>
       <Button
        size="sm"
        variant="secondary"
        onClick={nextImage}
        className="h-8 w-8 p-0 rounded-full backdrop-blur-sm bg-white/90 hover:bg-white transition-all duration-200"
       >
        <ChevronRight className="h-4 w-4" />
       </Button>
      </div>
     )}

     {/* Image count indicator */}
     {product.images.length > 1 && (
      <div className="absolute bottom-3 left-3 bg-black/60 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
       {currentImageIndex + 1}/{product.images.length}
      </div>
     )}

     {/* Overlay */}
     <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

     {/* Quick Actions */}
     <div className="absolute top-3 left-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-y-2 group-hover:translate-y-0">
      <Button
       size="sm"
       variant="secondary"
       onClick={e => {
        e.stopPropagation()
        onClick()
       }}
       className="h-8 w-8 p-0 rounded-full backdrop-blur-sm bg-white/90 hover:bg-white transition-all duration-200"
      >
       <Eye className="h-4 w-4" />
      </Button>
     </div>
    </div>

    <div className="p-4 space-y-3">
     <div className="space-y-2">
      <h3 className="font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors duration-200">{renderText(product.name)}</h3>
      <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">{renderText(product.description)}</p>
     </div>

     <div className="flex items-center justify-between">
      <div className="space-y-1">
       <p className="text-2xl font-bold transition-all duration-300 group-hover:scale-110 inline-block" style={{color: settings.themeColor}}>
        {settings.currency}
        {product.price.toFixed(2)}
       </p>
       {product.variants && product.variants.length > 0 && (
        <p className="text-xs text-muted-foreground">
         {product.variants.length} variant{product.variants.length > 1 ? 's' : ''} available
        </p>
       )}
      </div>

      <Button size="sm" onClick={handleAddToCart} style={{backgroundColor: settings.themeColor}} className="transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-primary/25 group-hover:animate-pulse">
       <ShoppingCart className="h-4 w-4 mr-1" />
       Add
      </Button>
     </div>
    </div>
   </CardContent>
  </Card>
 )
}

<style jsx>{`
 @keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
 }
`}</style>