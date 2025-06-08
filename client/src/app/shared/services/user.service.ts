import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { IapieResponse } from '../../core/interface/IapiResponse';
import { Iuser } from '../../core/interface/Iuser';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private endpoint: string
  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.API_URL
    this.endpoint = '/users';
  }

  update(user:Iuser,id: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}${this.endpoint}/${id}`,user)
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${this.endpoint}/${id}`)
  }
}
