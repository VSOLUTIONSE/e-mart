'use client'
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Package, Settings, Store, ShoppingCart } from 'lucide-react';
import { useStore } from '../providers/store-provider';
import Link from 'next/link';


export function AdminDashboard() {
  const { products, settings } = useStore();

  const stats = [
    {
      title: 'Total Products',
      value: products.length,
      icon: Package,
      color: 'text-blue-600'
    },
    {
      title: 'Active Products',
      value: products.filter(p => p.inStock).length,
      icon: ShoppingCart,
      color: 'text-green-600'
    },
    {
      title: 'Featured Products',
      value: products.filter(p => p.featured).length,
      icon: Store,
      color: 'text-purple-600'
    }
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {settings.storeName} - Admin Dashboard
          </h1>
          <p className="text-muted-foreground">
            Manage your WhatsApp store and track performance
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Product Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Add, edit, and organize your product catalog
              </p>
              <Link href="/admin/products">
                <Button className="w-full">
                  Manage Products
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Store Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Configure your store branding and WhatsApp integration
              </p>
              <Link href="/admin/settings">
                <Button className="w-full">
                  Store Settings
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <Link href="/">
                  <Button variant="outline">
                    <Store className="h-4 w-4 mr-2" />
                    View Storefront
                  </Button>
                </Link>
                <Link href="/admin/products">
                  <Button variant="outline">
                    <Package className="h-4 w-4 mr-2" />
                    Add Product
                  </Button>
                </Link>
                <Link href="/admin/settings">
                  <Button variant="outline">
                    <Settings className="h-4 w-4 mr-2" />
                    WhatsApp Setup
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}