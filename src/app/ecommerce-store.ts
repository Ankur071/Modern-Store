import { SignInParams, SignUpParams, User } from './models/user';
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
import { Order } from './models/order';
import { withStorageSync } from '@angular-architects/ngrx-toolkit';

export type EcommerceState = {
  products: Product[];
  category: string;
  wishlistItems: Product[];
  cartItems: CartItem[];
  user: User | undefined;
  loading: boolean;
  selectedProductId: string | undefined;
};

export const EcommerceStore = signalStore(
  {
    providedIn: 'root',
  },
  withState({
    products: [
      // Existing reshuffled products (1-16)
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
        id: '3',
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
        id: '4',
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
        id: '5',
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
        id: '8',
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
        id: '13',
        name: 'Wireless Mouse',
        description: 'Ergonomic wireless mouse with precision tracking',
        price: 39.99,
        imageUrl: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500',
        rating: 4.4,
        reviewCount: 164,
        inStock: false,
        category: 'electronics',
      },
      {
        id: '14',
        name: 'Winter Hoodie',
        description: 'Warm fleece-lined hoodie for cold weather',
        price: 59.99,
        imageUrl: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500',
        rating: 4.5,
        reviewCount: 178,
        inStock: true,
        category: 'clothing',
      },
      {
        id: '15',
        name: 'Stainless Steel Watch',
        description: 'Minimalist design with automatic movement',
        price: 249.99,
        imageUrl: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500',
        rating: 4.8,
        reviewCount: 312,
        inStock: true,
        category: 'accessories',
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
      // New products (17-32) - Following same shuffling pattern
      {
        id: '17',
        name: 'Bluetooth Speaker',
        description: 'Portable waterproof speaker with 360° sound and 12-hour battery',
        price: 89.99,
        imageUrl: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500',
        rating: 4.6,
        reviewCount: 342,
        inStock: true,
        category: 'electronics',
      },
      {
        id: '18',
        name: 'Yoga Pants',
        description: 'High-waisted moisture-wicking yoga leggings with pockets',
        price: 49.99,
        imageUrl: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=500',
        rating: 4.7,
        reviewCount: 289,
        inStock: true,
        category: 'clothing',
      },
      {
        id: '19',
        name: 'Leather Crossbody Bag',
        description: 'Compact genuine leather crossbody bag with adjustable strap',
        price: 129.99,
        imageUrl: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500',
        rating: 4.8,
        reviewCount: 215,
        inStock: true,
        category: 'accessories',
      },
      {
        id: '20',
        name: 'Coffee Maker',
        description: 'Programmable drip coffee maker with thermal carafe',
        price: 79.99,
        imageUrl: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500',
        rating: 4.5,
        reviewCount: 412,
        inStock: true,
        category: 'home',
      },
      {
        id: '21',
        name: 'Mechanical Keyboard',
        description: 'RGB backlit mechanical gaming keyboard with blue switches',
        price: 119.99,
        imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500',
        rating: 4.7,
        reviewCount: 523,
        inStock: true,
        category: 'electronics',
      },
      {
        id: '22',
        name: 'Bomber Jacket',
        description: 'Classic bomber jacket with ribbed collar and cuffs',
        price: 149.99,
        imageUrl: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500',
        rating: 4.6,
        reviewCount: 178,
        inStock: true,
        category: 'clothing',
      },
      {
        id: '23',
        name: 'Baseball Cap',
        description: 'Adjustable cotton baseball cap with embroidered logo',
        price: 29.99,
        imageUrl: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500',
        rating: 4.4,
        reviewCount: 267,
        inStock: true,
        category: 'accessories',
      },
      {
        id: '24',
        name: 'Ceramic Vase Set',
        description: 'Set of 3 modern geometric ceramic vases in neutral tones',
        price: 44.99,
        imageUrl: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=500',
        rating: 4.6,
        reviewCount: 189,
        inStock: true,
        category: 'home',
      },
      {
        id: '25',
        name: 'Wireless Earbuds',
        description: 'True wireless earbuds with active noise cancellation',
        price: 159.99,
        imageUrl: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500',
        rating: 4.5,
        reviewCount: 678,
        inStock: true,
        category: 'electronics',
      },
      {
        id: '26',
        name: 'Sneakers',
        description: 'Casual canvas sneakers with cushioned insole',
        price: 69.99,
        imageUrl: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500',
        rating: 4.5,
        reviewCount: 445,
        inStock: false,
        category: 'clothing',
      },
      {
        id: '27',
        name: 'Leather Belt',
        description: 'Reversible leather belt with silver buckle',
        price: 39.99,
        imageUrl: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500',
        rating: 4.7,
        reviewCount: 234,
        inStock: true,
        category: 'accessories',
      },
      {
        id: '28',
        name: 'Bedside Table',
        description: 'Modern wooden nightstand with drawer and open shelf',
        price: 129.99,
        imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500',
        rating: 4.8,
        reviewCount: 156,
        inStock: true,
        category: 'home',
      },
      {
        id: '29',
        name: 'Tablet',
        description: '10-inch tablet with 128GB storage and stylus support',
        price: 399.99,
        imageUrl: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500',
        rating: 4.6,
        reviewCount: 489,
        inStock: true,
        category: 'electronics',
      },
      {
        id: '30',
        name: 'Formal Shirt',
        description: 'Slim-fit dress shirt in premium cotton blend',
        price: 54.99,
        imageUrl: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500',
        rating: 4.5,
        reviewCount: 312,
        inStock: true,
        category: 'clothing',
      },
      {
        id: '31',
        name: 'Silver Necklace',
        description: 'Sterling silver pendant necklace with delicate chain',
        price: 89.99,
        imageUrl: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500',
        rating: 4.9,
        reviewCount: 287,
        inStock: true,
        category: 'accessories',
      },
      {
        id: '32',
        name: 'Floor Mirror',
        description: 'Full-length standing mirror with wooden frame',
        price: 159.99,
        imageUrl: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=500',
        rating: 4.7,
        reviewCount: 198,
        inStock: true,
        category: 'home',
      },
    ],
    category: 'all',
    wishlistItems: [],
    cartItems: [],
    user: undefined,
    loading: false,
    selectedProductId: undefined,
  } as EcommerceState),
  withStorageSync({
    key: 'modern-store',
    select: ({ wishlistItems, cartItems, user }) => ({ wishlistItems, cartItems }),
  }),
  withComputed(({ category, products, wishlistItems, cartItems, selectedProductId }) => ({
    filteredProducts: computed(() => {
      if (category() === 'all') return products();
      return products().filter((p) => p.category === category().toLowerCase());
    }),
    wishlistCount: computed(() => wishlistItems().length),
    cartCount: computed(() => cartItems().reduce((acc, item) => acc + item.quantity, 0)),
    selectedProduct: computed(() => products().find((p) => p.id === selectedProductId())),
  })),
  withMethods(
    (store, toaster = inject(Toaster), matDialog = inject(MatDialog), router = inject(Router)) => ({
      setCategory: signalMethod<string>((category: string) => {
        patchState(store, { category });
      }),
      setProductId: signalMethod<string>((productId: string) => {
        patchState(store, { selectedProductId: productId });
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
        if (!store.user()) {
          matDialog.open(SignInDialog, {
            disableClose: true,
            data: {
              checkout: true,
            },
          });
          return;
        }
        router.navigate(['/checkout']);
      },

      placeOrder: async () => {
        patchState(store, { loading: true });

        const user = store.user();

        if (!user) {
          toaster.error('Please login before placing order');
          patchState(store, { loading: false });
          return;
        }

        const order: Order = {
          id: crypto.randomUUID(),
          userId: user.id,
          total: Math.round(
            store.cartItems().reduce((acc, item) => acc + item.quantity * item.product.price, 0)
          ),
          items: store.cartItems(),
          paymentStatus: 'success',
        };

        await new Promise((resolve) => setTimeout(resolve, 1000));

        patchState(store, { loading: false, cartItems: [] });
        router.navigate(['order-success']);
      },

      signIn: ({ email, password, checkout, dialogId }: SignInParams) => {
        patchState(store, {
          user: {
            id: '1',
            email,
            name: 'John Doe',
            imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
          },
        });

        matDialog.getDialogById(dialogId)?.close();

        if (checkout) {
          router.navigate(['/checkout']);
        }
      },

      signOut: () => {
        patchState(store, { user: undefined });
      },

      signUp: ({ email, password, name, checkout, dialogId }: SignUpParams) => {
        patchState(store, {
          user: {
            id: '1',
            email,
            name: 'John Doe',
            imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
          },
        });

        matDialog.getDialogById(dialogId)?.close();

        if (checkout) {
          router.navigate(['/checkout']);
        }
      },
    })
  )
);
