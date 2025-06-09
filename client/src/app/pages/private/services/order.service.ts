// src/app/core/services/order.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment'; // Ajusta la ruta si es necesario
import { IOrder } from '../interface/IOrder'; // Asegúrate que la ruta a tu interfaz IOrder sea correcta
import { IOrderDetail } from '../interface/IOrderDetail';
// Si tienes DTOs para paginación en el front, impórtalos también.
// import { PaginationDto } from '../dtos/pagination.dto';


@Injectable({
  providedIn: 'root'
})
export class OrderService {
private apiUrl = `${environment.apiUrl}/sales`; // Endpoint para ventas/órdenes

constructor(private http: HttpClient) { }

/**
 * Obtiene una lista de pedidos, con soporte opcional para paginación.
 * @param paginationOptions Opcional: objeto con page, limit, etc.
 * @returns Un Observable con un arreglo de IOrder.
 */
getOrders(paginationOptions?: { page?: number; limit?: number }): Observable<IOrder[]> {
  let params = new HttpParams();

  if (paginationOptions) {
    if (paginationOptions.page !== undefined) {
      params = params.append('page', paginationOptions.page.toString());
    }
    if (paginationOptions.limit !== undefined) {
      params = params.append('limit', paginationOptions.limit.toString());
    }
  }

  return this.http.get<IOrder[]>(this.apiUrl, { params });
}

/**
 * Obtiene los detalles completos de un único pedido por su ID.
 * @param id El ID del pedido que se quiere obtener.
 * @returns Un Observable con un objeto que cumple la interfaz IOrderDetail.
 */
getOrderById(id: number): Observable<IOrderDetail> {
  const url = `${this.apiUrl}/${id}`;
  return this.http.get<IOrderDetail>(url);
}

}
