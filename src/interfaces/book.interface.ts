export interface IBook {
    id: number,
    title: string,
    author: string,
    isbn?: string,
    genre: string,
    language: string,
    cover_url: string,
    description: string,
    ouwner_id: number,
    status: 'available' | 'borrowed' | 'inactive'
    created_at: Date,
    created_by: number
}