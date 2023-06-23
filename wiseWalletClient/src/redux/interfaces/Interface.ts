export interface Users{
    name: string,
    email: string,
    pictures: string
}

export interface IExpenses{
    id: number,
    amount: number,
    description: string,
    category: string,
    paymentMethod: string,
    deletedExpense: boolean
}

export interface Income{
    amount: number,
    type: string,
    account: string
}

export interface State{
    users: Users,
    income: Income,
    expends: IExpenses
}

export interface AllMovements {
    incomes: Income[],
    expenses: IExpenses[],
    loading: boolean,
    error: string | null,
}

export interface Account {
    name: string,
    total: number,
    expense: IExpenses[],
    income: Income[]
}