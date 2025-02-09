import Decimal from "decimal.js"
import type { ITransaction } from "@interfaces/index"

export const calculateGains = (
  transaction: ITransaction,
  currentPrice: number = 0,
) => {
  const gains = new Decimal(currentPrice)
    .minus(transaction.price)
    .times(transaction.amount)
    .minus(transaction.comission)

  if (gains.isNaN()) return 0

  return Number(gains.toFixed(2))
}
