import { Request, Response } from 'express';
import { MetricsService } from './metrics.service';

export class MetricsController {
    private metricsService: MetricsService;

    constructor() {
        this.metricsService = new MetricsService();
    }

    /**
     * Maneja la petición para obtener todas las métricas del dashboard.
     * @param req - El objeto de la petición HTTP.
     * @param res - El objeto de la respuesta HTTP.
     */
    async getMetrics(req: Request, res: Response): Promise<void> {
        try {
            // IMPORTANTE: El ID del vendedor debe obtenerse de forma segura,
            // generalmente desde un token de autenticación (JWT) que se valida
            // a través de un middleware.
            // Por ahora, para esta prueba, usaremos un valor fijo (hardcoded).
            // TODO: Reemplazar '1' con la lógica para extraer el sellerId del usuario autenticado.
            const sellerId = 1;

            if (!sellerId) {
                res.status(401).json({ message: 'No se pudo identificar al vendedor. Se requiere autenticación.' });
                return;
            }

            const metrics = await this.metricsService.getDashboardMetrics(sellerId);
            res.status(200).json(metrics);

        } catch (error: any) {
            console.error("Error en MetricsController:", error);
            res.status(500).json({ message: 'Error al obtener las métricas del dashboard.', error: error.message });
        }
    }
}
