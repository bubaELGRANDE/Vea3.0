import { IMetricsSummary } from './IMetricsSummary';
import { IRecentOrder } from './IRecentOrder';
import { IRecentPublication } from './IRecentPublication';

export interface IDashboardMetrics {
  summary: IMetricsSummary;
  recentOrders: IRecentOrder[];
  recentPublications: IRecentPublication[];
}