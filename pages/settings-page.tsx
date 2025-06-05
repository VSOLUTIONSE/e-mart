import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { StoreSettingsForm } from '../components/admin/store-settings-form';


export default function SettingsPage() {
  return (
    <div className="min-h-screen p-6 bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/admin">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
          
          <h1 className="mb-2 text-3xl font-bold text-foreground">
            Store Settings
          </h1>
          <p className="text-muted-foreground">
            Configure your store branding and WhatsApp integration
          </p>
        </div>

        <StoreSettingsForm />
      </div>
    </div>
  );
}