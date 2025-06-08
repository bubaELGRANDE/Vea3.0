import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api/api.service';
import { routes } from '../api/endpoints';
import { IOrderDetail } from '../interface/order-detail/IOrderDetail';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailService {
  constructor(private apiService: ApiService) {}

  // Método para obtener los detalles de una orden por ID
  getOrderDetail(orderId: number): Observable<IOrderDetail> {
    // Usar ApiService para llamar a la API con el endpoint de ventas
    return this.apiService.get<IOrderDetail>(routes.updateSale, { id: orderId });
  }
}