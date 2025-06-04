# E-Mart: Modern E-commerce Platform

E-Mart is a sophisticated e-commerce solution built with Next.js 14, TypeScript, and Tailwind CSS. It features a modern storefront with WhatsApp integration and a comprehensive admin dashboard.

## 🌟 Features

### 🛍️ Customer Features
- Responsive product catalog with search and filtering
- Real-time shopping cart
- Product variants support
- Image gallery with thumbnails
- WhatsApp order integration
- Live customer support chat
- Mobile-first design

### 👩‍💼 Admin Features
- Product management (CRUD operations)
- Category management
- Store settings customization
- Theme color customization
- WhatsApp integration setup
- Order tracking

## 🏗️ Project Structure

```
e-mart/
├── app/                     # Next.js 14 app directory
│   ├── globals.css         # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx          # Home page
│   ├── about/           # About page
│   └── admin/          # Admin pages
├── components/
│   ├── admin/         # Admin components
│   │   ├── category-manager.tsx
│   │   ├── product-form.tsx
│   │   ├── product-list.tsx
│   │   └── store-settings-form.tsx
│   ├── storefront/   # Customer-facing components
│   │   ├── cart.tsx
│   │   ├── checkout-modal.tsx
│   │   ├── modern-navbar.tsx
│   │   └── product-catalog.tsx
│   └── ui/          # Reusable UI components (shadcn/ui)
├── providers/       # React Context Providers
├── hooks/          # Custom React hooks
├── types/         # TypeScript definitions
└── lib/          # Utility functions
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18.0 or higher
- npm or yarn
- Git

### Installation

1. Clone the repository
\`\`\`powershell
git clone https://github.com/yourusername/e-mart.git
cd e-mart
\`\`\`

2. Install dependencies
\`\`\`powershell
npm install
\`\`\`

3. Run the development server
\`\`\`powershell
npm run dev
\`\`\`

## 💻 Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide Icons
- **State Management**: React Context
- **Form Handling**: React Hook Form
- **Animations**: Tailwind CSS animations

## 🔧 Core Components

### ProductModal
The product modal provides a detailed view of products with:
- Image gallery with thumbnail navigation
- Variant selection
- Quantity adjustment
- Add to cart functionality
- Dynamic pricing calculation

### Cart System
Features a sliding cart panel with:
- Real-time updates
- Quantity management
- Total calculation
- WhatsApp checkout integration

### ModernNavbar
A responsive navigation bar that includes:
- Mobile-friendly menu
- Cart status
- Customer support access
- Dynamic theming

## 🎨 Customization

### Store Settings
Customize your store through the admin dashboard:

- Store Information
  - Store name
  - Logo
  - Currency
  - WhatsApp number
  
- Theme
  - Primary color
  - Accent colors
  - Typography

### Product Configuration
Products can be configured with:
- Multiple images
- Variants
- Categories
- Featured status
- Stock status
- Pricing

## 📱 Mobile Responsiveness

The application is built with a mobile-first approach and includes:
- Responsive grid layouts
- Touch-friendly interfaces
- Mobile-optimized images
- Adaptive navigation

## 🔒 Security Best Practices

- Input validation
- XSS protection
- CSRF prevention
- Secure data handling
- Rate limiting

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
\`\`\`powershell
git checkout -b feature/AmazingFeature
\`\`\`
3. Commit your changes
\`\`\`powershell
git commit -m 'Add some AmazingFeature'
\`\`\`
4. Push to the branch
\`\`\`powershell
git push origin feature/AmazingFeature
\`\`\`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) for the styling system
- [Lucide Icons](https://lucide.dev/) for the icon set

## 📞 Support

For support, email support@emart.com or join our Slack channel.
