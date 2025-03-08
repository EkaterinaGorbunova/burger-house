import { Component } from '@angular/core';

@Component({
  selector: 'app-success',
  template: `
    <div class="container">
      <h2>Payment Successful!</h2>
      <p>Thank you for your order. We will contact you soon!</p>
      <button class="button" (click)="goHome()">Return to Menu</button>
    </div>
  `
})
export class SuccessComponent {
  goHome() {
    window.location.href = '/';
  }
}