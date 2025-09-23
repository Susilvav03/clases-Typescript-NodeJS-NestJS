export interface IUser {
    id: number,
    name: string,
    last_name: string,
    email: string,
    password_hash: string,
    phone?: string,
    address: string,
    role: 'admin' | 'user',
    created_at: Date,
    updated_at: Date
}