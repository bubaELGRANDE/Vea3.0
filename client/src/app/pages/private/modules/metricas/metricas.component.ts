import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { MetricsService } from '../../services/metrics.service';
import { IDashboardMetrics } from '../../interface/IDashboardMetrics';
import { IMetricsSummary } from '../../interface/IMetricsSummary';
import { IRecentOrder } from '../../interface/IRecentOrder';
import { IRecentPublication } from '../../interface/IRecentPublication';

@Component({
  selector: 'app-metricas',
  standalone: true,
  imports: [CommonModule, RouterModule, CurrencyPipe, DatePipe],
  templateUrl: './metricas.component.html',
  styleUrls: ['./metricas.component.css']
})
export class MetricasComponent implements OnInit {
  summary?: IMetricsSummary;
  recentOrders?: IRecentOrder[];
  recentPublications?: IRecentPublication[];

  isLoading = true;
  error: string | null = null;

  constructor(
    private metricsService: MetricsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.isLoading = true;
    this.error = null;

    this.metricsService.getDashboardMetrics().subscribe({
      next: (data: IDashboardMetrics) => {
        this.summary = data.summary;
        this.recentOrders = data.recentOrders;
        this.recentPublications = data.recentPublications;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al cargar las métricas del dashboard:', err);
        this.error = 'No se pudieron cargar los datos. Intenta nuevamente.';
        this.isLoading = false;
      }
    });
  }

  viewOrderDetail(saleId: number): void {
    this.router.navigate(['/pedidos', saleId]);
  }

  viewPostDetail(publicationId: number): void {
    this.router.navigate(['/publicaciones', publicationId]);
  }
}
