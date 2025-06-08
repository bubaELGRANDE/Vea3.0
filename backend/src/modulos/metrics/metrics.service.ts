import { AppDataSource } from '../../core/confi/data-source';
import { Sales } from '../../core/entity/Sales';
import { Publishing } from '../../core/entity/Publishing';
import { Repository, MoreThanOrEqual } from 'typeorm';

// Definimos la estructura de la respuesta directamente aquí para claridad.
// Esta estructura debe coincidir con la interfaz IDashboardMetrics del frontend.
interface IMetricsSummary {
  monthlySales: number;
  pendingOrders: number;
  activePublications: number;
}
interface IRecentOrder {
  saleId: number;
  clientName: string;
  publicationTitle: string;
  amount: number;
  date: Date | string;
}
interface IRecentPublication {
  publicationId: number;
  title: string;
  date: Date | string;
}
interface IDashboardMetrics {
  summary: IMetricsSummary;
  recentOrders: IRecentOrder[];
  recentPublications: IRecentPublication[];
}


export class MetricsService {
    private salesRepository: Repository<Sales>;
    private publishingRepository: Repository<Publishing>;

    constructor() {
        this.salesRepository = AppDataSource.getRepository(Sales);
        this.publishingRepository = AppDataSource.getRepository(Publishing);
    }

    /**
     * Obtiene y calcula todas las métricas para el dashboard de un vendedor específico.
     * @param sellerId El ID del vendedor para el cual se calculan las métricas.
     * @returns Un objeto con el resumen, los pedidos recientes y las publicaciones recientes.
     */
    async getDashboardMetrics(sellerId: number): Promise<IDashboardMetrics> {
        // Ejecutamos todas las consultas en paralelo para mayor eficiencia
        const [
            summary,
            recentOrders,
            recentPublications
        ] = await Promise.all([
            this.getSummary(sellerId),
            this.getRecentOrders(sellerId),
            this.getRecentPublications(sellerId)
        ]);

        return {
            summary,
            recentOrders,
            recentPublications
        };
    }

    /**
     * Calcula las métricas de resumen para las tarjetas del dashboard.
     */
    private async getSummary(sellerId: number): Promise<IMetricsSummary> {
        const today = new Date();
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

        // 1. Calcular Ventas del Mes
        const salesData = await this.salesRepository.find({
            where: {
                publishing: { seller: { id: sellerId } },
                createdAt: MoreThanOrEqual(startOfMonth)
            },
            relations: ["publishing"]
        });
        const monthlySales = salesData.reduce((sum, sale) => sum + Number(sale.publishing.price), 0);

        // 2. Contar Pedidos Pendientes (ID de estado 'Pendiente' = 1)
        const pendingOrders = await this.salesRepository.count({
            where: {
                publishing: { seller: { id: sellerId } },
                status: { id: 1 } // ID para 'Pendiente' en tu tabla `sale_status`
            }
        });

        // 3. Contar Publicaciones Activas (ID de estado 'Activo' = 1)
        const activePublications = await this.publishingRepository.count({
            where: {
                seller: { id: sellerId },
                status: { id: 1 } // ID para 'Activo' en tu tabla `publishing_status`
            }
        });

        return {
            monthlySales: monthlySales,
            pendingOrders: pendingOrders,
            activePublications: activePublications
        };
    }

    /**
     * Obtiene los 5 pedidos más recientes para el vendedor.
     */
    private async getRecentOrders(sellerId: number): Promise<IRecentOrder[]> {
        const sales = await this.salesRepository.find({
            where: { publishing: { seller: { id: sellerId } } },
            relations: ["publishing", "buyer", "buyer.user"],
            order: { createdAt: 'DESC' },
            take: 5 // Limita la consulta a los últimos 5 resultados
        });

        // Mapeamos los datos de las entidades al formato de la interfaz IRecentOrder
        return sales.map(sale => ({
            saleId: sale.id,
            clientName: sale.buyer?.user?.name || 'Usuario no disponible',
            publicationTitle: sale.publishing?.title || 'Publicación no disponible',
            amount: sale.publishing?.price || 0,
            date: sale.createdAt
        }));
    }

    /**
     * Obtiene las 5 publicaciones más recientes del vendedor.
     */
    private async getRecentPublications(sellerId: number): Promise<IRecentPublication[]> {
        const publications = await this.publishingRepository.find({
            where: { seller: { id: sellerId } },
            order: { createdAt: 'DESC' },
            take: 5 // Limita la consulta a las últimas 5
        });

        // Mapeamos los datos de las entidades al formato de la interfaz IRecentPublication
        return publications.map(pub => ({
            publicationId: pub.id,
            title: pub.title,
            date: pub.createdAt
        }));
    }
}
