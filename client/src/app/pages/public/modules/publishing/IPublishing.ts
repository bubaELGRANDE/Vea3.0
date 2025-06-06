import { Iuser } from "../../../../core/interface/Iuser";

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
    categories: ICategory[];
    images: IImage[];
}

export interface ISeller {
    id: number;
    businessName: string;
    businessType: string;
    address: string;
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