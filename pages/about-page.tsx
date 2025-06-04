'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Store, Users, Award, Truck } from 'lucide-react'

import Link from 'next/link'
import { ModernNavbar } from '../components/storefront/modern-navbar'

import { Footer } from '../components/storefront/footer'
import { useStore } from '@/providers/store-provider'

export default function AboutPage(){
  const { settings } = useStore()

  return (
    <div className="min-h-screen bg-background">
      <ModernNavbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link href="/">
              <Button variant="ghost" size="sm" className="mb-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Store
              </Button>
            </Link>
            
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                {settings.logo ? (
                  <img src={settings.logo} alt={settings.storeName} className="h-16 w-16 rounded-lg object-cover" />
                ) : (
                  <Store className="h-16 w-16" style={{ color: settings.themeColor }} />
                )}
                <div>
                  <h1 className="text-4xl font-bold text-foreground">{settings.storeName}</h1>
                  <p className="text-xl text-muted-foreground">{settings.storeDescription}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Store className="h-5 w-5" style={{ color: settings.themeColor }} />
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  At {settings.storeName}, we're committed to providing exceptional products and outstanding customer service. 
                  Our mission is to make quality products accessible to everyone while building lasting relationships with our customers 
                  through personalized service and innovative solutions.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" style={{ color: settings.themeColor }} />
                  What Makes Us Special
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: settings.themeColor }}></span>
                    Carefully curated product selection
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: settings.themeColor }}></span>
                    Direct WhatsApp ordering for convenience
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: settings.themeColor }}></span>
                    Personalized customer support
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: settings.themeColor }}></span>
                    Fast and reliable service
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" style={{ color: settings.themeColor }} />
                  Our Story
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Founded with a passion for quality and customer satisfaction, {settings.storeName} has grown from a small 
                  local business to a trusted online destination. We believe in the power of technology to bring people closer 
                  to the products they love, which is why we've embraced WhatsApp as our primary ordering platform.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5" style={{ color: settings.themeColor }} />
                  How We Serve You
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Our streamlined ordering process through WhatsApp ensures you get what you need quickly and efficiently. 
                  From browsing our catalog to receiving your order, we've designed every step to be simple, transparent, 
                  and customer-focused. Your satisfaction is our priority.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="text-center">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4" style={{ color: settings.themeColor }}>
                Ready to Start Shopping?
              </h2>
              <p className="text-muted-foreground mb-6">
                Explore our carefully selected products and experience the convenience of WhatsApp ordering.
              </p>
              <Link href="/">
                <Button size="lg" style={{ backgroundColor: settings.themeColor }}>
                  <Store className="h-4 w-4 mr-2" />
                  Browse Products
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}