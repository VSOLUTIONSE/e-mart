'use client'
import {useState, useEffect} from 'react'
import {Button} from '@/components/ui/button'
import {MessageCircle, X, Headphones, Sparkles} from 'lucide-react'
import {useStore} from '@/providers/store-provider'
import {CustomerSupportModal} from '@/components/storefront/customer-support-modal'

export function FloatingChatWidget() {
 const {settings} = useStore()
 const [isVisible, setIsVisible] = useState(false)
 const [isSupportModalOpen, setIsSupportModalOpen] = useState(false)
 const [isExpanded, setIsExpanded] = useState(false)
 const [showTooltip, setShowTooltip] = useState(false)

 // Show widget after a short delay to avoid being intrusive
 useEffect(() => {
  const timer = setTimeout(() => setIsVisible(true), 2000)
  return () => clearTimeout(timer)
 }, [])

 // Show tooltip after widget appears
 useEffect(() => {
  if (isVisible && !isExpanded) {
   const tooltipTimer = setTimeout(() => setShowTooltip(true), 1000)
   const hideTooltipTimer = setTimeout(() => setShowTooltip(false), 5000)
   return () => {
    clearTimeout(tooltipTimer)
    clearTimeout(hideTooltipTimer)
   }
  }
 }, [isVisible, isExpanded])

 const handleQuickWhatsApp = () => {
  if (!settings.whatsappNumber) {
   setIsSupportModalOpen(true)
   return
  }

  const message = encodeURIComponent(`Hi ${settings.storeName}! I need assistance. Could you please help me?`)
  const whatsappUrl = `https://wa.me/${settings.whatsappNumber.replace(/\D/g, '')}?text=${message}`
  window.open(whatsappUrl, '_blank')
 }

 const toggleExpanded = () => {
  setIsExpanded(!isExpanded)
 }

 if (!isVisible) return null

 return (
  <>
   <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
    {/* Expanded Options */}
    {isExpanded && (
     <div className="bg-background/95 backdrop-blur-sm border rounded-xl shadow-2xl p-4 mb-2 animate-in slide-in-from-bottom-3 duration-300">
      <div className="flex flex-col gap-3 min-w-[220px]">
       <div className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
        <Sparkles className="h-4 w-4" style={{color: settings.themeColor}} />
        How can we help?
       </div>

       <Button 
        variant="ghost" 
        size="sm" 
        onClick={handleQuickWhatsApp} 
        className="justify-start gap-3 h-auto p-3 transition-all duration-200 hover:scale-105 hover:bg-primary/5"
       >
        <div 
         className="h-10 w-10 rounded-full flex items-center justify-center" 
         style={{backgroundColor: `${settings.themeColor}20`}}
        >
         <MessageCircle className="h-5 w-5" style={{color: settings.themeColor}} />
        </div>
        <div className="text-left">
         <div className="text-sm font-medium">Quick WhatsApp</div>
         <div className="text-xs text-muted-foreground">Instant support</div>
        </div>
       </Button>

       <Button
        variant="ghost"
        size="sm"
        onClick={() => {
         setIsSupportModalOpen(true)
         setIsExpanded(false)
        }}
        className="justify-start gap-3 h-auto p-3 transition-all duration-200 hover:scale-105 hover:bg-primary/5"
       >
        <div 
         className="h-10 w-10 rounded-full flex items-center justify-center" 
         style={{backgroundColor: `${settings.themeColor}20`}}
        >
         <Headphones className="h-5 w-5" style={{color: settings.themeColor}} />
        </div>
        <div className="text-left">
         <div className="text-sm font-medium">Support Center</div>
         <div className="text-xs text-muted-foreground">All options</div>
        </div>
       </Button>
      </div>
     </div>
    )}

    {/* Main Floating Button */}
    <div className="relative">
     <Button
      onClick={isExpanded ? toggleExpanded : handleQuickWhatsApp}
      onContextMenu={e => {
       e.preventDefault()
       toggleExpanded()
      }}
      className={`h-14 w-14 rounded-full shadow-2xl transition-all duration-300 hover:shadow-3xl hover:scale-110 ${
       isExpanded ? 'rotate-45' : ''
      }`}
      style={{backgroundColor: settings.themeColor}}
     >
      {isExpanded ? (
       <X className="h-6 w-6 text-white" />
      ) : (
       <MessageCircle className="h-6 w-6 text-white" />
      )}
     </Button>

     {/* Ripple Effect */}
     {!isExpanded && (
      <>
       <div 
        className="absolute inset-0 rounded-full animate-ping opacity-20" 
        style={{backgroundColor: settings.themeColor}} 
       />
       <div 
        className="absolute inset-0 rounded-full animate-pulse opacity-30" 
        style={{backgroundColor: settings.themeColor}} 
       />
      </>
     )}

     {/* Options Button */}
     <Button 
      onClick={toggleExpanded} 
      variant="ghost" 
      size="sm" 
      className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-background border shadow-md hover:shadow-lg p-0 transition-all duration-200 hover:scale-110"
     >
      <div className={`flex gap-0.5 transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`}>
       <div className="w-1 h-1 bg-muted-foreground rounded-full" />
       <div className="w-1 h-1 bg-muted-foreground rounded-full" />
       <div className="w-1 h-1 bg-muted-foreground rounded-full" />
      </div>
     </Button>

     {/* Tooltip */}
     {showTooltip && !isExpanded && (
      <div className="absolute right-16 top-1/2 transform -translate-y-1/2 bg-foreground text-background text-xs px-3 py-2 rounded-lg opacity-90 whitespace-nowrap pointer-events-none animate-in slide-in-from-right-2 duration-300">
       <div className="flex items-center gap-2">
        <MessageCircle className="h-3 w-3" />
        <span>Need help? Click to chat!</span>
       </div>
       <div className="absolute right-[-4px] top-1/2 transform -translate-y-1/2 w-2 h-2 bg-foreground rotate-45" />
      </div>
     )}

     {/* Status Indicator */}
     {settings.whatsappNumber && !isExpanded && (
      <div className="absolute -top-1 -left-1 h-4 w-4 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
       <div className="h-2 w-2 bg-white rounded-full" />
      </div>
     )}
    </div>
   </div>

   {/* Support Modal */}
   <CustomerSupportModal isOpen={isSupportModalOpen} onClose={() => setIsSupportModalOpen(false)} />
  </>
 )
}