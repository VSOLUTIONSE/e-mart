import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {ShoppingCart, Search, Store, X} from 'lucide-react'
import {useStore} from '@/providers/store-provider'

interface HeaderProps {
 cartItemCount: number
 onCartClick: () => void
 searchQuery: string
 onSearchChange: (query: string) => void
}

export function Header({cartItemCount, onCartClick, searchQuery, onSearchChange}: HeaderProps) {
 const {settings} = useStore()

 const clearSearch = () => {
  onSearchChange('')
 }

 return (
  <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
   <div className="container mx-auto px-4 py-4">
    <div className="flex items-center justify-between mb-4">
     <div className="flex items-center gap-3">
      {settings.logo ? <img src={settings.logo} alt={settings.storeName} className="h-8 w-8 rounded object-cover" /> : <Store className="h-8 w-8" style={{color: settings.themeColor}} />}
      <div>
       <h1 className="text-xl font-bold text-foreground">{settings.storeName}</h1>
       {settings.storeDescription && <p className="text-sm text-muted-foreground">{settings.storeDescription}</p>}
      </div>
     </div>

     {/* <Button variant="outline" size="sm" onClick={onCartClick} className="relative">
      <ShoppingCart className="h-4 w-4" />
      {cartItemCount > 0 && (
       <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full text-xs font-medium text-white flex items-center justify-center" style={{backgroundColor: settings.themeColor}}>
        {cartItemCount}
       </span>
      )}
     </Button> */}
    </div>

    <div className="relative">
     <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
     <Input 
      placeholder="Search products..." 
      value={searchQuery} 
      onChange={e => onSearchChange(e.target.value)} 
      className="pl-10 pr-10" 
     />
     {searchQuery && (
      <Button
       variant="ghost"
       size="sm"
       onClick={clearSearch}
       className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-muted"
      >
       <X className="h-3 w-3" />
      </Button>
     )}
    </div>
   </div>
  </header>
 )
}