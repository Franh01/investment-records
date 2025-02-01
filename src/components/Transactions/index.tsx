import { Box, Button, Modal, Typography } from "@mui/material"
import { selectInitialStatus, selectTransactions } from "./transactionSlice"

import DefaultTable from "@components/DefaultTable/DefaultTable"
import { StockButtons } from "./StockButtons/StockButtons"
import { TransactionForm } from "./TransactionForm/TransactionForm"
import { useAppSelector } from "../../app/hooks"
import { useState } from "react"

const Transactions = () => {
  const [isCreating, setIsCreating] = useState(false)
  const transactions = useAppSelector(selectTransactions)
  const status = useAppSelector(selectInitialStatus)

  return (
    <Box sx={{ p: 2 }}>
      <Typography>Current stocks</Typography>
      <StockButtons />
      <Button onClick={() => setIsCreating(true)}>New transaction</Button>

      <TransactionForm isCreating={isCreating} setIsCreating={setIsCreating} />

      <DefaultTable transactions={transactions} status={status} />
    </Box>
  )
}

export default Transactions
