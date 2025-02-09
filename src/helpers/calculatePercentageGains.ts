import Decimal from "decimal.js"
import type { ITransaction } from "@interfaces/index"

export const calculatePercentageGains = (
  transaction: ITransaction,
  currentPrice: number,
) => {
  const sellPrice = new Decimal(currentPrice)
    .times(transaction.amount)
    .minus(transaction.comission)
  const buyPrice = new Decimal(transaction.price)
    .times(transaction.amount)
    .plus(transaction.comission)

  const gains = sellPrice.minus(buyPrice).dividedBy(sellPrice).times(100)

  if (gains.isNaN()) return 0

  return Number(gains?.toFixed(2))
}
