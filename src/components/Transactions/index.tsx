import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material"

import type { ITransaction } from "@interfaces/index"
import { TransactionForm } from "./TransactionForm/TransactionForm"
import moment from "moment"
import { selectTransactions } from "./transactionSlice"
import { useAppSelector } from "../../app/hooks"

// lets fake the actual price of the ticker
const fakeCurrentPrice = 40.48
const obtainPercentageGains = (transaction: ITransaction) => {
  const sellPrice =
    fakeCurrentPrice * transaction.amount - transaction.comission
  const buyPrice =
    transaction.price * transaction.amount + transaction.comission

  const gains = (sellPrice - buyPrice) / sellPrice

  return Number(gains.toFixed(3)) * 100
}
const obtainGains = (transaction: ITransaction) => {
  const gains = (fakeCurrentPrice - transaction.price) * transaction.amount

  return Number(gains.toFixed(2)) - transaction.comission
}

const Transactions = () => {
  const transactions = useAppSelector(selectTransactions)
  return (
    <Box sx={{ p: 2 }}>
      <TransactionForm />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
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
                  {obtainPercentageGains(transaction)}
                </TableCell>
                <TableCell align="right">{obtainGains(transaction)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default Transactions
