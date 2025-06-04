"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Store, Info, Phone, Menu, ShoppingCart, Settings } from "lucide-react";
import { useStore } from "@/providers/store-provider";
import { useCart } from "@/providers/cart-provider";
import { CustomerSupportModal } from "@/components/storefront/customer-support-modal";
import { usePathname } from "next/navigation";
import Link from "next/link";

export function ModernNavbar({
  toggleCheckout,
}: {
  toggleCheckout?: () => void;
}) {
  const { settings } = useStore();
  const { totalItems } = useCart();
  const pathname = usePathname();

  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  const navItems = [
    { path: "/", label: "Store", icon: Store },
    { path: "/about", label: "About", icon: Info },
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo & Brand */}
            <Link
              href="/"
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              {settings.logo ? (
                <img
                  src={settings.logo}
                  alt={settings.storeName}
                  className="h-8 w-8 rounded object-cover"
                />
              ) : (
                <Store
                  className="h-8 w-8"
                  style={{ color: settings.themeColor }}
                />
              )}
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-foreground">
                  {settings.storeName}
                </h1>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
                    isActive(item.path)
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSupportOpen(true)}
                className="hidden sm:flex items-center gap-2"
              >
                <Phone className="h-4 w-4" />
                Support
              </Button>

              {pathname === "/" && (
                <Button
                  onClick={toggleCheckout}
                  variant="outline"
                  size="sm"
                  className="relative"
                >
                  <ShoppingCart className="h-4 w-4" />
                  {totalItems > 0 && (
                    <Badge
                      className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                      style={{ backgroundColor: settings.themeColor }}
                    >
                      {totalItems}
                    </Badge>
                  )}
                </Button>
              )}

              {/* Mobile Menu Trigger */}
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="md:hidden">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80">
                  <div className="flex flex-col gap-4 mt-8">
                    {navItems.map((item) => (
                      <Link
                        key={item.path}
                        href={item.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                          isActive(item.path)
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                        }`}
                      >
                        <item.icon className="h-5 w-5" />
                        {item.label}
                      </Link>
                    ))}

                    <div className="border-t pt-4">
                      <Button
                        variant="ghost"
                        className="w-full justify-start gap-3"
                        onClick={() => {
                          setIsSupportOpen(true);
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        <Phone className="h-5 w-5" />
                        Customer Support
                      </Button>

                      <Link
                        href="/admin"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Button
                          variant="ghost"
                          className="w-full justify-start gap-3 mt-2"
                        >
                          <Settings className="h-5 w-5" />
                          Admin Dashboard
                        </Button>
                      </Link>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>

      <CustomerSupportModal
        isOpen={isSupportOpen}
        onClose={() => setIsSupportOpen(false)}
      />
    </>
  );
}
