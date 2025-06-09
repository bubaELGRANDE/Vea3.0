import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

// Importa la interfaz principal que modela la respuesta de la API del dashboard.
// Asegúrate de que la ruta sea correcta.
import { IDashboardMetrics } from '../interface/IDashboardMetrics';

@Injectable({
  providedIn: 'root'
})
export class MetricsService {
  // La URL base para el nuevo endpoint de métricas.
  private apiUrl = `${environment.apiUrl}/metrics`;

  constructor(private http: HttpClient) { }

  /**
   * Obtiene el objeto completo con todas las métricas y listas para el dashboard.
   * El backend se encarga de calcular y agregar todos los datos necesarios.
   * @returns Un Observable que emitirá un objeto con la estructura de IDashboardMetrics.
   */
  getDashboardMetrics(): Observable<IDashboardMetrics> {
    // Realiza una única petición GET al endpoint /api/metrics.
    // Se espera que la respuesta del backend coincida exactamente
    // con la estructura de nuestra interfaz IDashboardMetrics.
    return this.http.get<IDashboardMetrics>(this.apiUrl);
  }
}
