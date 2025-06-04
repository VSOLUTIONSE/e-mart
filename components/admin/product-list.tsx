import {Card, CardContent} from '@/components/ui/card'
import {Button} from '@/components/ui/button'
import {Badge} from '@/components/ui/badge'
import {Edit, Trash, Star, Package, Image} from 'lucide-react'
import {useStore} from '@/providers/store-provider'
import {useToast} from '@/hooks/use-toast'

interface ProductListProps {
 onEditProduct: (productId: string) => void
}

export function ProductList({onEditProduct}: ProductListProps) {
 const {products, deleteProduct, categories} = useStore()
 const {toast} = useToast()

 const handleDelete = (productId: string, productName: string) => {
  if (confirm(`Are you sure you want to delete "${productName}"?`)) {
   deleteProduct(productId)
   toast({
    title: 'Product Deleted',
    description: `${productName} has been removed from your catalog.`
   })
  }
 }

 const getCategoryName = (categoryId: string) => {
  return categories.find(cat => cat.id === categoryId)?.name || 'Uncategorized'
 }

 if (products.length === 0) {
  return (
   <Card>
    <CardContent className="text-center py-12">
     <Package className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
     <h3 className="text-lg font-semibold mb-2">No Products Yet</h3>
     <p className="text-muted-foreground">Add your first product to get started with your store.</p>
    </CardContent>
   </Card>
  )
 }

 return (
  <div className="space-y-4">
   <div className="grid gap-4">
    {products.map(product => (
     <Card key={product.id}>
      <CardContent className="p-4">
       <div className="flex gap-4">
        <div className="relative">
         <img src={product.images[0]} alt={product.name} className="w-20 h-20 object-cover rounded" />
         {product.images.length > 1 && (
          <Badge className="absolute -top-2 -right-2 bg-primary text-white text-xs">
           <Image className="h-3 w-3 mr-1" />
           {product.images.length}
          </Badge>
         )}
        </div>

        <div className="flex-1 min-w-0">
         <div className="flex items-start justify-between">
          <div>
           <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-foreground">{product.name}</h3>
            {product.featured && (
             <Badge className="bg-yellow-500 text-white">
              <Star className="h-3 w-3 mr-1" />
              Featured
             </Badge>
            )}
            <Badge variant={product.inStock ? 'default' : 'destructive'}>{product.inStock ? 'In Stock' : 'Out of Stock'}</Badge>
           </div>
           <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{product.description}</p>
           <div className="flex items-center gap-4 text-sm">
            <span className="font-semibold">${product.price.toFixed(2)}</span>
            <span className="text-muted-foreground">Category: {getCategoryName(product.category)}</span>
            {product.variants && product.variants.length > 0 && <span className="text-muted-foreground">Variants: {product.variants.join(', ')}</span>}
            <span className="text-muted-foreground">{product.images.length} image{product.images.length !== 1 ? 's' : ''}</span>
           </div>
          </div>

          <div className="flex gap-2 ml-4">
           <Button variant="outline" size="sm" onClick={() => onEditProduct(product.id)}>
            <Edit className="h-4 w-4" />
           </Button>
           <Button variant="outline" size="sm" onClick={() => handleDelete(product.id, product.name)} className="text-destructive hover:text-destructive">
            <Trash className="h-4 w-4" />
           </Button>
          </div>
         </div>
        </div>
       </div>
      </CardContent>
     </Card>
    ))}
   </div>
  </div>
 )
}