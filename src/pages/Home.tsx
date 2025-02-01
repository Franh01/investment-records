import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Typography,
} from "@mui/material"
import {
  getAllStocksInformation,
  selectStatus,
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
import { RefreshOutlined } from "@mui/icons-material"
import { StockButtons } from "@components/StockButtons/StockButtons"
import { TransactionForm } from "@components/Transactions/TransactionForm/TransactionForm"

const Home = () => {
  const [isCreating, setIsCreating] = useState(false)
  const transactions = useAppSelector(selectTransactions)
  const groupedTransactions = useAppSelector(selectGroupedTransactions)

  const status = useAppSelector(selectInitialStatus)
  const allStockInformationStatus = useAppSelector(selectStatus)
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Typography>Current stocks</Typography>
        <IconButton
          onClick={() => dispatch(getAllStocksInformation())}
          disabled={allStockInformationStatus === "loading"}
        >
          {allStockInformationStatus === "loading" ? (
            <CircularProgress size={20} />
          ) : (
            <RefreshOutlined />
          )}
        </IconButton>
      </Box>
      <StockButtons />
      <Button onClick={() => setIsCreating(true)}>New transaction</Button>

      <TransactionForm isCreating={isCreating} setIsCreating={setIsCreating} />

      <DefaultTable
        transactions={groupedTransactions}
        status={status}
        tableCellsToAvoid={["type", "action"]}
      />
    </Box>
  )
}

export default Home
