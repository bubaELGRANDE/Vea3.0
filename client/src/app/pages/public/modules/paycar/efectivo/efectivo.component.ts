import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-efectivo',
  imports: [CommonModule, FormsModule],
  templateUrl: './efectivo.component.html',
  styleUrl: './efectivo.component.scss'
})
export class EfectivoComponent implements OnInit {
  // Referencia a Math para usar en el template
  @Input() price?: number
  @Output() save: EventEmitter<any> = new EventEmitter
  Math = Math;

  // Monto total a pagar (puede venir de un servicio o parámetro)
  totalAmount: number = 0; // Valor de ejemplo

  ngOnInit(): void {
    if (this.price) {
      this.totalAmount = this.price
    }
  }

  // Monto con el que paga el cliente
  amountPaid: number = 0;

  // Cambio calculado
  get change(): number {
    return this.amountPaid - this.totalAmount;
  }

  // Validar si el monto pagado es suficiente
  get isAmountSufficient(): boolean {
    return this.amountPaid >= this.totalAmount;
  }

  // Validar si el formulario es válido
  get isFormValid(): boolean {
    return this.amountPaid > 0 && this.isAmountSufficient;
  }

  // Método para confirmar el pago
  confirmPayment() {
    if (this.isFormValid) {
      console.log('Pago confirmado:', {
        total: this.totalAmount,
        paid: this.amountPaid,
        change: this.change
      });

      const datos: any = {
        total: this.totalAmount,
        paid: this.amountPaid,
        change: this.change
      }

      this.save.emit(datos)
    }
  }

  // Método para limpiar el formulario
  clearForm() {
    this.amountPaid = 0;
  }
}
