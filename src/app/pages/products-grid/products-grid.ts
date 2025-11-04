import { Component, computed, input, signal } from '@angular/core';
import { Product } from '../../models/product';

@Component({
  selector: 'app-products-grid',
  imports: [],
  template: `
    <div class="bg-gray-100 p-6">
      <h1 class="text-2xl font-bold text-gray-900 mb-6">{{ category() }}</h1>
      <div class="responsive-grid">
        @for (product of filteredProducts(); track product.id) {
        <div
          class="bg-white cursor-pointer rounded-xl shadow-lg overflow-hidden flex flex-col h-full"
        >
          <img [src]="product.imageUrl" class="w-full h-[300px] object-cover rounded-t-xl" />

          <div class="p-5 flex flex-col flex-1">
            <h3 class="text-lg font-semibold text-gray-900 mb-2 leading-tight">
              {{ product.name }}
            </h3>
          </div>
        </div>
        }
      </div>
    </div>
  `,
  styles: ``,
})
export default class ProductsGrid {
  category = input<string>('all');

  products = signal<Product[]>([
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
      name: 'Laptop Stand',
      description: 'Ergonomic aluminum laptop stand with adjustable height',
      price: 49.99,
      imageUrl: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500',
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
      name: 'Kitchen Knife Set',
      description: 'Professional 8-piece stainless steel knife set with block',
      price: 149.99,
      imageUrl: 'https://images.unsplash.com/photo-1593618998160-e34014e67546?w=500',
      rating: 4.9,
      reviewCount: 534,
      inStock: true,
      category: 'home',
    },
  ]);

  filteredProducts = computed(() =>
    this.products().filter((p) => p.category === this.category().toLowerCase())
  );
}
