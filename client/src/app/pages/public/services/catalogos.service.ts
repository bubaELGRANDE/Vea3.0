import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { ICategory } from '../interface/IPublishing';

@Injectable({
  providedIn: 'root'
})
export class CatalogosService {

  private endpoint: string
  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.API_URL
    this.endpoint = '/catalogos';
  }

  getCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(`${this.apiUrl}${this.endpoint}/categories`)
  }
}
