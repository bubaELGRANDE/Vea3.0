import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { IapieResponse } from '../../../core/interface/IapiResponse';
import { Iuser } from '../../../core/interface/Iuser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private endpoint: string
  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.API_URL
    this.endpoint = '/auth';
  }

  register(user: Iuser): Observable<IapieResponse> {
    return this.http.post<IapieResponse>(`${this.apiUrl}${this.endpoint}/register`, user)
  }

  login(user: Iuser):  Observable<IapieResponse>{
    return this.http.post<IapieResponse>(`${this.apiUrl}${this.endpoint}/login`, user)
  }

  refreshToken(user: Iuser) {
    return this.http.post<IapieResponse>(`${this.endpoint}${this.apiUrl}/login`, user)
  }

  logout(user: Iuser) {
    return this.http.post<IapieResponse>(`${this.endpoint}${this.apiUrl}/login`, user)
  }

}
