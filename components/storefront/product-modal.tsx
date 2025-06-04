import {useState} from 'react'
import {Dialog, DialogContent, DialogHeader, DialogTitle} from '@/components/ui/dialog'
import {Button} from '@/components/ui/button'
import {Badge} from '@/components/ui/badge'
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select'
import {Plus, Minus, Star, ShoppingCart, ChevronLeft, ChevronRight} from 'lucide-react'
import type {Product} from '@/types/product'
import {useCart} from '@/providers/cart-provider'
import {useStore} from '@/providers/store-provider'

interface ProductModalProps {
 product: Product
 isOpen: boolean
 onClose: () => void
}

export function ProductModal({product, isOpen, onClose}: ProductModalProps) {
 const {addItem} = useCart()
 const {settings} = useStore()
 const [quantity, setQuantity] = useState(1)
 const [selectedVariant, setSelectedVariant] = useState<string>('')
 const [currentImageIndex, setCurrentImageIndex] = useState(0)

 const handleAddToCart = () => {
  addItem(product, quantity, selectedVariant || undefined)
  onClose()
 }

 const adjustQuantity = (delta: number) => {
  setQuantity(prev => Math.max(1, prev + delta))
 }

 const nextImage = () => {
  setCurrentImageIndex(prev => (prev + 1) % product.images.length)
 }

 const prevImage = () => {
  setCurrentImageIndex(prev => (prev - 1 + product.images.length) % product.images.length)
 }

 return (
  <Dialog open={isOpen} onOpenChange={onClose}>
   <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto" aria-describedby="product-description">
    <DialogHeader>
     <DialogTitle className="flex items-center gap-2">
      {product.name}
      {product.featured && (
       <Badge className="bg-yellow-500 text-white">
        <Star className="h-3 w-3 mr-1" />
        Featured
       </Badge>
      )}
     </DialogTitle>
    </DialogHeader>

    <div id="product-description" className="grid grid-cols-1 md:grid-cols-2 gap-6">
     {/* Image Gallery */}
     <div className="space-y-4">
      {/* Main Image */}
      <div className="relative overflow-hidden rounded-lg bg-muted">
       <img 
        src={product.images[currentImageIndex]} 
        alt={`${product.name} - Image ${currentImageIndex + 1}`} 
        className="w-full h-80 object-cover" 
       />
       
       {/* Navigation arrows for multiple images */}
       {product.images.length > 1 && (
        <>
         <Button
          variant="secondary"
          size="sm"
          onClick={prevImage}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 rounded-full bg-white/80 hover:bg-white"
         >
          <ChevronLeft className="h-4 w-4" />
         </Button>
         <Button
          variant="secondary"
          size="sm"
          onClick={nextImage}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 rounded-full bg-white/80 hover:bg-white"
         >
          <ChevronRight className="h-4 w-4" />
         </Button>
         
         {/* Image counter */}
         <div className="absolute bottom-2 right-2 bg-black/60 text-white text-sm px-2 py-1 rounded">
          {currentImageIndex + 1} / {product.images.length}
         </div>
        </>
       )}
      </div>

      {/* Thumbnail Gallery */}
      {product.images.length > 1 && (
       <div className="grid grid-cols-4 gap-2">
        {product.images.map((image, index) => (
         <button
          key={index}
          onClick={() => setCurrentImageIndex(index)}
          className={`relative overflow-hidden rounded border-2 transition-all duration-200 hover:scale-105 ${
           index === currentImageIndex 
            ? 'border-primary shadow-md' 
            : 'border-muted hover:border-muted-foreground'
          }`}
         >
          <img 
           src={image} 
           alt={`${product.name} thumbnail ${index + 1}`} 
           className="w-full h-16 object-cover" 
          />
          {index === currentImageIndex && (
           <div className="absolute inset-0 bg-primary/10" />
          )}
         </button>
        ))}
       </div>
      )}
     </div>

     {/* Product Details */}
     <div className="space-y-4">
      <div>
       <p className="text-muted-foreground mb-4 leading-relaxed">{product.description}</p>
       <p className="text-3xl font-bold" style={{color: settings.themeColor}}>
        {settings.currency}
        {product.price.toFixed(2)}
       </p>
      </div>

      {product.variants && product.variants.length > 0 && (
       <div>
        <label className="text-sm font-medium mb-2 block">Variant</label>
        <Select value={selectedVariant} onValueChange={setSelectedVariant}>
         <SelectTrigger>
          <SelectValue placeholder="Select variant" />
         </SelectTrigger>
         <SelectContent>
          {product.variants.map(variant => (
           <SelectItem key={variant} value={variant}>
            {variant}
           </SelectItem>
          ))}
         </SelectContent>
        </Select>
       </div>
      )}

      <div>
       <label className="text-sm font-medium mb-2 block">Quantity</label>
       <div className="flex items-center gap-3">
        <Button variant="outline" size="sm" onClick={() => adjustQuantity(-1)} disabled={quantity <= 1} aria-label="Decrease quantity">
         <Minus className="h-4 w-4" />
        </Button>
        <span className="font-medium min-w-[2rem] text-center" aria-label={`Quantity: ${quantity}`}>
         {quantity}
        </span>
        <Button variant="outline" size="sm" onClick={() => adjustQuantity(1)} aria-label="Increase quantity">
         <Plus className="h-4 w-4" />
        </Button>
       </div>
      </div>

      <div className="pt-4 border-t">
       <div className="flex items-center justify-between mb-4">
        <span className="text-lg font-medium">Total:</span>
        <span className="text-2xl font-bold" style={{color: settings.themeColor}}>
         {settings.currency}
         {(product.price * quantity).toFixed(2)}
        </span>
       </div>

       <Button onClick={handleAddToCart} className="w-full h-12 text-base font-medium" style={{backgroundColor: settings.themeColor}}>
        <ShoppingCart className="h-5 w-5 mr-2" />
        Add to Cart
       </Button>
      </div>
     </div>
    </div>
   </DialogContent>
  </Dialog>
 )
}