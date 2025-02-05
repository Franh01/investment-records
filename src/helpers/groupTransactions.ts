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
    const signedCost = type === "sell" ? -price * amount : price * amount

    if (!grouped[ticker]) {
      grouped[ticker] = {
        totalAmount: 0,
        totalCost: 0,
        totalComission: 0,
        latestDate: date,
      }
    }

    grouped[ticker].totalAmount += signedAmount
    grouped[ticker].totalCost += signedCost
    grouped[ticker].totalComission += comission
  })

  const groupedTransactions: ITransaction[] = Object.keys(grouped).map(
    ticker => {
      const data = grouped[ticker]
      return {
        id: ticker,
        date: data.latestDate,
        amount: data.totalAmount,
        type: data.totalAmount >= 0 ? "buy" : "sell",
        price: data.totalAmount !== 0 ? data.totalCost / data.totalAmount : 0,
        totalPrice: data.totalCost,
        comission: data.totalComission,
        ticker,
      }
    },
  )

  groupedTransactions.sort((a, b) => {
    return b.price * b.amount - a.price * a.amount
  })

  return groupedTransactions.filter(tx => tx.amount > 0)
}
