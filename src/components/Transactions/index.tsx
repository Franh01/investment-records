import { Box, Button, Typography } from "@mui/material"
import { selectInitialStatus, selectTransactions } from "./transactionSlice"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { useEffect, useState } from "react"

import DefaultTable from "@components/DefaultTable/DefaultTable"
import { StockButtons } from "./StockButtons/StockButtons"
import { TransactionForm } from "./TransactionForm/TransactionForm"
import { getAllStocksInformation } from "./Transaction/StockInformation/stockInformationSlice"

const Transactions = () => {
  const [isCreating, setIsCreating] = useState(false)
  const transactions = useAppSelector(selectTransactions)

  const status = useAppSelector(selectInitialStatus)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (transactions.length > 0) {
      dispatch(getAllStocksInformation())
    }
  }, [transactions.length, dispatch])

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
