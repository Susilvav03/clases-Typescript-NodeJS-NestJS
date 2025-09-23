export interface ILoan {
    id: number,
    book_id: number,
    borrower_id: number,
    owner_id: number,
    loan_date: Date,
    return_date: Date,
    actual_return_date: Date | null,
    status: 'active' | 'returned' | 'late' | 'canceled'
}