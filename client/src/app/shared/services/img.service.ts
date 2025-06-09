import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImgService {
  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.API_URL
  }

  getAll(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/files/`)
  }
  getByName(name: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/files/${name}`)
  }

  saveOne(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(`${this.apiUrl}/upload`, formData);
  }

  saveMulti(file: File[]): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/upload-multiple/`, file)
  }
}
