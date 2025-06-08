import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaypalComponent } from '../paypal/paypal.component';
import { EfectivoComponent } from '../efectivo/efectivo.component';

@Component({
  selector: 'app-payment',
  imports: [ RouterModule, CommonModule, FormsModule, PaypalComponent, EfectivoComponent ],
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
