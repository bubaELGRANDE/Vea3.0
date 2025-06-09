import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment.development';
import { IapieResponse } from '../../core/interface/IapiResponse';
import { Ibuyer } from '../../core/interface/IIbuyer';

@Injectable({
  providedIn: 'root'
})
export class BuyerService {
  private endpoint: string
  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.API_URL
    this.endpoint = '/buyers';
  }

  register(buyer: Ibuyer): Observable<IapieResponse> {
    return this.http.post<IapieResponse>(`${this.apiUrl}${this.endpoint}`, buyer)
  }

  registerSeller(buyer: any): Observable<IapieResponse> {
    return this.http.post<IapieResponse>(`${this.apiUrl}/seller`, buyer)
  }

  getById(id: number): Observable<IapieResponse> {
    return this.http.get<IapieResponse>(`${this.apiUrl}${this.endpoint}/${id}`)
  }

  getByIdUser(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${this.endpoint}/user/${id}`)
  }

}