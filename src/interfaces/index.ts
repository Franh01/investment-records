export interface ITransaction {
  [key: string]: string | number
  id: string
  date: string
  amount: number
  type: "buy" | "sell"
  price: number
  comission: number
  ticker: string
}
