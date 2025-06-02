import { Iuser } from "../../../core/interface/Iuser";

export interface Iseller{
    id?: number,
    user:Iuser,
    municipio_id?:number
    direction?:string,
    phone?: string,
    score?:number
}