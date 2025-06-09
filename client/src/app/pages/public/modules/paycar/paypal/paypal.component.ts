// src/app/pages/private/paypal/paypal.component.ts
import { Component, AfterViewInit, OnDestroy, Input, OnInit } from '@angular/core';

declare const paypal: any; // usar el SDK global

@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrl: './paypal.component.scss'
})
export class PaypalComponent implements  AfterViewInit, OnDestroy {

  @Input() price?: number
  currentPrice: number = 0


  private paypalButtonsInstance: any = null;

  ngAfterViewInit(): void {
    if (this.price) {
      this.currentPrice = this.price
    }
    this.loadPayPalButtons();
  }
  

  ngOnDestroy(): void {
    // Limpiar la instancia de PayPal si existe
    if (this.paypalButtonsInstance) {
      this.paypalButtonsInstance = null;
    }
  }

  private loadPayPalButtons(): void {
    // Verificar que PayPal SDK esté disponible
    if (typeof paypal === 'undefined') {
      console.error('PayPal SDK no está disponible');
      return;
    }

    this.paypalButtonsInstance = paypal.Buttons({
      style: {
        layout: 'vertical',
        color: 'blue',
        shape: 'rect',
        label: 'paypal'
      },
      createOrder: (data: any, actions: any) => {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: this.currentPrice, // Monto de prueba
              currency_code: 'USD'
            },
            description: 'Pago de prueba desde Angular'
          }]
        });
      },
      onApprove: (data: any, actions: any) => {
        return actions.order.capture().then((details: any) => {
          console.log('Detalles del pago:', details);
          alert(`¡Pago exitoso! Gracias ${details.payer.name.given_name} por tu compra.`);
          // Aquí puedes enviar los detalles a tu backend
          this.handleSuccessfulPayment(details);
        });
      },
      onError: (err: any) => {
        console.error('Error de PayPal:', err);
        alert('Ocurrió un error durante el pago. Por favor, intenta nuevamente.');
      },
      onCancel: (data: any) => {
        console.log('Pago cancelado:', data);
        alert('Pago cancelado por el usuario.');
      }
    });

    this.paypalButtonsInstance.render('#paypal-button-container').catch((error: any) => {
      console.error('Error al renderizar los botones de PayPal:', error);
    });
  }

  private handleSuccessfulPayment(details: any): void {
    // Aquí puedes implementar la lógica para manejar el pago exitoso
    // Por ejemplo, enviar los detalles a tu backend, actualizar el estado de la orden, etc.
    console.log('Procesando pago exitoso:', details);

    // Ejemplo de datos que podrías enviar a tu backend:
    const paymentData = {
      orderId: details.id,
      payerId: details.payer.payer_id,
      payerEmail: details.payer.email_address,
      amount: details.purchase_units[0].amount.value,
      currency: details.purchase_units[0].amount.currency_code,
      status: details.status
    };

    // Aquí llamarías a tu servicio para enviar los datos al backend
    // this.paymentService.processPayment(paymentData).subscribe(...);
  }
}
