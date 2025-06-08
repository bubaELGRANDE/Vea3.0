// stripe-checkout.component.ts
import { Component, AfterViewInit } from '@angular/core';
import { StripeService } from '../../../core/services/stripe.service';
import { Stripe, StripeCardElement, loadStripe } from '@stripe/stripe-js';

@Component({
  selector: 'app-stripe-checkout',
  templateUrl: './stripe-checkout.component.html',
})
export class StripeCheckoutComponent implements AfterViewInit {
  private stripe!: Stripe;
  private card!: StripeCardElement;

  constructor(private stripeService: StripeService) {}

  async ngAfterViewInit() {
    const stripe = await this.stripeService.getStripe();
    if (!stripe) return;
    this.stripe = stripe;

    const elements = stripe.elements();
    this.card = elements.create('card');
    this.card.mount('#card-element');
  }

  async handleSubmit(event: Event) {
    event.preventDefault();

    const { paymentMethod, error } = await this.stripe.createPaymentMethod({
      type: 'card',
      card: this.card,
    });

    if (error) {
      const displayError = document.getElementById('card-errors');
      if (displayError) displayError.textContent = error.message || '';
    } else {
      console.log('Payment method created:', paymentMethod);
      // Aquí envías paymentMethod.id a tu backend para procesar el pago
    }
  }
}
