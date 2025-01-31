import { Box } from "@mui/material"
import Transaction from "./Transactions/Transaction/Transaction"
import { TransactionForm } from "./Transactions/TransactionForm/TransactionForm"
import { selectTransactions } from "./Transactions/transactionSlice"
import { useAppSelector } from "../app/hooks"

const Transactions = () => {
  const transactions = useAppSelector(selectTransactions)
  return (
    <Box sx={{ p: 2 }}>
      <TransactionForm />
      {transactions.map(transaction => (
        <Transaction key={transaction.id} {...transaction} />
      ))}
    </Box>
  )
}

export default Transactions
