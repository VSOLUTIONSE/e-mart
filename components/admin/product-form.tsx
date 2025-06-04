import type React from 'react'
import {useState, useEffect} from 'react'
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {Label} from '@/components/ui/label'
import {Textarea} from '@/components/ui/textarea'
import {Switch} from '@/components/ui/switch'
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select'
import {Badge} from '@/components/ui/badge'
import {X, Plus, Image, Trash2} from 'lucide-react'
import {useStore} from '@/providers/store-provider'
import {useToast} from '@/hooks/use-toast'
import type {Product} from '@/types/product'

interface ProductFormProps {
 productId?: string | null
 onClose: () => void
}

export function ProductForm({productId, onClose}: ProductFormProps) {
 const {products, categories, addProduct, updateProduct} = useStore()
 const {toast} = useToast()

 const isEditing = !!productId
 const existingProduct = products.find(p => p.id === productId)

 const [formData, setFormData] = useState({
  name: '',
  description: '',
  price: '',
  images: [] as string[],
  category: '',
  inStock: true,
  featured: false,
  variants: [] as string[]
 })

 const [newVariant, setNewVariant] = useState('')
 const [newImageUrl, setNewImageUrl] = useState('')

 useEffect(() => {
  if (isEditing && existingProduct) {
   setFormData({
    name: existingProduct.name,
    description: existingProduct.description,
    price: existingProduct.price.toString(),
    images: existingProduct.images || [],
    category: existingProduct.category,
    inStock: existingProduct.inStock,
    featured: existingProduct.featured || false,
    variants: existingProduct.variants || []
   })
  }
 }, [isEditing, existingProduct])

 const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault()

  if (!formData.name || !formData.description || !formData.price || !formData.category) {
   toast({
    title: 'Missing Fields',
    description: 'Please fill in all required fields.',
    variant: 'destructive'
   })
   return
  }

  if (formData.images.length === 0) {
   toast({
    title: 'Missing Images',
    description: 'Please add at least one product image.',
    variant: 'destructive'
   })
   return
  }

  const productData: Omit<Product, 'id'> = {
   name: formData.name,
   description: formData.description,
   price: Number.parseFloat(formData.price),
   images: formData.images,
   category: formData.category,
   inStock: formData.inStock,
   featured: formData.featured,
   variants: formData.variants.length > 0 ? formData.variants : undefined
  }

  if (isEditing && productId) {
   updateProduct(productId, productData)
   toast({
    title: 'Product Updated',
    description: `${formData.name} has been updated successfully.`
   })
  } else {
   addProduct(productData as Product)
   toast({
    title: 'Product Added',
    description: `${formData.name} has been added to your catalog.`
   })
  }

  onClose()
 }

 const addVariant = () => {
  if (newVariant.trim() && !formData.variants.includes(newVariant.trim())) {
   setFormData(prev => ({
    ...prev,
    variants: [...prev.variants, newVariant.trim()]
   }))
   setNewVariant('')
  }
 }

 const removeVariant = (variant: string) => {
  setFormData(prev => ({
   ...prev,
   variants: prev.variants.filter(v => v !== variant)
  }))
 }

 const addImage = () => {
  if (newImageUrl.trim() && !formData.images.includes(newImageUrl.trim())) {
   setFormData(prev => ({
    ...prev,
    images: [...prev.images, newImageUrl.trim()]
   }))
   setNewImageUrl('')
   toast({
    title: 'Image Added',
    description: 'Product image has been added successfully.'
   })
  }
 }

 const removeImage = (imageUrl: string) => {
  setFormData(prev => ({
   ...prev,
   images: prev.images.filter(img => img !== imageUrl)
  }))
 }

 const moveImage = (fromIndex: number, toIndex: number) => {
  if (toIndex < 0 || toIndex >= formData.images.length) return
  
  setFormData(prev => {
   const newImages = [...prev.images]
   const [movedImage] = newImages.splice(fromIndex, 1)
   newImages.splice(toIndex, 0, movedImage)
   return {...prev, images: newImages}
  })
 }

 return (
  <Card>
   <CardHeader>
    <CardTitle>{isEditing ? 'Edit Product' : 'Add New Product'}</CardTitle>
   </CardHeader>
   <CardContent>
    <form onSubmit={handleSubmit} className="space-y-6">
     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
       <div>
        <Label htmlFor="name">Product Name *</Label>
        <Input id="name" value={formData.name} onChange={e => setFormData(prev => ({...prev, name: e.target.value}))} placeholder="Enter product name" required />
       </div>

       <div>
        <Label htmlFor="price">Price *</Label>
        <Input id="price" type="number" step="0.01" min="0" value={formData.price} onChange={e => setFormData(prev => ({...prev, price: e.target.value}))} placeholder="0.00" required />
       </div>

       <div>
        <Label htmlFor="category">Category *</Label>
        <Select value={formData.category} onValueChange={value => setFormData(prev => ({...prev, category: value}))}>
         <SelectTrigger>
          <SelectValue placeholder="Select category" />
         </SelectTrigger>
         <SelectContent>
          {categories.map(category => (
           <SelectItem key={category.id} value={category.id}>
            {category.name}
           </SelectItem>
          ))}
         </SelectContent>
        </Select>
       </div>

       <div>
        <Label htmlFor="description">Description *</Label>
        <Textarea id="description" value={formData.description} onChange={e => setFormData(prev => ({...prev, description: e.target.value}))} placeholder="Enter product description" rows={4} required />
       </div>
      </div>

      <div className="space-y-4">
       {/* Product Images */}
       <div>
        <Label>Product Images * ({formData.images.length}/10)</Label>
        <div className="space-y-3">
         <div className="flex gap-2">
          <Input
           value={newImageUrl}
           onChange={e => setNewImageUrl(e.target.value)}
           placeholder="https://example.com/image.jpg"
           onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), addImage())}
          />
          <Button type="button" onClick={addImage} size="sm" disabled={formData.images.length >= 10}>
           <Plus className="h-4 w-4" />
          </Button>
         </div>

         {formData.images.length > 0 && (
          <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
           {formData.images.map((imageUrl, index) => (
            <div key={index} className="relative group border rounded-lg overflow-hidden">
             <img src={imageUrl} alt={`Product ${index + 1}`} className="w-full h-20 object-cover" />
             
             {/* Image controls overlay */}
             <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
              <Button
               type="button"
               size="sm"
               variant="secondary"
               onClick={() => moveImage(index, index - 1)}
               disabled={index === 0}
               className="h-6 w-6 p-0"
              >
               ←
              </Button>
              <Button
               type="button"
               size="sm"
               variant="destructive"
               onClick={() => removeImage(imageUrl)}
               className="h-6 w-6 p-0"
              >
               <Trash2 className="h-3 w-3" />
              </Button>
              <Button
               type="button"
               size="sm"
               variant="secondary"
               onClick={() => moveImage(index, index + 1)}
               disabled={index === formData.images.length - 1}
               className="h-6 w-6 p-0"
              >
               →
              </Button>
             </div>

             {/* Primary image indicator */}
             {index === 0 && (
              <Badge className="absolute top-1 left-1 text-xs bg-green-500">
               Primary
              </Badge>
             )}
            </div>
           ))}
          </div>
         )}

         {formData.images.length === 0 && (
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
           <Image className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
           <p className="text-sm text-muted-foreground">No images added yet</p>
           <p className="text-xs text-muted-foreground mt-1">Add image URLs above</p>
          </div>
         )}
        </div>
       </div>

       {/* Product Variants */}
       <div>
        <Label>Product Variants</Label>
        <div className="flex gap-2 mb-2">
         <Input value={newVariant} onChange={e => setNewVariant(e.target.value)} placeholder="e.g., Small, Medium, Large" onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), addVariant())} />
         <Button type="button" onClick={addVariant} size="sm">
          <Plus className="h-4 w-4" />
         </Button>
        </div>
        <div className="flex flex-wrap gap-2">
         {formData.variants.map(variant => (
          <Badge key={variant} variant="secondary" className="flex items-center gap-1">
           {variant}
           <X className="h-3 w-3 cursor-pointer hover:text-destructive" onClick={() => removeVariant(variant)} />
          </Badge>
         ))}
        </div>
       </div>

       <div className="space-y-4">
        <div className="flex items-center justify-between">
         <Label htmlFor="inStock">In Stock</Label>
         <Switch id="inStock" checked={formData.inStock} onCheckedChange={checked => setFormData(prev => ({...prev, inStock: checked}))} />
        </div>

        <div className="flex items-center justify-between">
         <Label htmlFor="featured">Featured Product</Label>
         <Switch id="featured" checked={formData.featured} onCheckedChange={checked => setFormData(prev => ({...prev, featured: checked}))} />
        </div>
       </div>
      </div>
     </div>

     <div className="flex gap-4 pt-6 border-t">
      <Button type="submit" className="flex-1">
       {isEditing ? 'Update Product' : 'Add Product'}
      </Button>
      <Button type="button" variant="outline" onClick={onClose}>
       Cancel
      </Button>
     </div>
    </form>
   </CardContent>
  </Card>
 )
}