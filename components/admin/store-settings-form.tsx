import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Store, Phone, Palette, Users, Facebook, Instagram, Mail, RefreshCw, Trash2 } from 'lucide-react'
import { useStore } from '@/providers/store-provider'
import { useToast } from '@/hooks/use-toast'
import { resetToMockData, clearStoreData } from '@/lib/store-utils'

export function StoreSettingsForm() {
  const { settings, updateSettings } = useStore()
  const { toast } = useToast()
  const [isResetting, setIsResetting] = useState(false)

  const [formData, setFormData] = useState(settings)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateSettings(formData)
    toast({
      title: 'Settings Updated',
      description: 'Your store settings have been saved successfully.'
    })
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleResetToDemo = () => {
    if (window.confirm('Are you sure you want to reset to demo data? This will replace all current data.')) {
      setIsResetting(true)
      try {
        resetToMockData()
        toast({
          title: 'Reset Successful',
          description: 'Store has been reset to demo data.',
        })
      } catch (error) {
        toast({
          title: 'Reset Failed',
          description: 'Failed to reset store data.',
          variant: 'destructive',
        })
      } finally {
        setIsResetting(false)
      }
    }
  }

  const handleClearData = () => {
    if (window.confirm('Are you sure you want to clear all data? This cannot be undone.')) {
      try {
        clearStoreData()
        toast({
          title: 'Data Cleared',
          description: 'All store data has been cleared.',
        })
      } catch (error) {
        toast({
          title: 'Clear Failed',
          description: 'Failed to clear store data.',
          variant: 'destructive',
        })
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
          <TabsTrigger value="social">Social Media</TabsTrigger>
          <TabsTrigger value="theme">Theme</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Store className="w-5 h-5" />
                Store Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="storeName">Store Name</Label>
                  <Input
                    id="storeName"
                    value={formData.storeName}
                    onChange={(e) => handleInputChange('storeName', e.target.value)}
                    placeholder="Enter your store name"
                  />
                </div>

                <div>
                  <Label htmlFor="currency">Currency Symbol</Label>
                  <Input
                    id="currency"
                    value={formData.currency}
                    onChange={(e) => handleInputChange('currency', e.target.value)}
                    placeholder="$"
                    maxLength={3}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="storeDescription">Store Description</Label>
                <Textarea
                  id="storeDescription"
                  value={formData.storeDescription}
                  onChange={(e) => handleInputChange('storeDescription', e.target.value)}
                  placeholder="Brief description of your store"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="mission">Mission Statement</Label>
                <Textarea
                  id="mission"
                  value={formData.mission || ''}
                  onChange={(e) => handleInputChange('mission', e.target.value)}
                  placeholder="Your store's mission and values"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="logo">Logo URL</Label>
                  <Input
                    id="logo"
                    value={formData.logo}
                    onChange={(e) => handleInputChange('logo', e.target.value)}
                    placeholder="https://example.com/logo.png"
                  />
                </div>

                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location || ''}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    placeholder="Your business location"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="whatsapp" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                WhatsApp Integration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="whatsappNumber">WhatsApp Number</Label>
                <Input
                  id="whatsappNumber"
                  value={formData.whatsappNumber}
                  onChange={(e) => handleInputChange('whatsappNumber', e.target.value)}
                  placeholder="+1234567890"
                />
                <p className="mt-1 text-sm text-muted-foreground">
                  Include country code (e.g., +1234567890)
                </p>
              </div>

              <div>
                <Label htmlFor="welcomeMessage">Welcome Message</Label>
                <Textarea
                  id="welcomeMessage"
                  value={formData.welcomeMessage}
                  onChange={(e) => handleInputChange('welcomeMessage', e.target.value)}
                  placeholder="Hi! I'd like to place an order:"
                  rows={2}
                />
              </div>

              <div>
                <Label htmlFor="footer">Footer Message</Label>
                <Textarea
                  id="footer"
                  value={formData.footer}
                  onChange={(e) => handleInputChange('footer', e.target.value)}
                  placeholder="Thank you for choosing us!"
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="social" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Social Media & Contact
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="facebookUrl" className="flex items-center gap-2">
                  <Facebook className="w-4 h-4" />
                  Facebook Page URL
                </Label>
                <Input
                  id="facebookUrl"
                  value={formData.facebookUrl || ''}
                  onChange={(e) => handleInputChange('facebookUrl', e.target.value)}
                  placeholder="https://facebook.com/yourpage"
                />
              </div>

              <div>
                <Label htmlFor="instagramUrl" className="flex items-center gap-2">
                  <Instagram className="w-4 h-4" />
                  Instagram Profile URL
                </Label>
                <Input
                  id="instagramUrl"
                  value={formData.instagramUrl || ''}
                  onChange={(e) => handleInputChange('instagramUrl', e.target.value)}
                  placeholder="https://instagram.com/yourprofile"
                />
              </div>

              <div>
                <Label htmlFor="emailContact" className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Contact Email
                </Label>
                <Input
                  id="emailContact"
                  type="email"
                  value={formData.emailContact || ''}
                  onChange={(e) => handleInputChange('emailContact', e.target.value)}
                  placeholder="contact@yourstore.com"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="theme" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5" />
                Theme Customization
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="themeColor">Primary Color</Label>
                <div className="flex gap-2">
                  <Input
                    id="themeColor"
                    type="color"
                    value={formData.themeColor}
                    onChange={(e) => handleInputChange('themeColor', e.target.value)}
                    className="w-20 h-10 p-1"
                  />
                  <Input
                    value={formData.themeColor}
                    onChange={(e) => handleInputChange('themeColor', e.target.value)}
                    placeholder="#10b981"
                    className="flex-1"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex gap-4">
        <Button type="submit" className="flex-1">
          Save Settings
        </Button>
        <Button type="button" variant="outline" onClick={() => setFormData(settings)}>
          Reset
        </Button>
      </div>

      {/* Data Management Section */}
      <div className="pt-6 border-t">
        <h3 className="mb-4 text-lg font-medium">Data Management</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Reset to Demo Data</h4>
              <p className="text-sm text-muted-foreground">
                Replace current data with demo products and settings
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={handleResetToDemo}
              disabled={isResetting}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Reset to Demo
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Clear All Data</h4>
              <p className="text-sm text-muted-foreground">
                Remove all products, categories, and settings
              </p>
            </div>
            <Button
              type="button"
              variant="destructive"
              onClick={handleClearData}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear Data
            </Button>
          </div>
        </div>
      </div>
    </form>
  )
}