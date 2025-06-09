import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment'; // Asegúrate que la ruta sea correcta

// Importa la interfaz principal para los pagos desde tu archivo de interfaces
import { IPayment } from '../interface/IPayment'; 

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  // La URL base para el endpoint de pagos (payloads).
  // Ajusta 'payload' si el endpoint en tu backend se llama diferente (ej. 'payments').
  private apiUrl = `${environment.apiUrl}/payload`;

  constructor(private http: HttpClient) { }

  /**
   * Obtiene una lista de pagos desde la API.
   * La API debe devolver los pagos con sus relaciones anidadas (sale, buyer, user, publishing).
   * @param paginationOptions Opciones para la paginación (ej. { page: 1, limit: 10 }).
   * @returns Un Observable con un array de objetos IPayment.
   */
  getPayments(paginationOptions?: any): Observable<IPayment[]> {
    let params = new HttpParams();

    // Lógica para añadir parámetros de paginación si se proporcionan
    if (paginationOptions) {
      if (paginationOptions.page) {
        params = params.append('page', paginationOptions.page.toString());
      }
      if (paginationOptions.limit) {
        params = params.append('limit', paginationOptions.limit.toString());
      }
      // Aquí se podrían añadir más filtros en el futuro (ej. por estado o fecha).
    }

    // Se espera que la API devuelva un array de pagos que coincida con la interfaz IPayment.
    return this.http.get<IPayment[]>(this.apiUrl, { params });
  }

  /**
   * Obtiene un único pago por su ID.
   * @param id El ID del pago a obtener.
   * @returns Un Observable con un objeto IPayment.
   */
  getPaymentById(id: number | string): Observable<IPayment> {
    return this.http.get<IPayment>(`${this.apiUrl}/${id}`);
  }

  // --- Métodos Adicionales (Placeholders) ---
  // Estos métodos serían útiles en el futuro para gestionar pagos.
  
  // createPayment(data: any): Observable<IPayment> {
  //   return this.http.post<IPayment>(this.apiUrl, data);
  // }
  
  // updatePaymentStatus(id: number, status: string): Observable<IPayment> {
  //   return this.http.patch<IPayment>(`${this.apiUrl}/${id}`, { payment_status: status });
  // }
}
