import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator';
import { 
  Store, 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Instagram, 
  MessageCircle,
  Clock,
  Truck,
  Shield,
  CreditCard,
  ExternalLink
} from 'lucide-react'
import { useStore } from '@/providers/store-provider'

export function Footer() {
  const { settings } = useStore()

  const socialLinks = [
    { 
      name: 'Facebook', 
      icon: Facebook, 
      url: 'https://facebook.com', 
      color: '#1877F2' 
    },
    { 
      name: 'Instagram', 
      icon: Instagram, 
      url: 'https://instagram.com', 
      color: '#E4405F' 
    },
    { 
      name: 'Email', 
      icon: Mail, 
      url: 'mailto:contact@store.com', 
      color: '#EA4335' 
    }
  ]

  const quickLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '#' },
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' }
  ]

  const features = [
    { icon: Clock, text: 'Fast Delivery' },
    { icon: Shield, text: 'Secure Ordering' },
    { icon: MessageCircle, text: 'WhatsApp Support' },
    { icon: CreditCard, text: 'Flexible Payment' }
  ]

  const openWhatsApp = () => {
    if (settings.whatsappNumber) {
      const message = encodeURIComponent(`Hi! I'd like to get in touch regarding ${settings.storeName}.`)
      window.open(`https://wa.me/${settings.whatsappNumber.replace(/\D/g, '')}?text=${message}`, '_blank')
    }
  }

  return (
    <footer className="bg-muted/30 border-t mt-16">
      <div className="container mx-auto px-4 py-12">
        {/* Features Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 bg-background/50">
              <CardContent className="p-4 text-center">
                <feature.icon 
                  className="h-6 w-6 mx-auto mb-2" 
                  style={{ color: settings.themeColor }} 
                />
                <p className="text-sm font-medium text-muted-foreground">
                  {feature.text}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-8 md:grid-cols-4">
          {/* Store Info */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              {settings.logo ? (
                <img 
                  src={settings.logo} 
                  alt={settings.storeName} 
                  className="h-10 w-10 rounded object-cover" 
                />
              ) : (
                <Store className="h-10 w-10" style={{ color: settings.themeColor }} />
              )}
              <div>
                <h3 className="text-lg font-bold text-foreground">{settings.storeName}</h3>
                <p className="text-sm text-muted-foreground">{settings.storeDescription}</p>
              </div>
            </div>
            
            <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
              Experience the convenience of WhatsApp ordering with our curated selection of quality products. 
              We're committed to providing exceptional service and building lasting relationships with our customers.
            </p>

            {/* Contact Info */}
            <div className="space-y-2 mb-6">
              {settings.whatsappNumber && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" style={{ color: settings.themeColor }} />
                  <span>{settings.whatsappNumber}</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" style={{ color: settings.themeColor }} />
                <span>contact@{settings.storeName.toLowerCase().replace(/\s+/g, '')}.com</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" style={{ color: settings.themeColor }} />
                <span>Serving customers worldwide</span>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <Button
                  key={social.name}
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(social.url, '_blank')}
                  className="p-2 hover:scale-105 transition-transform"
                >
                  <social.icon className="h-4 w-4" />
                </Button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <div className="space-y-2">
              {quickLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Customer Support */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Customer Support</h4>
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Need help? Contact us directly through WhatsApp for immediate assistance.
              </p>
              
              {settings.whatsappNumber && (
                <Button 
                  onClick={openWhatsApp}
                  size="sm" 
                  className="w-full"
                  style={{ backgroundColor: settings.themeColor }}
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Chat with Us
                </Button>
              )}

              <div className="text-xs text-muted-foreground">
                <p className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  Response time: Usually within 1 hour
                </p>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            <p>© 2025 {settings.storeName}. All rights reserved.</p>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Truck className="h-4 w-4" />
              Fast Delivery
            </span>
            <span className="flex items-center gap-1">
              <Shield className="h-4 w-4" />
              Secure
            </span>
            <span className="flex items-center gap-1">
              Made with ❤️ for our customers
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}