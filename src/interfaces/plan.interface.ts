export interface IPlan {
    id: number,
    name: "Basic" | "Standard" | "Premium",
    price: number,
    max_books_per_month: number,
    description: string
}