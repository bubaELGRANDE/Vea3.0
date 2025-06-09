import { Iuser } from "../../../core/interface/Iuser";

export interface IProductResponse {
    data: IProduct[];
    pagination: IPagination;
}

export interface IProduct {
    id: number;
    title: string;
    description: string;
    price: number;
    stock: number;
    seller: ISeller;
    status: IStatus;
    publishingCategories: IPublishingCategory[];
    images: IImage[];
}

export interface IPublishingCategory {
  id: number;           // id del enlace
  category: ICategory;  // categoría real
}

export interface ISeller {
    id: number;
    businessName: string;
    businessType: string;
    address: string;
    phone:string;
    user: Iuser;
    municipality: IMunicipality;
}


export interface IMunicipality {
    id: number;
    name: string;
    department: IDepartment;
}

export interface IDepartment {
    id: number;
    name: string;
    code: string;
}

export interface IStatus {
    id: number;
    name: string;
    description: string;
}

export interface ICategory {
    id: number;
    name: string;
    description: string;
    icon: string;
}

export interface IImage {
    id: number;
    url: string;
    alt: string;
}

export interface IPagination {
    page: number;
    limit: number;
    total: number;
    pages: number;
}