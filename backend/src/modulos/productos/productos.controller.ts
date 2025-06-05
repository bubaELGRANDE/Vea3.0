import { Request, Response } from 'express';
import { ProductService } from './productos.service';
import { CreateProductDto, UpdateProductDto } from './productos.model';
import { AppDataSource } from '../../core/confi/data-source';
import { Publishing } from '../../core/entity/Publishing';
import { PublishingStatus } from '../../core/entity/PublishingStatus';
import { Sellers } from '../../core/entity/Sellers';
import { Categories } from '../../core/entity/Categories';
import { PublishingCategories } from '../../core/entity/PublishingCategories';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

export class ProductController {
    private readonly productService: ProductService;

    constructor() {
        const publishingRepository = AppDataSource.getRepository(Publishing);
        const publishingStatusRepository = AppDataSource.getRepository(PublishingStatus);
        const sellersRepository = AppDataSource.getRepository(Sellers);
        const categoriesRepository = AppDataSource.getRepository(Categories);
        const publishingCategoriesRepository = AppDataSource.getRepository(PublishingCategories);
        this.productService = new ProductService(
            publishingRepository,
            publishingStatusRepository,
            sellersRepository,
        );
    }    async createProduct(req: Request, res: Response): Promise<void> {
        try {
            const createProductDto = plainToClass(CreateProductDto, req.body);
            const errors = await validate(createProductDto);
            if (errors.length > 0) {
                res.status(400).json({ message: 'Validación fallida', errors });
                return;
            }
            const product = await this.productService.createProduct(createProductDto);
            res.status(201).json(product);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async getProducts(res: Response): Promise<void> {
        try {
            const products = await this.productService.getProducts();
            res.status(200).json(products);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async getProductById(req: Request, res: Response): Promise<void> {
        try {
            const productId = parseInt(req.params.id, 10);
            const product = await this.productService.getProductById(productId);
            if (product) {
                res.status(200).json(product);
            } else {
                res.status(404).json({ message: 'Product not found' });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }    async updateProduct(req: Request, res: Response): Promise<void> {
        try {
            const productId = parseInt(req.params.id, 10);
            const updateProductDto = plainToClass(UpdateProductDto, req.body);
            const errors = await validate(updateProductDto);
            if (errors.length > 0) {
                res.status(400).json({ message: 'Validación fallida', errors });
                return;
            }
            const product = await this.productService.updateProduct(productId, updateProductDto);
            if (product) {
                res.status(200).json(product);
            } else {
                res.status(404).json({ message: 'Product not found' });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async getProductsBySellerID(req: Request, res: Response): Promise<void> {
        try {
            const sellerId = parseInt(req.params.id, 10);
            const products = await this.productService.getProductBySellerId(sellerId);
            res.status(200).json(products);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
    
    async deleteProduct(req: Request, res: Response): Promise<void> {
        try {
            const productId = parseInt(req.params.id, 10);
            const result = await this.productService.deleteProduct(productId);
            if (result.affected && result.affected > 0) {
                res.status(200).json({ message: 'Producto eliminado con éxito' });
            } else {
                res.status(404).json({ message: 'Producto no encontrado o ya eliminado' });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

}
