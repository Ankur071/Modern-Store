import { SignInParams, User } from './models/user';
import { Toaster } from './services/toaster';
import { computed, inject } from '@angular/core';
import { Product } from './models/product';
import {
  patchState,
  signalMethod,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { produce } from 'immer';
import { CartItem } from './models/cart';
import { MatDialog } from '@angular/material/dialog';
import { SignInDialog } from './components/sign-in-dialog/sign-in-dialog';
import { Router } from '@angular/router';

export type EcommerceState = {
  products: Product[];
  category: string;
  wishlistItems: Product[];
  cartItems: CartItem[];
  user: User | undefined;
};

export const EcommerceStore = signalStore(
  {
    providedIn: 'root',
  },
  withState({
    products: [
      // Electronics
      {
        id: '1',
        name: 'Wireless Headphones',
        description: 'Premium noise-cancelling wireless headphones with 30-hour battery life',
        price: 299.99,
        imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
        rating: 4.5,
        reviewCount: 128,
        inStock: true,
        category: 'electronics',
      },
      {
        id: '2',
        name: 'Smart Watch',
        description: 'Fitness tracker with heart rate monitor and GPS',
        price: 199.99,
        imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
        rating: 4.3,
        reviewCount: 89,
        inStock: true,
        category: 'electronics',
      },
      {
        id: '3',
        name: 'Professional Camera',
        description: 'Mirrorless camera with 24MP sensor and 4K video recording',
        price: 1299.99,
        imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500',
        rating: 4.7,
        reviewCount: 256,
        inStock: true,
        category: 'electronics',
      },
      {
        id: '4',
        name: 'Wireless Mouse',
        description: 'Ergonomic wireless mouse with precision tracking',
        price: 39.99,
        imageUrl: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500',
        rating: 4.4,
        reviewCount: 164,
        inStock: false,
        category: 'electronics',
      },
      // Clothing
      {
        id: '5',
        name: 'Classic Denim Jacket',
        description: 'Timeless denim jacket with a modern fit',
        price: 89.99,
        imageUrl: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=500',
        rating: 4.6,
        reviewCount: 203,
        inStock: true,
        category: 'clothing',
      },
      {
        id: '6',
        name: 'Cotton T-Shirt',
        description: 'Comfortable 100% organic cotton t-shirt',
        price: 24.99,
        imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
        rating: 4.4,
        reviewCount: 342,
        inStock: true,
        category: 'clothing',
      },
      {
        id: '7',
        name: 'Running Shoes',
        description: 'Lightweight running shoes with superior cushioning',
        price: 129.99,
        imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
        rating: 4.8,
        reviewCount: 456,
        inStock: true,
        category: 'clothing',
      },
      {
        id: '8',
        name: 'Winter Hoodie',
        description: 'Warm fleece-lined hoodie for cold weather',
        price: 59.99,
        imageUrl: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500',
        rating: 4.5,
        reviewCount: 178,
        inStock: true,
        category: 'clothing',
      },
      // Accessories
      {
        id: '9',
        name: 'Leather Wallet',
        description: 'Genuine leather bifold wallet with RFID protection',
        price: 45.99,
        imageUrl: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=500',
        rating: 4.7,
        reviewCount: 267,
        inStock: true,
        category: 'accessories',
      },
      {
        id: '10',
        name: 'Sunglasses',
        description: 'UV protection polarized sunglasses',
        price: 79.99,
        imageUrl: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500',
        rating: 4.6,
        reviewCount: 145,
        inStock: true,
        category: 'accessories',
      },
      {
        id: '11',
        name: 'Canvas Backpack',
        description: 'Durable canvas backpack with laptop compartment',
        price: 64.99,
        imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
        rating: 4.5,
        reviewCount: 198,
        inStock: false,
        category: 'accessories',
      },
      {
        id: '12',
        name: 'Stainless Steel Watch',
        description: 'Minimalist design with automatic movement',
        price: 249.99,
        imageUrl: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500',
        rating: 4.8,
        reviewCount: 312,
        inStock: true,
        category: 'accessories',
      },
      // Home
      {
        id: '13',
        name: 'Throw Pillow Set',
        description: 'Set of 4 decorative throw pillows with removable covers',
        price: 39.99,
        imageUrl: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=500',
        rating: 4.3,
        reviewCount: 89,
        inStock: true,
        category: 'home',
      },
      {
        id: '14',
        name: 'Aromatherapy Diffuser',
        description: 'Ultrasonic essential oil diffuser with LED lights',
        price: 34.99,
        imageUrl: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500',
        rating: 4.7,
        reviewCount: 423,
        inStock: true,
        category: 'home',
      },
      {
        id: '15',
        name: 'Wall Art Canvas',
        description: 'Modern abstract canvas wall art 24x36 inches',
        price: 89.99,
        imageUrl: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=500',
        rating: 4.6,
        reviewCount: 156,
        inStock: true,
        category: 'home',
      },
      {
        id: '16',
        name: 'Table Lamp',
        description: 'Modern LED desk lamp with adjustable brightness and color temperature',
        price: 54.99,
        imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500',
        rating: 4.9,
        reviewCount: 534,
        inStock: true,
        category: 'home',
      },
    ],
    category: 'all',
    wishlistItems: [],
    cartItems: [],
    user: undefined,
  } as EcommerceState),
  withComputed(({ category, products, wishlistItems, cartItems }) => ({
    filteredProducts: computed(() => {
      if (category() === 'all') return products();
      return products().filter((p) => p.category === category().toLowerCase());
    }),
    wishlistCount: computed(() => wishlistItems().length),
    cartCount: computed(() => cartItems().reduce((acc, item) => acc + item.quantity, 0)),
  })),
  withMethods((store, toaster = inject(Toaster), matDialog = inject(MatDialog), router = inject(Router)) => ({
    setCategory: signalMethod<string>((category: string) => {
      patchState(store, { category });
    }),
    addToWishlist: (product: Product) => {
      const updatedWishlistItems = produce(store.wishlistItems(), (draft) => {
        if (!draft.find((p) => p.id === product.id)) {
          draft.push(product);
        }
      });
      patchState(store, { wishlistItems: updatedWishlistItems });
      toaster.success('Product added to wishlist');
    },

    removeFromWishlist: (product: Product) => {
      patchState(store, {
        wishlistItems: store.wishlistItems().filter((p) => p.id !== product.id),
      });
      toaster.success('Product removed from wishlist');
    },

    clearWishlist: () => {
      patchState(store, { wishlistItems: [] });
    },

    addToCart: (product: Product, quantity = 1) => {
      const existingItemIndex = store.cartItems().findIndex((i) => i.product.id === product.id);

      const updatedCartItems = produce(store.cartItems(), (draft) => {
        if (existingItemIndex !== -1) {
          draft[existingItemIndex].quantity += quantity;
          return;
        }

        draft.push({
          product,
          quantity,
        });
      });

      patchState(store, { cartItems: updatedCartItems });
      toaster.success(
        existingItemIndex !== -1 ? 'Product added again' : 'Product added to the cart'
      );
    },

    setItemQuantity(params: { productId: string; quantity: number }) {
      const index = store.cartItems().findIndex((c) => c.product.id === params.productId);
      const updated = produce(store.cartItems(), (draft) => {
        draft[index].quantity = params.quantity;
      });

      patchState(store, { cartItems: updated });
    },

    addAllWishlistToCart: () => {
      const updatedCartItems = produce(store.cartItems(), (draft) => {
        store.wishlistItems().forEach((p) => {
          if (!draft.find((c) => c.product.id === p.id)) {
            draft.push({ product: p, quantity: 1 });
          }
        });
      });
      patchState(store, { cartItems: updatedCartItems, wishlistItems: [] });
    },

    moveToWishlist: (product: Product) => {
      const updatedCartItems = store.cartItems().filter((p) => p.product.id !== product.id);
      const updatedWishlistItems = produce(store.wishlistItems(), (draft) => {
        if (!draft.find((p) => p.id === product.id)) {
          draft.push(product);
        }
      });
      patchState(store, { cartItems: updatedCartItems, wishlistItems: updatedWishlistItems });
    },

    removeFromCart: (product: Product) => {
      patchState(store, {
        cartItems: store.cartItems().filter((c) => c.product.id !== product.id),
      });
    },

    proceedToCheckout: () => {
      matDialog.open(SignInDialog, {
        disableClose: true,
        data: {
          checkout: true,
        }
      });
    },

    signIn: ({ email, password, checkout, dialogId }: SignInParams) => {
      patchState(store, {
        user: {
          id: '1',
          email,
          name: 'John Doe',
          imageUrl: 'https://randomeuser.me/api/portraits/men/1.jpg',
        },
      });

      matDialog.getDialogById(dialogId)?.close();

      if(checkout) {
        router.navigate(['/checkout']);
      }
    },
  }))
);
