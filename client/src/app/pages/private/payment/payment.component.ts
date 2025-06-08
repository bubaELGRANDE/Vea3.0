import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaypalComponent } from '../paypal/paypal.component';
import { EfectivoComponent } from '../efectivo/efectivo.component';
import { StripeCheckoutComponent } from '../stripe-checkout/stripe-checkout.component';

@Component({
  selector: 'app-payment',
  imports: [ CommonModule, FormsModule, PaypalComponent, EfectivoComponent, StripeCheckoutComponent ],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {
  selectedPaymentMethod: string = 'cash';

  onPaymentMethodChange(method: string) {
    this.selectedPaymentMethod = method;
  }

  onPayNow() {
    console.log('Método de pago seleccionado:', this.selectedPaymentMethod);
    // Aquí puedes agregar la lógica adicional para procesar el pago
  }
}
