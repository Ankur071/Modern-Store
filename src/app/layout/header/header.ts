import { Component } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { HeaderActions } from '../header-actions/header-actions';

@Component({
  selector: 'app-header',
  imports: [MatToolbar, HeaderActions],
  template: `
    <mat-toolbar class="w-full elevated py-2 sticky top-0 z-10">
      <div class="max-w-[1200px] mx-auto w-full flex justify-between items-center">
        <span> Modern Store </span>
        <app-header-actions />
      </div>
    </mat-toolbar>
  `,
  styles: ``,
})
export class Header {}
