import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

export interface Isale {
  id?:number,
  publishingId:number,
  buyerId:number,
  statusId:number
}

@Injectable({
  providedIn: 'root'
})
export class PayloadService {

  private endpoint: string
  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.API_URL
    this.endpoint = '/sales';
  }

  createSale(sale:Isale): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}${this.endpoint}/`,sale)
  }
}
