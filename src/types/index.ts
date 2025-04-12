export type Expense = {
    id: string;
    expenseName: string;
    amount: number;
    category: string;
    date: Value;
}

export type DraftExpense = Omit<Expense, 'id'> //Toma todo del type anterior pero sin el id

type valuePiece = Date | null;
export type Value = valuePiece | [valuePiece, valuePiece];

export type Category = {
    id: string;
    name: string;
    icon: string;
}