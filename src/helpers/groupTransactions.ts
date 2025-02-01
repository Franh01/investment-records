import type { ITransaction } from "@interfaces/index"

export const groupTransactions = (
  transactions: ITransaction[],
): ITransaction[] => {
  const grouped: Record<
    string,
    {
      totalAmount: number
      totalCost: number
      totalComission: number
      latestDate: string
    }
  > = {}

  transactions.forEach(tx => {
    const { ticker, amount, price, comission, type, date } = tx
    const signedAmount = type === "sell" ? -amount : amount

    if (!grouped[ticker]) {
      grouped[ticker] = {
        totalAmount: 0,
        totalCost: 0,
        totalComission: 0,
        latestDate: date,
      }
    }

    grouped[ticker].totalAmount += signedAmount
    grouped[ticker].totalCost += signedAmount * price + comission
    grouped[ticker].totalComission += comission
    grouped[ticker].latestDate = date
  })

  return Object.keys(grouped).map(ticker => {
    const data = grouped[ticker]
    return {
      id: ticker,
      date: data.latestDate,
      amount: data.totalAmount,
      type: data.totalAmount >= 0 ? "buy" : "sell",
      price: data.totalAmount !== 0 ? data.totalCost / data.totalAmount : 0,
      comission: data.totalComission,
      ticker,
    }
  })
}
