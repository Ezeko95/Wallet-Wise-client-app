export interface Users{
    id:number,
    name: string,
    email: string,
    pictures: string
}

export interface IExpenses{
    id: number,
    amount: number,
    description: string,
    category: string,
    logo: string;
    logoCategory: string
    paymentMethod: string,
    deletedExpense: boolean
}

export interface IIncome{
    id: number,
    amount: number,
    type: string,
    account: string,
    logo: string;
    deletedIncome: boolean
}

export interface State{
    users: Users,
    income: IIncome,
    expends: IExpenses
}

export interface AllMovements {
    incomes: IIncome[],
    expenses: IExpenses[],
    loading: boolean,
    error: string | null,
    createdAt: Date,
    type: string,
    category: string,
    amount: number
}

export interface Account {
    name: string,
    total: number,
    expense: IExpenses[]
    income: IIncome[]
}

export interface Filtered {
    id:number,
    amount:number,
    account: string | null,
    paymentMethod: string | null,
    createdAt: Date,
    type: string,
    category: string,
    deletedIncome: boolean,
    deletedExpense: boolean
}