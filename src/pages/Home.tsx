import { Box, Button } from "@mui/material"
import {
  getAllStocksInformation,
  selectStockInformations,
} from "@components/StockInformation/stockInformationSlice"
import {
  selectGroupedTransactions,
  selectInitialStatus,
  selectTransactions,
} from "@components/Transactions/transactionSlice"
import { useAppDispatch, useAppSelector } from "@app/hooks"
import { useEffect, useState } from "react"

import DefaultTable from "@components/DefaultTable/DefaultTable"
import RefreshStockInformationButton from "@components/RefreshStockInformationButton"
import Statistics from "@components/Transactions/Statistics/Statistics"
import { TransactionForm } from "@components/Transactions/TransactionForm/TransactionForm"

const Home = () => {
  const [isCreating, setIsCreating] = useState(false)
  const transactions = useAppSelector(selectTransactions)
  const groupedTransactions = useAppSelector(selectGroupedTransactions)

  const status = useAppSelector(selectInitialStatus)

  const stockInformations = useAppSelector(selectStockInformations)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (
      transactions.length > 0 &&
      Object.keys(stockInformations).length === 0
    ) {
      dispatch(getAllStocksInformation())
    }
  }, [transactions, dispatch, stockInformations])

  return (
    <Box sx={{ p: 2 }}>
      <Statistics />

      <Button onClick={() => setIsCreating(true)}>New transaction</Button>
      <TransactionForm isCreating={isCreating} setIsCreating={setIsCreating} />
      <RefreshStockInformationButton />
      <DefaultTable
        transactions={groupedTransactions}
        status={status}
        tableCellsToAvoid={["type", "action"]}
      />
    </Box>
  )
}

export default Home
