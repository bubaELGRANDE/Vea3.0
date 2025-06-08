// sales-service-detail.ts
import { AppDataSource } from '../../core/confi/data-source';
import { Sales } from '../../core/entity/Sales';
import { Repository } from 'typeorm';

// Interfaz que define la estructura de la respuesta para el detalle del pedido
// Coincide con IOrderDetail del frontend
interface MappedOrderDetail {
    orderId: number;
    orderDate: Date | string;
    orderStatus: string;
    shippingAddress: {
        name: string;
        phone: string;
        fullAddress: string;
    };
    product: {
        id: number;
        title: string;
        price: number;
        mainImageUrl?: string;
    };
    customer: {
        id: number;
        name: string;
        avatarUrl?: string;
        email: string;
        phone: string;
    };
    payment: {
        totalAmount: number;
        paymentMethod?: string;
        transactionId?: string;
        status?: string;
    };
}

export class SalesServiceDetail {
    private salesRepository: Repository<Sales>;

    constructor() {
        this.salesRepository = AppDataSource.getRepository(Sales);
    }

    /**
     * Obtiene el detalle completo de una venta por su ID
     * y mapea el resultado a la estructura que espera el frontend.
     * @param id El ID de la venta a buscar.
     * @returns Un objeto con el detalle completo del pedido o null si no se encuentra.
     */
    async getSaleById(id: number): Promise<MappedOrderDetail | null> {
        const sale = await this.salesRepository.findOne({
            where: { id },
            relations: [
                'status',
                'publishing',
                'publishing.images',
                'buyer',
                'buyer.user',
                'payloads'
            ],
        });

        if (!sale) {
            return null;
        }

        // Mapeamos la entidad 'sale' a la estructura limpia 'MappedOrderDetail'
        const orderDetail: MappedOrderDetail = {
            orderId: sale.id,
            orderDate: sale.createdAt,
            orderStatus: sale.status?.status || 'No especificado',
            
            product: {
                id: sale.publishing?.id,
                title: sale.publishing?.title || 'Producto no disponible',
                price: Number(sale.publishing?.price) || 0,
                mainImageUrl: sale.publishing?.images?.[0]?.url || 'https://placehold.co/400x400/E0E0E0/777?text=Sin+Imagen'
            },
            
            customer: {
                id: sale.buyer?.user?.id,
                name: sale.buyer?.user?.name || 'Cliente no disponible',
                avatarUrl: sale.buyer?.user?.img || `https://placehold.co/100x100/E0E0E0/777?text=${sale.buyer?.user?.name?.charAt(0) || 'U'}`,
                email: sale.buyer?.user?.email || 'No disponible',
                phone: sale.buyer?.phone || 'No disponible'
            },

            shippingAddress: {
                name: sale.buyer?.user?.name || 'No disponible',
                phone: sale.buyer?.phone || 'No disponible',
                fullAddress: sale.buyer?.direction || 'Dirección no proporcionada'
            },
            
            payment: {
                totalAmount: Number(sale.payloads?.[0]?.amount) || Number(sale.publishing?.price) || 0,
                paymentMethod: sale.payloads?.[0]?.payment_method || 'No especificado',
                transactionId: sale.payloads?.[0]?.transaction_id || 'No disponible',
                status: sale.payloads?.[0]?.payment_status || 'No disponible'
            }
        };

        return orderDetail;
    }
}