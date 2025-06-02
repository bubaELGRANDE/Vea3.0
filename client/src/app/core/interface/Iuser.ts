export interface Iuser{
    id?:number,
    email:string,
    name:string,
    lastname:string,
    password?:string,
    img?:string,
    tokenVersion?: number,
    isActive?:boolean,
    create_at:Date,
    update_at:Date
}