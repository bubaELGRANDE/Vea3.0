import { Iseller } from "./Iseller";

export interface Ipublishing {
    id?:number,
    seller: Iseller,
    title: string,
    article:string,
    status?:number,
    type:number,
    price:number,
    img?:string
}