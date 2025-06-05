import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import { Search, Store, X} from 'lucide-react'
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
   <div className="container px-4 py-4 mx-auto">
    <div className="flex items-center justify-between mb-4">
     <div className="flex items-center gap-3">
      {settings.logo ? <img src={settings.logo} alt={settings.storeName} className="object-cover w-8 h-8 rounded" /> : <Store className="w-8 h-8" style={{color: settings.themeColor}} />}
      <div>
       <h1 className="text-xl font-bold text-foreground">{settings.storeName}</h1>
       {settings.storeDescription && <p className="text-sm text-muted-foreground">{settings.storeDescription}</p>}
      </div>
     </div>

     {/* <Button variant="outline" size="sm" onClick={onCartClick} className="relative">
      <ShoppingCart className="w-4 h-4" />
      {cartItemCount > 0 && (
       <span className="absolute flex items-center justify-center w-5 h-5 text-xs font-medium text-white rounded-full -top-2 -right-2" style={{backgroundColor: settings.themeColor}}>
        {cartItemCount}
       </span>
      )}
     </Button> */}
    </div>

    <div className="relative">
     <Search className="absolute w-4 h-4 transform -translate-y-1/2 left-3 top-1/2 text-muted-foreground" />
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
       className="absolute w-6 h-6 p-0 transform -translate-y-1/2 right-1 top-1/2 hover:bg-muted"
      >
       <X className="w-3 h-3" />
      </Button>
     )}
    </div>
   </div>
  </header>
 )
}