import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';
import { environment } from '../../../../environments/environment';

// Reutiliza las interfaces que ya creamos para las publicaciones
import { ICategory } from '../interface/ICategory';
import { IArticleStatus } from '../interface/IArticleStatus';

@Injectable({
  providedIn: 'root'
})
export class CatalogosService {
  private apiUrl = `${environment.apiUrl}`;

  // Usamos shareReplay para cachear las respuestas y no llamar a la API cada vez que se necesiten los catálogos.
  public categories$: Observable<ICategory[]>;
  public articleStatus$: Observable<IArticleStatus[]>;

  constructor(private http: HttpClient) {
    // Obtenemos los catálogos una vez y los dejamos disponibles para quien se suscriba.
    this.categories$ = this.http.get<ICategory[]>(`${this.apiUrl}/categories`).pipe(
      shareReplay(1)
    );

    this.articleStatus$ = this.http.get<IArticleStatus[]>(`${this.apiUrl}/article-status`).pipe(
      shareReplay(1)
    );
  }

  // Métodos explícitos por si prefieres llamarlos directamente en lugar de usar los Observables cacheados.
  getCategories(): Observable<ICategory[]> {
    return this.categories$;
  }

  getArticleStatus(): Observable<IArticleStatus[]> {
    return this.articleStatus$;
  }
}
