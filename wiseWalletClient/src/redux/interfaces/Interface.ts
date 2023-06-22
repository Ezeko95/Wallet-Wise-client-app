export interface Users{
    name: string,
    email: string,
    pictures: string
}

export interface Expenses{
    id: number,
    amount: number,
    description: string,
    category: string,
    paymentMethod: string,
}

export interface Income{
    amount: number,
    type: string,
    account: string
}

export interface State{
    users: Users,
    income: Income,
    expends: Expenses
}

export interface AllMovements {
    incomes: Income[],
    expenses: Expenses[],
    loading: boolean,
    error: string | null,
}

export interface Account {
    name: string,
    total: number,
    expense: Expenses[],
    income: Income[]
}