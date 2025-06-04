import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { StoreSettingsForm } from '@/components/admin/store-settings-form';

export function SettingsPage() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Link to="/admin">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
          
          <h1 className="text-3xl font-bold text-foreground mb-2">
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