import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';

// Importar los servicios y las interfaces necesarias
import { MetricsService } from '../../../core/services/metrics.service';
import { IDashboardMetrics} from '../../../core/interface/IDashboardMetrics';
import { IMetricsSummary } from '../../../core/interface/IMetricsSummary';
import { IRecentOrder } from '../../../core/interface/IRecentOrder';
import { IRecentPublication } from '../../../core/interface/IRecentPublication';
@Component({
  selector: 'app-metricas',
  standalone: true,
  // Importamos los módulos necesarios para usar *ngIf, *ngFor, routerLink y los pipes de moneda y fecha
  imports: [CommonModule, RouterModule, CurrencyPipe, DatePipe],
  templateUrl: './metricas.component.html',
  styleUrls: ['./metricas.component.css']
})
export class MetricasComponent implements OnInit {

  // Propiedades para almacenar los datos del dashboard.
  // Las inicializamos con valores por defecto o como undefined.
  summary?: IMetricsSummary;
  recentOrders?: IRecentOrder[];
  recentPublications?: IRecentPublication[];

  // Banderas para controlar el estado de la carga de datos.
  isLoading: boolean = true;
  error: string | null = null;

  constructor(
    private metricsService: MetricsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Al iniciar el componente, llamamos al método para cargar los datos.
    this.loadDashboardData();
  }

  /**
   * Llama al servicio de métricas para obtener los datos del dashboard
   * y los asigna a las propiedades del componente.
   */
  loadDashboardData(): void {
    this.isLoading = true;
    this.error = null;

    this.metricsService.getDashboardMetrics().subscribe({
      next: (data: IDashboardMetrics) => {
        // Cuando la API responde con éxito, asignamos los datos.
        this.summary = data.summary;
        this.recentOrders = data.recentOrders;
        this.recentPublications = data.recentPublications;
        this.isLoading = false; // Dejamos de mostrar el indicador de carga.
      },
      error: (err) => {
        // Si la API falla, capturamos el error.
        console.error('Error al cargar las métricas del dashboard:', err);
        this.error = 'No se pudieron cargar los datos del dashboard. Por favor, intente de nuevo más tarde.';
        this.isLoading = false; // Dejamos de mostrar el indicador de carga.
      }
    });
  }

  // Métodos para manejar la navegación desde los botones "Ver detalle".
  viewOrderDetail(saleId: number): void {
    // Navega a la página de detalle de un pedido específico.
    this.router.navigate(['/private/order-detail', saleId]);
  }

  viewPostDetail(publicationId: number): void {
    // Navega a la página de detalle de una publicación específica.
    this.router.navigate(['/private/post-detail', publicationId]);
  }
}
