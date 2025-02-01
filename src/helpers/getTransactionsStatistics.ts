import type {
  IStockInformation,
  ITransaction,
  ITransactionStatistics,
} from "@interfaces/index"

import { calculateGains } from "./calculateGains"

export const getTransactionsStatistics = (
  transactions: ITransaction[],
  stocksInformation: { [key: string]: IStockInformation },
): ITransactionStatistics => {
  let totalInvestment = 0
  let unrealizedGains = 0

  transactions.forEach(tx => {
    const { amount, price, type } = tx
    const signedTotalPriceTimesAmount =
      type === "sell" ? -price * amount : price * amount

    totalInvestment += signedTotalPriceTimesAmount
    unrealizedGains += calculateGains(
      tx,
      stocksInformation[tx.ticker]?.currentPrice || 0,
    )
  })

  let unrealizedGainsPercentage = (unrealizedGains / totalInvestment) * 100

  return { totalInvestment, unrealizedGains, unrealizedGainsPercentage }
}
