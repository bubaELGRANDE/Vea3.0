import { Request, Response } from 'express';
import { ProductService } from './productos.service';
import { CreateProductDto, UpdateProductDto } from './productos.model';
import { AppDataSource } from '../../core/confi/data-source';
import { Publishing } from '../../core/entity/Publishing';
import { PublishingStatus } from '../../core/entity/PublishingStatus';
import { Sellers } from '../../core/entity/Sellers';
import { Categories } from '../../core/entity/Categories';
import { PublishingCategories } from '../../core/entity/PublishingCategories';

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
            categoriesRepository,
            publishingCategoriesRepository
        );
    }

    async createProduct(req: Request, res: Response): Promise<void> {
        try {
            const createProductDto: CreateProductDto = req.body;
            const product = await this.productService.createProduct(createProductDto);
            res.status(201).json(product);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async getProducts(req: Request, res: Response): Promise<void> {
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
    }

    async updateProduct(req: Request, res: Response): Promise<void> {
        try {
            const productId = parseInt(req.params.id, 10);
            const updateProductDto: UpdateProductDto = req.body;
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

    async deleteProduct(req: Request, res: Response): Promise<void> {
        try {
            const productId = parseInt(req.params.id, 10);
            await this.productService.deleteProduct(productId);
            res.status(204).send();
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}
