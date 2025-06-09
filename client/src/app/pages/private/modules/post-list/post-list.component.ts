import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { forkJoin, of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

// Interfaces y Servicio
import { PublishingService } from '../../services/publishing.service';
import { IPublishing } from '../../interface/IPublishing';
import { IPostRowDisplay } from '../../interface/IPostRowDisplay';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, FormsModule],
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  allPosts: IPostRowDisplay[] = [];
  displayedPosts: IPostRowDisplay[] = [];
  isLoading: boolean = true;
  error: string | null = null;

  totalPostsCount: number = 0;
  activePostsCount: number = 0;
  inactivePostsCount: number = 0;
  todayPostsCount: number = 0; // Se mantiene pero no se usa en la UI actual

  readonly STATUS_ACTIVO = 'Activo';
  readonly STATUS_INACTIVO = 'Inactivo';
  readonly FILTER_ALL = null;

  activeStatusFilter: string | null = null;
  selectedDate: string = ''; // Para el ngModel del date picker

  constructor(
    private publishingService: PublishingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activeStatusFilter = this.FILTER_ALL;
    this.loadPublications();
  }

  loadPublications(): void {
    this.isLoading = true;
    this.error = null;

    this.publishingService.getPublications().pipe(
      switchMap((dataFromApi: IPublishing[]) => {
        if (!dataFromApi || dataFromApi.length === 0) {
          return of([]);
        }
        const postObservables = dataFromApi.map(post => {
          const categoryIds = post.categories?.map((c: any) => c.id) || [];
          const sku = this.getSkuFromDescriptions(post.descriptions);

          // Aseguramos que `createdAt` exista en el objeto post.
          // Si no existe, usamos una fecha por defecto o la actual.
          const createdAt = post.createdAt || new Date().toISOString();

          if (categoryIds.length === 0) {
            return of({
              publicationId: post.id,
              postName: post.title,
              tags: 'Sin etiquetas',
              sku: sku,
              price: post.price,
              statusText: post.status?.status || 'Desconocido',
              createdAt: createdAt
            } as IPostRowDisplay);
          }

          const categoryRequests = categoryIds.map(id =>
            this.publishingService.getCategoryById(id).pipe(
              catchError(() => of({ category: 'Categoría desconocida' }))
            )
          );

          return forkJoin(categoryRequests).pipe(
            map(categoryResponses => {
              const tagNames = categoryResponses.map(c => c.category).join(', ');
              return {
                publicationId: post.id,
                postName: post.title,
                tags: tagNames,
                sku: sku,
                price: post.price,
                statusText: post.status?.status || 'Desconocido',
                createdAt: createdAt
              } as IPostRowDisplay;
            })
          );
        });

        return forkJoin(postObservables);
      })
    ).subscribe({
      next: (finalPosts: IPostRowDisplay[]) => {
        this.allPosts = finalPosts;
        this.calculateStatusCounts();
        this.applyFilters(); // Aplicar filtros iniciales
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al cargar publicaciones con categorías:', err);
        this.error = 'No se pudieron cargar las publicaciones.';
        this.isLoading = false;
        this.allPosts = [];
        this.calculateStatusCounts();
        this.applyFilters();
      }
    });
  }

  private getSkuFromDescriptions(descriptions: any[]): string {
    if (!Array.isArray(descriptions)) {
      return 'Sin SKU';
    }
    for (const desc of descriptions) {
      if (desc?.sku && typeof desc.sku === 'string' && desc.sku.trim() !== '') {
        return desc.sku.trim();
      }
    }
    return 'Sin SKU';
  }

  private calculateStatusCounts(): void {
    if (!this.allPosts) {
      this.totalPostsCount = 0;
      this.activePostsCount = 0;
      this.inactivePostsCount = 0;
      return;
    }
    this.totalPostsCount = this.allPosts.length;
    this.activePostsCount = this.allPosts.filter(p => p.statusText === this.STATUS_ACTIVO).length;
    this.inactivePostsCount = this.allPosts.filter(p => p.statusText === this.STATUS_INACTIVO).length;
  }
  
  applyStatusFilter(status: string | null): void {
      this.activeStatusFilter = status;
      this.applyFilters();
  }
  
  clearDateFilter(): void {
      this.selectedDate = '';
      this.applyFilters();
  }

  applyFilters(): void {
    let filteredPosts = [...this.allPosts];

    // 1. Filtrar por estado (Activo, Inactivo, o Todos)
    if (this.activeStatusFilter) {
      filteredPosts = filteredPosts.filter(p => p.statusText === this.activeStatusFilter);
    }

    // 2. Filtrar por fecha (si hay una seleccionada)
    if (this.selectedDate) {
      filteredPosts = filteredPosts.filter(p => {
        if (!p.createdAt) return false;
        // Normaliza la fecha de la publicación a 'YYYY-MM-DD' para comparar
        const postDate = new Date(p.createdAt).toISOString().split('T')[0];
        return postDate === this.selectedDate;
      });
    }

    this.displayedPosts = filteredPosts;
  }

  viewPost(id: number): void {
    this.router.navigate(['/private/post-detail', id]);
  }

  editPost(id: number): void {
    this.router.navigate(['/private/add-post', id]);
  }

  deletePost(id: number): void {
    console.log(`Eliminar publicación con ID: ${id}`);
    // Aquí podrías llamar a this.publishingService.deletePublication(id)
  }
}