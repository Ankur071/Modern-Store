import { Component, inject, signal } from '@angular/core';
import { MatIconButton, MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatDialogClose } from '@angular/material/dialog';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatLabel, MatPrefix, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-sign-in-dialog',
  imports: [
    MatIconButton,
    MatButton,
    MatIcon,
    MatDialogClose,
    MatFormField,
    MatLabel,
    MatInput,
    MatSuffix,
    MatPrefix,
    ReactiveFormsModule,
  ],
  template: `
    <div class="p-8 max-w-[400px] flex flex-col">
      <div class="flex justify-between mb-6">
        <div>
          <h2 class="text-xl font-medium mb-1">Sign In</h2>
          <p class="text-sm text-gray-500">Sign in to your account to continue shopping</p>
        </div>
        <button tabindex="-1" matIconButton class="-mt-2 -mr-2" mat-dialog-close>
          <mat-icon>close</mat-icon>
        </button>
      </div>

      <form [formGroup]="signInForm" class="flex flex-col gap-4">
        <mat-form-field appearance="outline">
          <mat-label>Email</mat-label>
          <input matInput type="email" formControlName="email" placeholder="Enter your email" />
          <mat-icon matPrefix>email</mat-icon>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Password</mat-label>
          <input
            matInput
            [type]="passwordVisible() ? 'text' : 'password'"
            formControlName="password"
            placeholder="Enter your password"
          />
          <mat-icon matPrefix>lock</mat-icon>
          <button
            class="mr-2"
            type="button"
            matIconButton
            matSuffix
            (click)="passwordVisible.set(!passwordVisible())"
          >
            <mat-icon>{{ passwordVisible() ? 'visibility_off' : 'visibility' }}</mat-icon>
          </button>
        </mat-form-field>

        <button type="submit" matButton="filled" class="w-full">Sign In</button>
      </form>
    </div>
  `,
  styles: ``,
})
export class SignInDialog {
  fb = inject(NonNullableFormBuilder);

  passwordVisible = signal(false);

  signInForm = this.fb.group({
    email: ['johnd@test.com', [Validators.required, Validators.email]],
    password: ['test123', [Validators.required, Validators.minLength(6)]],
  });
}
