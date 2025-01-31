import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material"
import {
  deleteTransaction,
  selectInitialStatus,
  selectTransactions,
} from "./transactionSlice"
import {
  getAllStocksInformation,
  selectStockInformations,
} from "./Transaction/StockInformation/stockInformationSlice"
import { useAppDispatch, useAppSelector } from "../../app/hooks"

import type { ITransaction } from "@interfaces/index"
import { TransactionForm } from "./TransactionForm/TransactionForm"
import moment from "moment"
import { useEffect } from "react"

const calculatePercentageGains = (
  transaction: ITransaction,
  currentPrice: number,
) => {
  const sellPrice = currentPrice * transaction.amount - transaction.comission
  const buyPrice =
    transaction.price * transaction.amount + transaction.comission

  const gains = (sellPrice - buyPrice) / sellPrice

  return Number(gains.toFixed(3)) * 100
}
const calculateGains = (transaction: ITransaction, currentPrice: number) => {
  const gains = (currentPrice - transaction.price) * transaction.amount

  return Number(gains.toFixed(2)) - transaction.comission
}

const Transactions = () => {
  const transactions = useAppSelector(selectTransactions)
  const status = useAppSelector(selectInitialStatus)
  const stockInformations = useAppSelector(selectStockInformations)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getAllStocksInformation())
  }, [dispatch])

  console.log(stockInformations, "stockInformations")

  return (
    <Box sx={{ p: 2 }}>
      <TransactionForm />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small">
          <TableHead>
            <TableRow>
              <TableCell align="right">ACTION</TableCell>
              <TableCell align="right">Date</TableCell>
              <TableCell align="right">Type</TableCell>
              <TableCell align="right">Ticker</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Comission</TableCell>
              <TableCell align="right">Total</TableCell>
              <TableCell align="right">Rendimiento %</TableCell>
              <TableCell align="right">Rendimiento $</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((transaction: ITransaction) => (
              <TableRow key={transaction.id}>
                <TableCell align="right">
                  <Button
                    disabled={status === "loading"}
                    variant="contained"
                    color="error"
                    onClick={() => dispatch(deleteTransaction(transaction))}
                  >
                    Delete
                  </Button>
                </TableCell>
                <TableCell align="right">
                  {moment(transaction.date).format("L")}
                </TableCell>
                <TableCell align="right">{transaction.type}</TableCell>
                <TableCell align="right">{transaction.ticker}</TableCell>
                <TableCell align="right">{transaction.amount}</TableCell>
                <TableCell align="right">{transaction.price}</TableCell>
                <TableCell align="right">{transaction.comission}</TableCell>
                <TableCell align="right">
                  {transaction.comission +
                    transaction.amount * transaction.price}
                </TableCell>
                <TableCell align="right">
                  {calculatePercentageGains(
                    transaction,
                    stockInformations[transaction.ticker].currentPrice,
                  )}
                </TableCell>
                <TableCell align="right">
                  {calculateGains(
                    transaction,
                    stockInformations[transaction.ticker].currentPrice,
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default Transactions
