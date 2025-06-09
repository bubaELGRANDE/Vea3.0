import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { ICategory, IProduct } from '../interface/IPublishing';

@Injectable({
  providedIn: 'root'
})
export class PublishingService {

  private endpoint: string
  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.API_URL
    this.endpoint = '/products';
  }

  getAll(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.apiUrl}${this.endpoint}/allinfo`)
  }

  getById(id:number): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.apiUrl}${this.endpoint}/${id}`)
  }
}
