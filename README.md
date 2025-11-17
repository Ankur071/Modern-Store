# 🛒 Modern Store

A full-stack e-commerce application built with **Angular 20**, featuring modern state management, responsive design, and a complete shopping experience.

![Angular](https://img.shields.io/badge/Angular-20-red?logo=angular)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-blue?logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.17-06B6D4?logo=tailwindcss)
![Angular Material](https://img.shields.io/badge/Angular%20Material-20.2.11-2196F3?logo=angular&logoColor=white)
![NgRx](https://img.shields.io/badge/NgRx-20.1.0-purple?logo=ngrx)

## 🎯 Project Overview

This project demonstrates a production-ready e-commerce platform with 32 products across 4 categories, implementing industry-standard patterns and best practices for Angular development.

**Live Demo:** [https://modern-store-xg.vercel.app/](#) | **Source Code:** [https://github.com/Ankur071/Modern-Store](#)

## ✨ Core Features

### Product Management

- Browse 32 curated products across Electronics, Clothing, Accessories, and Home categories
- Dynamic category filtering with real-time updates
- Detailed product pages with specifications, ratings, and stock status
- Responsive product cards with hover effects and animations

### Shopping Experience

- **Shopping Cart** - Add/remove items, adjust quantities, persistent storage
- **Wishlist** - Save favorites, bulk add to cart, move between cart and wishlist
- **Smart Search** - Category-based filtering with instant results
- **Stock Management** - Real-time stock status indicators

### User Authentication

- Secure sign-in/sign-up with form validation
- Session persistence with local storage
- Protected checkout routes requiring authentication
- User profile display with avatar and dropdown menu

### Checkout Process

- **Shipping Form** - Validated address collection (name, address, city, state, zip)
- **Payment Integration** - Stripe-ready payment form
- **Order Summary** - Real-time cart totals and item review
- **Success Page** - Order confirmation with email notification message

## 🛠️ Technical Stack

| Category             | Technology          | Purpose                                         |
| -------------------- | ------------------- | ----------------------------------------------- |
| **Framework**        | Angular 20          | Standalone components, signals, latest features |
| **State Management** | NgRx Signal Store   | Reactive state with computed values             |
| **UI Components**    | Angular Material 20 | Material Design components                      |
| **Styling**          | TailwindCSS 4       | Utility-first responsive design                 |
| **Forms**            | Reactive Forms      | Validation and form handling                    |
| **Routing**          | Angular Router      | View transitions, input binding                 |
| **Notifications**    | ngx-hot-toast       | User feedback system                            |
| **Immutability**     | Immer.js            | Simplified state updates                        |

## 🏗️ Architecture & Design Patterns

### State Management

- **Centralized Store** using NgRx Signal Store
- **Computed Signals** for derived state (filtered products, cart count, totals)
- **Side Effects** managed through store methods
- **Persistent Storage** using `withStorageSync` for cart and wishlist

### Component Structure

```
Standalone Components (No NgModules)
├── Smart Components (Container) - Handle business logic
├── Presentational Components - Pure display logic
├── Reusable Components - Shared UI elements
└── Layout Components - Page structure
```

### Code Quality

- TypeScript strict mode enabled
- Reactive programming with RxJS and Signals
- Custom directives for reusable behavior
- Proper separation of concerns

## 📂 Project Structure

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
│   │   ├── order.ts
│   │   ├── product.ts
│   │   └── user.ts
│   ├── pages/               # Page components
│   │   ├── checkout/
│   │   │   ├── payment-form/
│   │   │   └── shipping-form/
│   │   ├── my-wishlist/
│   │   │   └── empty-wishlist/
│   │   ├── order-success/
│   │   ├── products-grid/
│   │   ├── show-cart-item/
│   │   ├── view-cart/
│   │   │   ├── list-cart-items/
│   │   │   └── tease-wishlist/
│   │   └── view-product-detail/
│   │       ├── product-info/
│   │       └── stock-status/
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

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Angular CLI 20+

### Installation

```bash
# Clone repository
git clone https://github.com/Ankur071/Modern-Store.git
cd ng-ecommerce

# Install dependencies
npm install

# Start development server
npm start
```

Application will run at `http://localhost:4200`

### Build for Production

```bash
npm run build
```

Output will be in `dist/` directory, optimized and ready for deployment.

## 💡 Key Implementation Highlights

### Signal Store Pattern

```typescript
export const EcommerceStore = signalStore(
  withState({ products, cartItems, wishlistItems, user, loading }),
  withComputed(({ products, category }) => ({
    filteredProducts: computed(() =>
      category() === 'all' ? products() : products().filter((p) => p.category === category())
    ),
  })),
  withMethods((store) => ({
    addToCart: (product, quantity) => {
      /* logic */
    },
    signIn: ({ email, password }) => {
      /* authentication */
    },
  }))
);
```

### View Transitions

```typescript
provideRouter(
  routes,
  withComponentInputBinding(),
  withViewTransitions() // Smooth page transitions
);
```

### Form Validation

```typescript
shippingForm = this.fb.group({
  firstName: ['', Validators.required],
  email: ['', [Validators.required, Validators.email]],
  zipCode: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]],
});
```

## 📊 Features Breakdown

| Feature           | Status      | Description                                |
| ----------------- | ----------- | ------------------------------------------ |
| Product Catalog   | ✅ Complete | 32 products with images, ratings, prices   |
| Category Filter   | ✅ Complete | Electronics, Clothing, Accessories, Home   |
| Product Detail    | ✅ Complete | Full specifications, stock status, reviews |
| Shopping Cart     | ✅ Complete | Add, remove, update quantities             |
| Wishlist          | ✅ Complete | Save items, bulk operations                |
| Authentication    | ✅ Complete | Sign in/up with validation                 |
| Checkout          | ✅ Complete | Shipping & payment forms                   |
| Order Success     | ✅ Complete | Confirmation page                          |
| View Transitions  | ✅ Complete | Smooth page animations                     |
| Responsive Design | ✅ Complete | Mobile-first approach                      |
| State Persistence | ✅ Complete | Local storage sync                         |

## 🎨 UI/UX Features

- **Material Design** - Consistent design language
- **Responsive Layout** - Works on all screen sizes
- **Toast Notifications** - Real-time user feedback
- **Loading States** - Smooth loading indicators
- **Empty States** - Beautiful empty cart/wishlist displays
- **Form Validation** - Real-time error messages
- **Smooth Animations** - View transitions between pages

## 🔐 Security Considerations

- Form validation on client-side (ready for backend integration)
- CSRF protection ready
- XSS protection through Angular sanitization
- Secure password handling (min 6 characters, ready for hashing)

## 📈 Performance Optimizations

- OnPush change detection strategy ready
- Lazy loading routes (expandable)
- Signal-based reactivity for minimal re-renders
- Optimized bundle size with standalone components
- Image lazy loading capability

## 🚧 Future Enhancements

- [ ] Backend API integration
- [ ] Real payment gateway integration (Stripe)
- [ ] Product search functionality
- [ ] Order history page
- [ ] Product reviews and ratings
- [ ] Email notifications
- [ ] Advanced filtering (price range, ratings)
- [ ] Internationalization (i18n)

## 📝 Development Scripts

```bash
npm start          # Development server
npm run build      # Production build
npm test           # Run unit tests
npm run lint       # Code linting
```

## 👨‍💻 Developer

**Ankur Yadav**  
Full Stack Developer | Angular Specialist

[![GitHub](https://img.shields.io/badge/GitHub-Ankur071-181717?logo=github)](https://github.com/Ankur071)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?logo=linkedin)](https://www.linkedin.com/in/ankur-yadav-610943295/)

## 📄 License

This project is licensed under the MIT License.

---

**Built with Angular 20** | Demonstrates modern web development practices and enterprise-level architecture
