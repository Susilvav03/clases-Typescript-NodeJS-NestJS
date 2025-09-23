export interface IBook_copy {
    id: number,
    book_id: number,
    condition: "new" | "good" | "used",
    availability_status: "available" | "unavailable",
}