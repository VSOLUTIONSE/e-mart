import { Toaster } from "@/components/ui/toaster"

import { FloatingChatWidget } from "@/components/storefront/floating-chat-widget"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { StoreProvider } from "@/providers/store-provider"
import { CartProvider } from "@/providers/cart-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "E-Mart",
  description: "Your one-stop shop for all your needs",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <CartProvider>
            <div className="min-h-screen bg-background">
              {children}
              <Toaster />
              <FloatingChatWidget />
            </div>
          </CartProvider>
        </StoreProvider>
      </body>
    </html>
  )
} 