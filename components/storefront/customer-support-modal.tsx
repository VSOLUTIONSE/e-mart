import {useState} from 'react'
import {Dialog, DialogContent, DialogHeader, DialogTitle} from '@/components/ui/dialog'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {Label} from '@/components/ui/label'
import {Textarea} from '@/components/ui/textarea'
import {MessageCircle, Mail, Clock, Headphones} from 'lucide-react'
import {useStore} from '@/providers/store-provider'
import {useToast} from '@/hooks/use-toast'

interface CustomerSupportModalProps {
 isOpen: boolean
 onClose: () => void
}

export function CustomerSupportModal({isOpen, onClose}: CustomerSupportModalProps) {
 const {settings} = useStore()
 const {toast} = useToast()

 const [supportForm, setSupportForm] = useState({
  name: '',
  email: '',
  subject: '',
  message: ''
 })

 const [selectedTopic, setSelectedTopic] = useState('')

 const supportTopics = [
  {id: 'order', label: 'Order Inquiry', icon: '📦'},
  {id: 'product', label: 'Product Information', icon: '🛍️'},
  {id: 'delivery', label: 'Delivery Status', icon: '🚚'},
  {id: 'payment', label: 'Payment Issue', icon: '💳'},
  {id: 'return', label: 'Return/Exchange', icon: '↩️'},
  {id: 'other', label: 'Other Question', icon: '❓'}
 ]

 const handleWhatsAppContact = (topic?: string) => {
  if (!settings.whatsappNumber) {
   toast({
    title: 'WhatsApp Not Available',
    description: 'WhatsApp support is not configured yet.',
    variant: 'destructive'
   })
   return
  }

  let message = `Hi! I need help with ${settings.storeName}.`

  if (topic) {
   const selectedTopicData = supportTopics.find(t => t.id === topic)
   message += `\n\n${selectedTopicData?.icon} Topic: ${selectedTopicData?.label}`
  }

  if (supportForm.name) {
   message += `\n👤 Name: ${supportForm.name}`
  }

  if (supportForm.message) {
   message += `\n📝 Message: ${supportForm.message}`
  }

  const whatsappUrl = `https://wa.me/${settings.whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`
  window.open(whatsappUrl, '_blank')

  onClose()
  toast({
   title: 'Redirecting to WhatsApp',
   description: 'Opening WhatsApp to connect you with our support team.'
  })
 }

 const handleEmailContact = () => {
  const subject = supportForm.subject || 'Customer Support Request'
  const body = `Name: ${supportForm.name}\n\nMessage:\n${supportForm.message}`
  const emailUrl = `mailto:support@${settings.storeName.toLowerCase().replace(/\s+/g, '')}.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

  window.open(emailUrl, '_blank')
  onClose()

  toast({
   title: 'Email Client Opened',
   description: 'Your email client should open with a pre-filled support request.'
  })
 }

 return (
  <Dialog open={isOpen} onOpenChange={onClose}>
   <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" aria-describedby="support-description">
    <DialogHeader>
     <DialogTitle className="flex items-center gap-2">
      <Headphones className="h-5 w-5" style={{color: settings.themeColor}} />
      Customer Support
     </DialogTitle>
    </DialogHeader>

    <div id="support-description" className="space-y-6">
     {/* Support Info */}
     <div className="bg-muted/50 rounded-lg p-4">
      <h3 className="font-semibold text-foreground mb-2">How can we help you?</h3>
      <p className="text-sm text-muted-foreground mb-3">Our support team is here to assist you. Choose your preferred contact method below.</p>

      <div className="flex items-center gap-4 text-sm">
       <div className="flex items-center gap-1">
        <Clock className="h-4 w-4" style={{color: settings.themeColor}} />
        <span>Response time: Usually within 1 hour</span>
       </div>
      </div>
     </div>

     {/* Quick Contact Options */}
     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Button onClick={() => handleWhatsAppContact()} className="h-auto p-4 flex flex-col items-center gap-2" style={{backgroundColor: settings.themeColor}}>
       <MessageCircle className="h-6 w-6" />
       <div className="text-center">
        <div className="font-medium">WhatsApp Support</div>
        <div className="text-xs opacity-90">Instant messaging</div>
       </div>
      </Button>

      <Button onClick={handleEmailContact} variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
       <Mail className="h-6 w-6" style={{color: settings.themeColor}} />
       <div className="text-center">
        <div className="font-medium">Email Support</div>
        <div className="text-xs text-muted-foreground">Detailed inquiries</div>
       </div>
      </Button>
     </div>

     {/* Support Topics */}
     <div>
      <Label className="text-sm font-medium mb-3 block">What do you need help with?</Label>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
       {supportTopics.map(topic => (
        <Button 
         key={topic.id} 
         variant={selectedTopic === topic.id ? 'default' : 'outline'} 
         size="sm" 
         onClick={() => setSelectedTopic(topic.id)} 
         className="justify-start text-left h-auto p-3"
         aria-pressed={selectedTopic === topic.id}
        >
         <span className="mr-2" aria-hidden="true">{topic.icon}</span>
         <span className="text-xs">{topic.label}</span>
        </Button>
       ))}
      </div>
     </div>

     {/* Contact Form */}
     <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
       <div>
        <Label htmlFor="support-name">Your Name</Label>
        <Input 
         id="support-name" 
         placeholder="Enter your name" 
         value={supportForm.name} 
         onChange={e => setSupportForm(prev => ({...prev, name: e.target.value}))}
         aria-describedby="name-help"
        />
       </div>

       <div>
        <Label htmlFor="support-email">Email (optional)</Label>
        <Input 
         id="support-email" 
         type="email" 
         placeholder="Enter your email" 
         value={supportForm.email} 
         onChange={e => setSupportForm(prev => ({...prev, email: e.target.value}))}
         aria-describedby="email-help"
        />
       </div>
      </div>

      <div>
       <Label htmlFor="support-subject">Subject (for email)</Label>
       <Input 
        id="support-subject" 
        placeholder="Brief description of your inquiry" 
        value={supportForm.subject} 
        onChange={e => setSupportForm(prev => ({...prev, subject: e.target.value}))}
        aria-describedby="subject-help"
       />
      </div>

      <div>
       <Label htmlFor="support-message">Message</Label>
       <Textarea 
        id="support-message" 
        placeholder="Please describe your question or issue in detail..." 
        rows={4} 
        value={supportForm.message} 
        onChange={e => setSupportForm(prev => ({...prev, message: e.target.value}))}
        aria-describedby="message-help"
       />
      </div>
     </div>

     {/* Action Buttons */}
     <div className="flex gap-3 pt-4 border-t">
      <Button 
       onClick={() => handleWhatsAppContact(selectedTopic)} 
       className="flex-1" 
       style={{backgroundColor: settings.themeColor}} 
       disabled={!settings.whatsappNumber}
       aria-describedby="whatsapp-help"
      >
       <MessageCircle className="h-4 w-4 mr-2" />
       Send via WhatsApp
      </Button>

      <Button onClick={handleEmailContact} variant="outline" className="flex-1" aria-describedby="email-help">
       <Mail className="h-4 w-4 mr-2" />
       Send Email
      </Button>
     </div>

     {!settings.whatsappNumber && <p className="text-sm text-muted-foreground text-center">WhatsApp support is currently being set up. Please use email for now.</p>}
    </div>
   </DialogContent>
  </Dialog>
 )
}