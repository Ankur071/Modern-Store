import { Component, inject } from '@angular/core';
import { ViewPanel } from "../../../directives/view-panel";
import { MatIcon } from "@angular/material/icon";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";

@Component({
  selector: 'app-shipping-form',
  imports: [
    ViewPanel, 
    MatIcon, 
    MatFormField, 
    MatLabel, 
    MatInput, 
    ReactiveFormsModule
  ],
  template: `
    <div appViewPanel>
      <h2 class="text-2xl font-bold mb-6 flex items-center gap-2">
        <mat-icon>local_shipping</mat-icon>
        Shipping Information
      </h2>

      <form [formGroup]="shippingForm" class="grid grid-cols-2 gap-4">
        <mat-form-field appearance="outline">
          <mat-label>First Name</mat-label>
          <input matInput type="text" formControlName="firstName" placeholder="First Name" />
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Last Name</mat-label>
          <input matInput type="text" formControlName="lastName" placeholder="Last Name" />
        </mat-form-field>

        <mat-form-field appearance="outline" class="col-span-2">
          <mat-label>Address</mat-label>
          <textarea matInput formControlName="address" placeholder="Address" rows="3"></textarea>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>City</mat-label>
          <input matInput type="text" formControlName="city" placeholder="City" />
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>State</mat-label>
          <input matInput type="text" formControlName="state" placeholder="State" />
        </mat-form-field>

        <mat-form-field appearance="outline" class="col-span-2">
          <mat-label>Zip Code</mat-label>
          <input matInput type="text" formControlName="zipCode" placeholder="Zip Code" />
        </mat-form-field>
      </form>
    </div>
  `,
  styles: ``,
})
export class ShippingForm {
  fb = inject(NonNullableFormBuilder);

  shippingForm = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    address: ['', [Validators.required]],
    city: ['', [Validators.required]],
    state: ['', [Validators.required]],
    zipCode: ['', [Validators.required, Validators.pattern(/^\d{5}(-\d{4})?$/)]],
  });
}
