export interface Users{
    id:number,
    name: string,
    email: string,
    pictures: string
}

export interface Expends{
    id: number,
    amounth: number,
    description: string,
    category: string,
    paymentMethod: string,
}

export interface Income{
    amounth: number,
    type: string,
    account: string
}

export interface State{
    users: Users,
    income: Income,
    expends: Expends
}