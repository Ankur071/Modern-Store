import { Component } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar'

@Component({
  selector: 'app-header',
  imports: [MatToolbar],
  template: `
    <mat-toolbar>
      Modern Store
    </mat-toolbar>
      
  `,
  styles: ``,
})
export class Header {

}
