export interface INotification {
    id: number,
    user_id: number,
    type: "loan_due" | "loan_request" | "loan_overdue",
    message: string,
    read: boolean,
    created_at: Date
}