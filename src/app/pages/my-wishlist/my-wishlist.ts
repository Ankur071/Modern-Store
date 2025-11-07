import { Component, inject } from '@angular/core';
import { BackButton } from '../../components/back-button/back-button';
import { EcommerceStore } from '../../ecommerce-store';
import { ProductCard } from "../../components/product-card/product-card";

@Component({
  selector: 'app-my-wishlist',
  imports: [BackButton, ProductCard],
  template: `
    <div class="mx-auto max-w-[1200px] py-6 px-4">
      <app-back-button class="mb-6" navigateTo="/products/all"> Continue Shopping </app-back-button>
      @if(store.wishlistCount()>0){
        <div class="flex justify-between items-center mb-6">
          <h1 class="text-2xl font-bold">My Wishlist</h1>
          <span class="text-gray-500 text-xl">{{ store.wishlistCount() }} items</span>
        </div>
        <div class="responsive-grid">
         @for(product of store.wishlistItems(); track product.id){
          <app-product-card [product]="product"></app-product-card>
         }
        </div>
      }@else {

      }
    </div>
  `,
  styles: ``,
})
export default class MyWishlist {
  store = inject(EcommerceStore);
}
