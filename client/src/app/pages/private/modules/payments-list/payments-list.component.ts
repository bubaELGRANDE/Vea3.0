import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Importa tus interfaces y el servicio
import { PaymentService } from '../../services/payment.service';
import { IPaymentRowDisplay } from '../../interface/IPaymentRowDisplay';
import { IPayment } from '../../interface/IPayment';

@Component({
  selector: 'app-payments-list',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, FormsModule, DatePipe],
  templateUrl: './payments-list.component.html',
  styleUrls: ['./payments-list.component.css']
})
export class PaymentsListComponent implements OnInit {
  // --- Propiedades para los datos ---
  allPayments: IPaymentRowDisplay[] = [];
  displayedPayments: IPaymentRowDisplay[] = [];
  isLoading: boolean = true;
  error: string | null = null;

  // --- Propiedades para los contadores ---
  totalCount: number = 0;
  pendingCount: number = 0;
  confirmedCount: number = 0;
  cancelledCount: number = 0;
  todayCount: number = 0;

  // --- Constantes para los filtros ---
  readonly STATUS_PENDIENTE = 'Pendiente';
  readonly STATUS_CONFIRMADO = 'Confirmada';
  readonly STATUS_CANCELADO = 'Cancelada';
  readonly FILTER_TODAY = 'HOY';
  readonly FILTER_SPECIFIC_DATE = 'SPECIFIC_DATE';
  readonly FILTER_ALL = null;

  activeFilter: string | null = null;
  selectedDateInput: string = '';
  activeSpecificDateFilter: string | null = null;

  @ViewChild('datePickerInputRef') datePickerInput!: ElementRef<HTMLInputElement>;

  constructor(
    private paymentService: PaymentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activeFilter = this.FILTER_ALL;
    this.loadPayments();
  }

  loadPayments(): void {
    this.isLoading = true;
    this.error = null;
    this.paymentService.getPayments().subscribe({
      next: (dataFromApi: IPayment[]) => {
        this.allPayments = dataFromApi.map(payment => ({
          paymentId: payment.id,
          clientName: payment.sale?.buyer?.user?.name || 'N/A',
          publicationName: payment.sale?.publishing?.title || 'N/A',
          amount: payment.amount,
          status: payment.payment_status || 'Desconocido',
          date: new Date(payment.payment_date).toLocaleDateString('es-ES', { timeZone: 'America/El_Salvador' }),
          rawDate: payment.payment_date
        }));
        this.calculateStatusCounts();
        this.applyFilter(this.activeFilter);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al cargar los pagos:', err);
        this.error = 'No se pudieron cargar los pagos.';
        this.isLoading = false;
      }
    });
  }

  private calculateStatusCounts(): void {
    this.totalCount = this.allPayments.length;
    this.pendingCount = this.allPayments.filter(p => p.status === this.STATUS_PENDIENTE).length;
    this.confirmedCount = this.allPayments.filter(p => p.status === this.STATUS_CONFIRMADO).length;
    this.cancelledCount = this.allPayments.filter(p => p.status === this.STATUS_CANCELADO).length;

    const today = new Date().toISOString().substring(0, 10);
    this.todayCount = this.allPayments.filter(p => p.rawDate && new Date(p.rawDate).toISOString().substring(0, 10) === today).length;
  }

  applyFilter(filterType: string | null): void {
    this.activeFilter = filterType;

    if (filterType !== this.FILTER_SPECIFIC_DATE) {
      this.activeSpecificDateFilter = null;
      this.selectedDateInput = '';
    }

    if (filterType === this.FILTER_ALL) {
      this.displayedPayments = [...this.allPayments];
    } else if (filterType === this.FILTER_TODAY) {
      const today = new Date().toISOString().substring(0, 10);
      this.displayedPayments = this.allPayments.filter(p =>
        p.rawDate && new Date(p.rawDate).toISOString().substring(0, 10) === today
      );
    } else if (filterType === this.FILTER_SPECIFIC_DATE) {
      if (this.activeSpecificDateFilter) {
        this.displayedPayments = this.allPayments.filter(p =>
          p.rawDate && new Date(p.rawDate).toISOString().substring(0, 10) === this.activeSpecificDateFilter
        );
      } else {
        this.displayedPayments = [...this.allPayments];
      }
    } else if (filterType) {
      this.displayedPayments = this.allPayments.filter(p => p.status === filterType);
    } else {
      this.displayedPayments = [...this.allPayments];
    }
  }

  triggerDateInput(): void {
    this.activeFilter = this.FILTER_SPECIFIC_DATE;
    setTimeout(() => {
      this.datePickerInput?.nativeElement?.click();
    });
  }

  filterBySpecificDate(): void {
    if (this.selectedDateInput) {
      this.activeSpecificDateFilter = this.selectedDateInput;
      this.applyFilter(this.FILTER_SPECIFIC_DATE);
    }
  }

  clearSpecificDateFilter(): void {
    this.activeSpecificDateFilter = null;
    this.selectedDateInput = '';
    this.applyFilter(this.FILTER_ALL);
  }

  viewPaymentDetails(paymentId: string): void {
    this.router.navigate(['/detalle-pago', paymentId]);
  }
}
