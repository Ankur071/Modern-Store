# 🛒 Modern Store (Angular E-Commerce Store)

A modern, fully-featured e-commerce application built with **Angular 20**, **NgRx Signal Store**, **Angular Material**, and **TailwindCSS**.

![Angular](https://img.shields.io/badge/Angular-20-red?logo=angular)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0-06B6D4?logo=tailwindcss)
![NgRx](https://img.shields.io/badge/NgRx-18-purple?logo=ngrx)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

### 🛍️ Shopping Experience
- **Product Catalog** - Browse products across multiple categories (Electronics, Clothing, Accessories, Home)
- **Category Filtering** - Filter products by category with a clean UI
- **Product Cards** - Responsive product cards with images, ratings, and reviews
- **Product Details** - Detailed product information with add to cart/wishlist options

### ❤️ Wishlist Management
- **Add to Wishlist** - Save favorite products for later
- **Wishlist Page** - Dedicated page to view all wishlist items
- **Bulk Actions** - Add all wishlist items to cart at once
- **Move Between Cart & Wishlist** - Seamlessly move products between cart and wishlist

### 🛒 Shopping Cart
- **Add to Cart** - Add products with quantity selection
- **Quantity Management** - Increase/decrease quantities or remove items
- **Cart Summary** - Real-time cart total calculation
- **Persistent State** - Cart and wishlist persist across sessions
- **Empty State** - Beautiful empty cart/wishlist states

### 👤 User Authentication
- **Sign In/Sign Up Dialogs** - Material Design authentication forms
- **Form Validation** - Email, password strength, and confirmation validation
- **User Profile** - Display user avatar and information in header
- **Session Management** - Sign in/out functionality
- **Protected Checkout** - Redirect to sign-in if not authenticated

### 💳 Checkout Flow
- **Order Summary** - Review cart items before checkout
- **Authentication Gate** - Require sign-in before proceeding
- **Success Page** - Order confirmation page

### 🎨 UI/UX
- **Responsive Design** - Mobile-first design with TailwindCSS
- **Material Design** - Angular Material components throughout
- **Toast Notifications** - User feedback for all actions
- **Loading States** - Smooth loading indicators
- **Icon System** - Material Icons for consistent iconography
- **Custom Directives** - ViewPanel directive for consistent page layouts

## 🚀 Tech Stack

- **Framework**: Angular 20 (Standalone Components)
- **State Management**: NgRx Signal Store
- **UI Components**: Angular Material 20.2.11
- **Styling**: TailwindCSS 4.x
- **Forms**: Reactive Forms with Validation
- **Routing**: Angular Router with Component Input Binding
- **Immutability**: Immer.js for state updates
- **Notifications**: ngx-hot-toast
- **Icons**: Material Icons
- **TypeScript**: 5.x with strict mode

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/ng-ecommerce.git

# Navigate to project directory
cd ng-ecommerce

# Install dependencies
npm install

# Start development server
ng serve
```

Open your browser and navigate to `http://localhost:4200`

## 🏗️ Project Structure

```
src/
├── app/
│   ├── components/          # Reusable UI components
│   │   ├── back-button/
│   │   ├── product-card/
│   │   ├── qty-selector/
│   │   ├── sign-in-dialog/
│   │   ├── sign-up-dialog/
│   │   ├── summarize-order/
│   │   └── toggle-wishlist-button/
│   ├── directives/          # Custom directives
│   │   └── view-panel.ts
│   ├── layout/              # Layout components
│   │   ├── header/
│   │   └── header-actions/
│   ├── models/              # TypeScript interfaces
│   │   ├── cart.ts
│   │   ├── product.ts
│   │   └── user.ts
│   ├── pages/               # Page components
│   │   ├── checkout/
│   │   ├── my-wishlist/
│   │   ├── order-success/
│   │   ├── products-grid/
│   │   ├── show-cart-item/
│   │   └── view-cart/
│   ├── services/            # Services
│   │   └── toaster.ts
│   ├── app.config.ts        # App configuration
│   ├── app.routes.ts        # Route definitions
│   ├── app.ts               # Root component
│   └── ecommerce-store.ts   # NgRx Signal Store
├── index.html
├── main.ts
└── styles.scss
```

## 🔧 Configuration

### Material Design Theme

Customized Material theme in `app.config.ts`:

```typescript
{
  provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
  useValue: {
    appearance: 'outline',
    subscriptSizing: 'dynamic',
    floatLabel: 'auto',
  }
}
```

### TailwindCSS

Custom Tailwind configuration with Material color palette integration.

## 📱 Key Components

### Signal Store (State Management)

```typescript
export const EcommerceStore = signalStore(
  withState({
    products: [...],
    category: 'all',
    wishlistItems: [],
    cartItems: [],
    user: undefined,
    loading: false,
  }),
  withComputed(...),
  withMethods(...)
);
```

### Product Card with Content Projection

```typescript
<app-product-card [product]="product">
  <app-toggle-wishlist-button 
    class="!absolute z-10 top-3 right-3" 
    [product]="product" 
  />
</app-product-card>
```

### Reactive Forms with Validation

```typescript
signInForm = this.fb.group({
  email: ['', [Validators.required, Validators.email]],
  password: ['', [Validators.required, Validators.minLength(6)]],
});
```

## 🎯 Features in Detail

### State Management with NgRx Signals

- **Reactive State**: All state changes are signals for optimal change detection
- **Computed Values**: Derived state (filtered products, cart count, wishlist count)
- **Immutable Updates**: Using Immer.js for clean state mutations
- **Methods**: Encapsulated business logic in store methods

### Authentication Flow

1. User clicks "Proceed to Checkout" or "Sign In"
2. Sign-in dialog opens with form validation
3. On successful sign-in, user data is stored in state
4. User avatar appears in header with dropdown menu
5. Checkout flow continues if initiated from cart

### Cart Management

- Add products with quantity selection
- Update quantities with +/- buttons
- Remove individual items
- Move items to wishlist
- Real-time price calculations
- Persistent across page refreshes

## 🚧 Development

```bash
# Run development server
ng serve

# Build for production
ng build --configuration production

# Run tests
ng test

# Lint code
ng lint
```

## 📄 Scripts

```json
{
  "start": "ng serve",
  "build": "ng build",
  "watch": "ng build --watch --configuration development",
  "test": "ng test"
}
```

## 🌐 Environment

Development server runs on `http://localhost:4200`

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Ankur Yadav**
- GitHub: [@Ankur071](https://github.com/Ankur071)
- LinkedIn: [LinkedIn](https://www.linkedin.com/in/ankur-yadav-610943295/)

## 🙏 Acknowledgments

- Angular Team for the amazing framework
- NgRx Team for Signal Store
- Material Design for the design system
- Unsplash for product images
  
---

**Made with ❤️ using Angular**
