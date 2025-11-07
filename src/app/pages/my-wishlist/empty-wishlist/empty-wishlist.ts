import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-empty-wishlist',
  imports: [MatButton, MatIcon, RouterLink],
  template: `
    <div class="flex flex-col items-center justify-center h-full py-16">
      <div class="text-center">
        <mat-icon class="!w-32 !h-32 !text-[128px] text-gray-300 mb-4">
          favorite_border
        </mat-icon>
        <h2 class="text-2xl font-bold text-gray-900 mb-2">
          Your Wishlist is Empty
        </h2>
        <p class="text-base text-gray-600 mb-6">
          Start adding products you love to your wishlist
        </p>
        <button 
          matButton="filled"
          color="primary" 
          [routerLink]="['/products', 'all']"
          class="!px-6 !py-2"
        >
          Start Shopping
        </button>
      </div>
    </div>
  `,
  styles: ``,
})
export class EmptyWishlist {
   
}
