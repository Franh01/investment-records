import type { ITransaction } from "@interfaces/index"

export const createTransaction = (
  formData: ITransaction,
  transactions: ITransaction[],
): Promise<{ data: ITransaction }> => {
  console.log(formData, "formData")
  return new Promise<{ data: ITransaction }>(resolve => {
    localStorage.setItem(
      "transactions",
      JSON.stringify([...transactions, formData]),
    )
    setTimeout(() => resolve({ data: formData }), 500)
  })
}
