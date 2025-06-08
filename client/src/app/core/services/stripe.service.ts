// src/app/stripe.service.ts
import { Injectable } from '@angular/core';
import { loadStripe, Stripe } from '@stripe/stripe-js';

@Injectable({
  providedIn: 'root'
})
export class StripeService {
  private stripePromise = loadStripe('pk_test_51RXcfAQGAnE6FW2G8cUKmQdQ7EbNztz7CRFEDXZQnINgZNDMxNBIjdLnWdaB3EMgRRYtGGb1DmYkIRscKiZkKo3f00l4COSt6k'); // clave pública de Stripe

  async getStripe(): Promise<Stripe | null> {
    return await this.stripePromise;
  }
}
