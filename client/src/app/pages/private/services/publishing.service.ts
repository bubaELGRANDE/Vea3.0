import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

// Importa el DTO del frontend que creamos.
import { CreatePublishingDto } from '../../../core/dto/publishing.dto';
// Importa la interfaz principal de la publicación.
import { IPublishing } from '../interface/IPublishing';

@Injectable({
  providedIn: 'root'
})
export class PublishingService {
  // Base URL para publicaciones
  private apiUrl = `${environment.apiUrl}/products`;

  // Base URL para categorías
  private categoryUrl = `${environment.apiUrl}/categories`;

  constructor(private http: HttpClient) {}

  /**
   * Envía los datos de una nueva publicación a la API del backend.
   * @param data El objeto con los datos de la publicación, que coincide con CreatePublishingDto.
   * @returns Un Observable con la publicación recién creada desde el backend.
   */
  createPublication(data: CreatePublishingDto): Observable<IPublishing> {
    return this.http.post<IPublishing>(this.apiUrl, data);
  }

  /**
   * Obtiene la lista de todas las publicaciones.
   * Si se pasan opciones de paginación, se usan como parámetros.
   * @param paginationOptions Parámetros opcionales como { page, limit }.
   */
  getPublications(paginationOptions?: { page?: number; limit?: number }): Observable<IPublishing[]> {
    let params = new HttpParams();

    if (paginationOptions) {
      if (paginationOptions.page !== undefined) {
        params = params.append('page', paginationOptions.page.toString());
      }
      if (paginationOptions.limit !== undefined) {
        params = params.append('limit', paginationOptions.limit.toString());
      }
      // Aquí puedes agregar más filtros si los necesitas.
    }

    return this.http.get<IPublishing[]>(this.apiUrl, { params });
  }

  /**
   * Obtiene una categoría por su ID.
   * @param id El ID de la categoría.
   * @returns Un Observable con los datos de la categoría.
   */
  getCategoryById(id: number): Observable<any> {
    return this.http.get<any>(`${this.categoryUrl}/${id}`);
  }

  // 🚧 Próximamente podrías agregar estos métodos:
  // getPublicationById(id: number): Observable<IPublishing> { ... }
  // updatePublication(id: number, data: UpdatePublishingDto): Observable<IPublishing> { ... }
  // deletePublication(id: number): Observable<any> { ... }
}
