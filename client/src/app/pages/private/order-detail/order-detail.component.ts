// order-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../../core/services/order.service';
import { IOrderDetail } from '../../../core/interface/IOrderDetail';
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss'],
  imports: [
    CommonModule,  // Asegúrate de que esté aquí
    // otros módulos...
  ],
  
})
export class OrderDetailComponent implements OnInit {
  order$!: Observable<IOrderDetail | null>;
  loading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.order$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = Number(params.get('id'));
        if (isNaN(id)) {
          this.error = 'ID de pedido inválido';
          this.loading = false;
          return of(null);
        }
        return this.orderService.getOrderById(id).pipe(
          catchError(err => {
            this.error = 'Error al cargar el pedido: ' + err.message;
            this.loading = false;
            return of(null);
          })
        );
      })
    );

    this.order$.subscribe(() => {
      this.loading = false;
    });
  }
}