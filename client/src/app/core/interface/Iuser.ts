export interface Iuser {
    id?: number,
    email: string,
    username: string,
    name: string,
    password?: string,
    img?: string,
    tokenVersion?: number,
    isActive?: boolean,
    create_at: Date,
    update_at: Date
} 