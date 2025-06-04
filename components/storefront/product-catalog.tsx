import {useState, useMemo} from 'react'
import {Button} from '@/components/ui/button'
import {Grid3X3, List, Star, Search} from 'lucide-react'
import {ProductCard} from '@/components/storefront/product-card'
import {ProductModal} from '@/components/storefront/product-modal'
import {useStore} from '@/providers/store-provider'
import type {Product} from '@/types/product'

interface ProductCatalogProps {
 searchQuery: string
}

export function ProductCatalog({searchQuery}: ProductCatalogProps) {
 const {products, categories} = useStore()
 const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
 const [selectedCategory, setSelectedCategory] = useState<string>('all')
 const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
 const [showOnlyFeatured, setShowOnlyFeatured] = useState(false)

 const filteredProducts = useMemo(() => {
  return products.filter(product => {
   const categoryMatch = selectedCategory === 'all' || product.category === selectedCategory
   const featuredMatch = !showOnlyFeatured || product.featured
   const stockMatch = product.inStock
   
   // Search functionality - search in name, description, and category
   const searchMatch = !searchQuery || 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    categories.find(cat => cat.id === product.category)?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (product.variants && product.variants.some(variant => variant.toLowerCase().includes(searchQuery.toLowerCase())))

   return categoryMatch && featuredMatch && stockMatch && searchMatch
  })
 }, [products, selectedCategory, showOnlyFeatured, searchQuery, categories])

 const featuredProducts = useMemo(() => {
  const featured = products.filter(p => p.featured && p.inStock)
  
  if (searchQuery) {
   return featured.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    categories.find(cat => cat.id === product.category)?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (product.variants && product.variants.some(variant => variant.toLowerCase().includes(searchQuery.toLowerCase())))
   )
  }
  
  return featured
 }, [products, searchQuery, categories])

 const highlightText = (text: string, query: string) => {
  if (!query) return text
  
  const parts = text.split(new RegExp(`(${query})`, 'gi'))
  return parts.map((part, index) => 
   part.toLowerCase() === query.toLowerCase() ? 
    <mark key={index} className="bg-yellow-200 text-yellow-900 rounded px-1">{part}</mark> : part
  )
 }

 return (
  <main className="container mx-auto px-4 py-6">
   {/* Search Results Info */}
   {searchQuery && (
    <div className="mb-6 p-4 bg-muted/50 rounded-lg">
     <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <Search className="h-4 w-4" />
      <span>
       Found <strong>{filteredProducts.length}</strong> product{filteredProducts.length !== 1 ? 's' : ''} 
       {searchQuery && (
        <span> matching "<strong>{searchQuery}</strong>"</span>
       )}
      </span>
     </div>
    </div>
   )}

   {/* Featured Products Section */}
   {!searchQuery && featuredProducts.length > 0 && (
    <section className="mb-8">
     <div className="flex items-center gap-2 mb-4">
      <Star className="h-5 w-5 text-yellow-500" />
      <h2 className="text-2xl font-bold text-foreground">Featured Products</h2>
     </div>
     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {featuredProducts.slice(0, 3).map(product => (
       <ProductCard 
        key={product.id} 
        product={product} 
        onClick={() => setSelectedProduct(product)}
        highlightText={(text) => highlightText(text, searchQuery)}
       />
      ))}
     </div>
    </section>
   )}

   {/* Category Filters */}
   <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
    <div className="flex flex-wrap gap-2">
     <Button 
      variant={selectedCategory === 'all' ? 'default' : 'outline'} 
      size="sm" 
      onClick={() => setSelectedCategory('all')}
     >
      All Products
     </Button>
     {categories.map(category => (
      <Button 
       key={category.id} 
       variant={selectedCategory === category.id ? 'default' : 'outline'} 
       size="sm" 
       onClick={() => setSelectedCategory(category.id)}
      >
       {highlightText(category.name, searchQuery)}
      </Button>
     ))}
    </div>

    <div className="flex items-center gap-2">
     <Button 
      variant={showOnlyFeatured ? 'default' : 'outline'} 
      size="sm" 
      onClick={() => setShowOnlyFeatured(!showOnlyFeatured)}
     >
      <Star className="h-4 w-4 mr-1" />
      Featured
     </Button>

     <div className="border-l pl-2">
      <Button 
       variant={viewMode === 'grid' ? 'default' : 'outline'} 
       size="sm" 
       onClick={() => setViewMode('grid')}
      >
       <Grid3X3 className="h-4 w-4" />
      </Button>
      <Button 
       variant={viewMode === 'list' ? 'default' : 'outline'} 
       size="sm" 
       onClick={() => setViewMode('list')} 
       className="ml-1"
      >
       <List className="h-4 w-4" />
      </Button>
     </div>
    </div>
   </div>

   {/* Products Grid/List */}
   <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
    {filteredProducts.map(product => (
     <ProductCard 
      key={product.id} 
      product={product} 
      viewMode={viewMode} 
      onClick={() => setSelectedProduct(product)}
      highlightText={(text) => highlightText(text, searchQuery)}
     />
    ))}
   </div>

   {filteredProducts.length === 0 && (
    <div className="text-center py-12">
     {searchQuery ? (
      <div>
       <Search className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
       <p className="text-muted-foreground text-lg mb-2">
        No products found for "<strong>{searchQuery}</strong>"
       </p>
       <p className="text-sm text-muted-foreground">
        Try searching with different keywords or browse our categories above
       </p>
      </div>
     ) : (
      <p className="text-muted-foreground text-lg">No products found matching your criteria.</p>
     )}
    </div>
   )}

   {/* Product Modal */}
   {selectedProduct && (
    <ProductModal 
     product={selectedProduct} 
     isOpen={!!selectedProduct} 
     onClose={() => setSelectedProduct(null)} 
    />
   )}
  </main>
 )
}