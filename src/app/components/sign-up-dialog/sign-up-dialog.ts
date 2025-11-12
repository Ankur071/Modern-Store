import { Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatDialog, MAT_DIALOG_DATA, MatDialogClose, MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatLabel, MatPrefix, MatSuffix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { EcommerceStore } from '../../ecommerce-store';
import { SignInDialog } from '../sign-in-dialog/sign-in-dialog';
import { SignUpParams } from '../../models/user';

@Component({
  selector: 'app-sign-up-dialog',
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
          <h2 class="text-xl font-medium mb-1">Sign Up</h2>
          <p class="text-sm text-gray-500">Join us and start shopping today</p>
        </div>
        <button tabindex="-1" matIconButton class="-mt-2 -mr-2" mat-dialog-close>
          <mat-icon>close</mat-icon>
        </button>
      </div>
      <form [formGroup]="signUpForm" (ngSubmit)="signUp()" class="flex flex-col gap-4">
        <mat-form-field appearance="outline">
          <mat-label>Full Name</mat-label>
          <input matInput type="text" formControlName="name" placeholder="Enter your full name" />
          <mat-icon matPrefix>person</mat-icon>
        </mat-form-field>

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

        <mat-form-field appearance="outline">
          <mat-label>Confirm Password</mat-label>
          <input
            matInput
            [type]="confirmPasswordVisible() ? 'text' : 'password'"
            formControlName="confirmPassword"
            placeholder="Confirm your password"
          />
          <mat-icon matPrefix>lock</mat-icon>
          <button
            class="mr-2"
            type="button"
            matIconButton
            matSuffix
            (click)="confirmPasswordVisible.set(!confirmPasswordVisible())"
          >
            <mat-icon>{{ confirmPasswordVisible() ? 'visibility_off' : 'visibility' }}</mat-icon>
          </button>
        </mat-form-field>

        <button type="submit" matButton="filled" class="w-full" [disabled]="store.loading()">
          {{ store.loading() ? 'Creating Account...' : 'Create Account' }}
        </button>
      </form>
      <p class="text-sm text-gray-500 mt-2 text-center">
        Already have an account?
        <a class="text-blue-600 cursor-pointer" (click)="openSignInDialog()">Sign In</a>
      </p>
    </div>
  `,
  styles: ``,
})
export class SignUpDialog {
  fb = inject(NonNullableFormBuilder);
  store = inject(EcommerceStore);
  matDialog = inject(MatDialog);
  data = inject<{ checkout: boolean }>(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef);

  passwordVisible = signal(false);
  confirmPasswordVisible = signal(false);

  signUpForm = this.fb.group({
    name: ['John Doe', [Validators.required, Validators.minLength(2)]],
    email: ['johnd@test.com', [Validators.required, Validators.email]],
    password: ['test123', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['test123', [Validators.required]],
  });

  signUp() {
    if (!this.signUpForm.valid) {
      this.signUpForm.markAllAsTouched();
      return;
    }

    const { password, confirmPassword, name, email } = this.signUpForm.value;

    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    this.store.signUp({
      name,
      email,
      password,
      checkout: this.data?.checkout,
      dialogId: this.dialogRef.id,
    } as SignUpParams);
  }

  openSignInDialog() {
    this.dialogRef.close();
    this.matDialog.open(SignInDialog, {
      disableClose: true,
      data: {
        checkout: this.data?.checkout,
      },
    });
  }
}
