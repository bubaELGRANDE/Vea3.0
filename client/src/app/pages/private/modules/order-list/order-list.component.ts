import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../services/order.service';
import { IOrder } from '../../interface/IOrder';
import { IOrderRowDisplay } from '../../interface/IOrderRowDisplay';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, FormsModule],
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  allOrders: IOrderRowDisplay[] = [];
  displayedOrders: IOrderRowDisplay[] = [];
  isLoading: boolean = true;
  error: string | null = null;

  // Contadores de estado
  pendingOrdersCount: number = 0;
  confirmedOrdersCount: number = 0;
  sentOrdersCount: number = 0;
  deliveredOrdersCount: number = 0;
  cancelledOrdersCount: number = 0;
  todayCount: number = 0;
  totalOrdersCount: number = 0;

  // Nombres de estado EXACTOS según la API y para los filtros
  readonly STATUS_PENDIENTE = 'Pendiente';
  readonly STATUS_CONFIRMADA = 'Confirmada';
  readonly STATUS_ENVIADA = 'Enviada';
  readonly STATUS_ENTREGADA = 'Entregada';
  readonly STATUS_CANCELADA = 'Cancelada';
  readonly FILTER_TODAY = 'HOY';
  readonly FILTER_SPECIFIC_DATE = 'SPECIFIC_DATE';
  readonly FILTER_ALL = null;

  activeFilter: string | null = null;
  selectedDateInput: string = '';
  activeSpecificDateFilter: string | null = null;

  // Referencia al input del date picker
  @ViewChild('datePickerInput') datePickerInput!: ElementRef<HTMLInputElement>;

  constructor(
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activeFilter = this.FILTER_ALL;
    this.loadOrders();
  }

  loadOrders(): void {
    this.isLoading = true;
    this.error = null;
    this.orderService.getOrders().subscribe({
      next: (dataFromApi: IOrder[]) => {
        this.allOrders = dataFromApi.map(order => {
          let dateTimeStr = 'Fecha no disponible';
          if (order.createdAt) {
            try {
              dateTimeStr = new Date(order.createdAt).toISOString().slice(0, 16).replace('T', ' ');
            } catch (e) {
              console.error('Error al formatear fecha para orden:', order.id, order.createdAt, e);
            }
          }
          // Nueva lógica
          const shippingAddress = order.buyer?.direction || 'Dirección no disponible';
          const amount = order.publishing?.price || 0;
          const statusText = order.status?.status || 'N/A';
          return {
            orderNumber: order.id,
            dateTime: dateTimeStr,
            clientName: order.buyer?.user?.name || 'N/A',
            shippingAddress: shippingAddress,
            amount: amount,
            statusText: statusText,
            saleId: order.id
          };
        });
        this.calculateStatusCounts();
        this.applyFilter(this.activeFilter);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al cargar órdenes:', err);
        this.error = 'No se pudieron cargar las órdenes. Intente más tarde.';
        this.isLoading = false;
        this.allOrders = [];
        this.calculateStatusCounts();
        this.applyFilter(this.activeFilter);
      }
    });
  }

  private calculateStatusCounts(): void {
    if (!this.allOrders || this.allOrders.length === 0) {
      this.totalOrdersCount = 0;
      this.pendingOrdersCount = 0;
      this.confirmedOrdersCount = 0;
      this.sentOrdersCount = 0;
      this.deliveredOrdersCount = 0;
      this.cancelledOrdersCount = 0;
      this.todayCount = 0;
      return;
    }
    this.totalOrdersCount = this.allOrders.length;
    this.pendingOrdersCount = this.allOrders.filter(order => order.statusText === this.STATUS_PENDIENTE).length;
    this.confirmedOrdersCount = this.allOrders.filter(order => order.statusText === this.STATUS_CONFIRMADA).length;
    this.sentOrdersCount = this.allOrders.filter(order => order.statusText === this.STATUS_ENVIADA).length;
    this.deliveredOrdersCount = this.allOrders.filter(order => order.statusText === this.STATUS_ENTREGADA).length;
    this.cancelledOrdersCount = this.allOrders.filter(order => order.statusText === this.STATUS_CANCELADA).length;

    const today = new Date();
    const todayDateString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    this.todayCount = this.allOrders.filter(order => {
      if (order.dateTime && order.dateTime !== 'Fecha no disponible') {
        const orderDatePart = order.dateTime.substring(0, 10);
        return orderDatePart === todayDateString;
      }
      return false;
    }).length;
  }

  applyFilter(filterType: string | null): void {
    this.activeFilter = filterType;
    // Limpiar el filtro de fecha específica si se selecciona un filtro de estado o "Principal" o "Hoy"
    if (filterType !== this.FILTER_SPECIFIC_DATE) {
      this.activeSpecificDateFilter = null;
    }

    if (filterType === this.FILTER_ALL) {
      this.displayedOrders = [...this.allOrders];
    } else if (filterType === this.FILTER_TODAY) {
      const today = new Date();
      const todayDateString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
      this.displayedOrders = this.allOrders.filter(order => {
        if (order.dateTime && order.dateTime !== 'Fecha no disponible') {
          const orderDatePart = order.dateTime.substring(0, 10);
          return orderDatePart === todayDateString;
        }
        return false;
      });
    } else if (filterType === this.FILTER_SPECIFIC_DATE) {
      if (this.activeSpecificDateFilter) {
        this.displayedOrders = this.allOrders.filter(order => {
          if (order.dateTime && order.dateTime !== 'Fecha no disponible') {
            const orderDatePart = order.dateTime.substring(0, 10);
            return orderDatePart === this.activeSpecificDateFilter;
          }
          return false;
        });
      } else {
        this.displayedOrders = [...this.allOrders];
      }
    } else if (filterType) {
      this.displayedOrders = this.allOrders.filter(order => order.statusText === filterType);
    } else {
      this.displayedOrders = [...this.allOrders];
    }
  }

  filterBySpecificDate(): void {
    if (!this.selectedDateInput) {
      this.clearSpecificDateFilter();
      return;
    }
    this.activeSpecificDateFilter = this.selectedDateInput;
    this.applyFilter(this.FILTER_SPECIFIC_DATE);
  }

  clearSpecificDateFilter(): void {
    this.selectedDateInput = '';
    this.activeSpecificDateFilter = null;
    this.applyFilter(this.FILTER_ALL);
  }

  viewOrderDetails(saleId: number): void {
    this.router.navigate(['/dashboard/orders', saleId]);
  }

  // Método para abrir el date picker
  openDatePicker(): void {
    if (this.datePickerInput) {
      this.datePickerInput.nativeElement.showPicker(); // Abre el selector de fecha nativo
      this.datePickerInput.nativeElement.focus(); // Asegura que el input esté enfocado
    }
  }
}