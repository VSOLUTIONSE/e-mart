'use client'
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Phone,
  User,
  MapPin,
  MessageCircle,
  ShoppingCart,
  Package,
} from "lucide-react";

import { useCart } from "../../providers/cart-provider";
import { useStore } from "../../providers/store-provider";
import { useToast } from "@/hooks/use-toast";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const { items, totalPrice, clearCart } = useCart();
  const { settings } = useStore();
  const { toast } = useToast();

  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    address: "",
    comments: "",
  });

  const [isProcessing, setIsProcessing] = useState(false);

  const generateOrderCode = () => {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.random().toString(36).substring(2, 5).toUpperCase();
    return `ORD-${random}${timestamp}`;
  };

  const generateWhatsAppMessage = () => {
    const orderCode = generateOrderCode();

    // Format order details
    const orderDetails = items
      .map(
        (item) =>
          `${item.quantity} x ${item.name}${
            item.selectedVariant ? ` (${item.selectedVariant})` : ""
          } ..... ${settings.currency}${(item.price * item.quantity).toFixed(
            2
          )}`
      )
      .join("\n");

    // Create total line with dots
    const totalAmount = `${settings.currency}${totalPrice.toFixed(2)}`;
    const dotsLength = Math.max(20 - totalAmount.length, 3);
    const dots = ".".repeat(dotsLength);

    const message = `Hi ${settings.storeName}, I would like to place an order.

I want it delivered to: ${customerInfo.address}

Name: ${customerInfo.name}
Phone: ${customerInfo.phone}
Comments: ${customerInfo.comments || "None"}

***

${orderDetails}

***

## Total: ${dots} ${totalAmount}

Order code: ${orderCode}`;

    return encodeURIComponent(message);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    if (!customerInfo.name || !customerInfo.phone || !customerInfo.address) {
      toast({
        title: "Missing Information",
        description:
          "Please fill in your name, phone number, and delivery address.",
        variant: "destructive",
      });
      setIsProcessing(false);
      return;
    }

    if (!settings.whatsappNumber) {
      toast({
        title: "WhatsApp Not Configured",
        description: "Store owner hasn't set up WhatsApp number yet.",
        variant: "destructive",
      });
      setIsProcessing(false);
      return;
    }

    // Simulate processing delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const message = generateWhatsAppMessage();
    const whatsappUrl = `https://wa.me/${settings.whatsappNumber.replace(
      /\D/g,
      ""
    )}?text=${message}`;

    window.open(whatsappUrl, "_blank");

    clearCart();
    setIsProcessing(false);
    onClose();

    toast({
      title: "Order Sent Successfully! 🎉",
      description:
        "Your order has been sent via WhatsApp with a unique order code.",
      duration: 5000,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="max-w-md animate-in zoom-in-95 duration-300"
        aria-describedby="checkout-description"
      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <div className="relative">
              <ShoppingCart
                className="h-6 w-6 animate-pulse"
                style={{ color: settings.themeColor }}
              />
              <div className="absolute -top-1 -right-1 h-3 w-3 bg-green-500 rounded-full animate-bounce" />
            </div>
            Complete Your Order
          </DialogTitle>
        </DialogHeader>

        <div id="checkout-description">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Order Summary */}
            <div className="bg-muted/50 rounded-lg p-4 space-y-3 animate-in slide-in-from-top-2 duration-500">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Package className="h-4 w-4" />
                Order Summary ({items.length} items)
              </div>
              <div className="space-y-2">
                {items.slice(0, 3).map((item, index) => (
                  <div
                    key={item.id}
                    className="flex justify-between text-sm animate-in slide-in-from-left-2"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <span className="truncate">
                      {item.quantity}x {item.name}
                    </span>
                    <span
                      className="font-medium"
                      style={{ color: settings.themeColor }}
                    >
                      {settings.currency}
                      {(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
                {items.length > 3 && (
                  <div className="text-xs text-muted-foreground">
                    +{items.length - 3} more items
                  </div>
                )}
              </div>
              <div className="border-t pt-2 flex justify-between font-semibold">
                <span>Total:</span>
                <span
                  className="text-lg animate-pulse"
                  style={{ color: settings.themeColor }}
                >
                  {settings.currency}
                  {totalPrice.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Customer Information */}
            <div className="space-y-4">
              <div className="space-y-2 animate-in slide-in-from-bottom-2 duration-500 delay-200">
                <Label
                  htmlFor="name"
                  className="flex items-center gap-2 text-sm font-medium"
                >
                  <User
                    className="h-4 w-4"
                    style={{ color: settings.themeColor }}
                  />
                  Full Name *
                </Label>
                <Input
                  id="name"
                  placeholder="Enter your full name"
                  value={customerInfo.name}
                  onChange={(e) =>
                    setCustomerInfo((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  required
                  className="transition-all duration-200 focus:scale-[1.02] focus:shadow-md"
                  aria-describedby="name-help"
                />
              </div>

              <div className="space-y-2 animate-in slide-in-from-bottom-2 duration-500 delay-300">
                <Label
                  htmlFor="phone"
                  className="flex items-center gap-2 text-sm font-medium"
                >
                  <Phone
                    className="h-4 w-4"
                    style={{ color: settings.themeColor }}
                  />
                  Phone Number *
                </Label>
                <Input
                  id="phone"
                  placeholder="Enter your phone number"
                  value={customerInfo.phone}
                  onChange={(e) =>
                    setCustomerInfo((prev) => ({
                      ...prev,
                      phone: e.target.value,
                    }))
                  }
                  required
                  className="transition-all duration-200 focus:scale-[1.02] focus:shadow-md"
                  aria-describedby="phone-help"
                />
              </div>

              <div className="space-y-2 animate-in slide-in-from-bottom-2 duration-500 delay-400">
                <Label
                  htmlFor="address"
                  className="flex items-center gap-2 text-sm font-medium"
                >
                  <MapPin
                    className="h-4 w-4"
                    style={{ color: settings.themeColor }}
                  />
                  Delivery Address *
                </Label>
                <Textarea
                  id="address"
                  placeholder="e.g., No 6, Isihor Benin-city, Ugbowo Benin-city Nigeria"
                  value={customerInfo.address}
                  onChange={(e) =>
                    setCustomerInfo((prev) => ({
                      ...prev,
                      address: e.target.value,
                    }))
                  }
                  rows={3}
                  required
                  className="transition-all duration-200 focus:scale-[1.02] focus:shadow-md resize-none"
                  aria-describedby="address-help"
                />
              </div>

              <div className="space-y-2 animate-in slide-in-from-bottom-2 duration-500 delay-500">
                <Label htmlFor="comments" className="text-sm font-medium">
                  Special Comments (Optional)
                </Label>
                <Textarea
                  id="comments"
                  placeholder="Any special instructions or comments about your order..."
                  value={customerInfo.comments}
                  onChange={(e) =>
                    setCustomerInfo((prev) => ({
                      ...prev,
                      comments: e.target.value,
                    }))
                  }
                  rows={2}
                  className="transition-all duration-200 focus:scale-[1.02] focus:shadow-md resize-none"
                  aria-describedby="comments-help"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 animate-in slide-in-from-bottom-2 duration-500 delay-600">
              <Button
                type="submit"
                disabled={isProcessing}
                className="w-full h-12 text-base font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:scale-100 disabled:opacity-50"
                style={{ backgroundColor: settings.themeColor }}
                aria-describedby="submit-help"
              >
                {isProcessing ? (
                  <div className="flex items-center gap-3">
                    <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Processing Order...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5" />
                    <span>Send Order via WhatsApp</span>
                  </div>
                )}
              </Button>
            </div>

            {/* Security Note */}
            <div className="text-xs text-center text-muted-foreground animate-in fade-in duration-1000 delay-700">
              🔒 Your information is secure and will only be used for order
              processing
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
