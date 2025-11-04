import { Component, input } from '@angular/core';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-card',
  imports: [],
  template: `
    <div
          class="bg-white cursor-pointer rounded-xl shadow-lg overflow-hidden flex flex-col h-full"
        >
          <img [src]="product().imageUrl" class="w-full h-[300px] object-cover rounded-t-xl" />

          <div class="p-5 flex flex-col flex-1">
            <h3 class="text-lg font-semibold text-gray-900 mb-2 leading-tight">
              {{ product().name }}
            </h3>
            <p class="text-sm text-gray-600 mb-4 flex-1 leading-relaxed">
              {{ product().description }}
            </p>

             <!-- add rating component -->
              
          </div>
        </div>
  `,
  styles: ``,
})
export class ProductCard {
   product = input.required<Product>();
}
