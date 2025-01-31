import type { ITransaction } from "@interfaces/index"

export const createTransactionService = (
  formData: ITransaction,
  transactions: ITransaction[],
): Promise<{ data: ITransaction }> => {
  return new Promise<{ data: ITransaction }>(resolve => {
    localStorage.setItem(
      "transactions",
      JSON.stringify([...transactions, formData]),
    )
    setTimeout(() => resolve({ data: formData }), 500)
  })
}
export const deleteTransactionService = (
  id: string,
  transactions: ITransaction[],
): Promise<ITransaction[]> => {
  const filteredTransactions = transactions.filter(
    transaction => transaction.id !== id,
  )
  return new Promise<ITransaction[]>(resolve => {
    localStorage.setItem(
      "transactions",
      JSON.stringify(transactions.filter(transaction => transaction.id !== id)),
    )
    setTimeout(() => resolve(filteredTransactions), 500)
  })
}
