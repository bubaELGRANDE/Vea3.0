import { Component, OnInit } from '@angular/core';
import { OrderDetailService } from '../../../core/services/order.service';
import { IOrderDetail } from '../../../core/interface/order-detail/IOrderDetail';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  orderDetail$: Observable<IOrderDetail> | undefined;
  currentPage: number = 1;
  itemsPerPage: number = 1; // Mostrar 1 pedido por página
  totalItems: number = 10; // Total de pedidos (simulado, reemplazar con dato real)

  constructor(private orderDetailService: OrderDetailService) {}

  ngOnInit(): void {
    this.loadOrderDetail();
  }

  loadOrderDetail(): void {
    const orderId = this.getOrderIdForPage(this.currentPage);
    this.orderDetail$ = this.orderDetailService.getOrderDetail(orderId);
  }

  // Simula obtener el ID del pedido basado en la página
  getOrderIdForPage(page: number): number {
    // Lógica para mapear página a ID (ejemplo: ID = (page - 1) * itemsPerPage + 1)
    return (page - 1) * this.itemsPerPage + 1;
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadOrderDetail();
  }
}