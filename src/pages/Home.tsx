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

import { Box } from "@mui/material"
import DefaultTable from "@components/DefaultTable/DefaultTable"
import Statistics from "@components/Transactions/Statistics/Statistics"
import { useEffect } from "react"

const Home = () => {
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
    <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 3 }}>
      <Statistics />
      <DefaultTable
        transactions={groupedTransactions}
        status={status}
        tableCellsToAvoid={["type", "action"]}
      />
    </Box>
  )
}

export default Home
