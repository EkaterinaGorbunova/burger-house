import { Injectable } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StripeService {
  private stripe: any;

  constructor(private http: HttpClient) {
    this.initStripe();
  }

  private async initStripe() {
    this.stripe = await loadStripe(environment.stripePublishableKey); // Replace with your Stripe publishable key
  }

  async createPaymentSession(orderData: any, selectedBurger: any, currentCurrency: string) {
    try {
      const imageUrl = `https://burger-house-express.netlify.app/assets/images/${selectedBurger.image}`;
      
      const stripeCurrency = currentCurrency === "$CAD" ? "cad" 
      : currentCurrency === "$USD" ? "usd"
      : currentCurrency === "€" ? "eur"
      : "cad";

      const session: any = await lastValueFrom(
        this.http.post(`${environment.apiUrl}/create-checkout-session`, {
          items: [{
            name: orderData.order,
            amount: this.extractPrice(orderData.order),
            currency: stripeCurrency,
            product_data: {
              images: [imageUrl]
            }
          }]
        })
      );

      // Redirect to Stripe Checkout
      const result = await this.stripe.redirectToCheckout({
        sessionId: session.id
      });

      if (result.error) {
        throw new Error(result.error.message);
      }
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  private extractPrice(orderString: string): number {
    const match = orderString.match(/\d+/);
    return match ? parseInt(match[0]) * 100 : 0; // Convert to cents
  }
}
