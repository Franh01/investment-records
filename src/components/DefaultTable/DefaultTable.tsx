import {
  Box,
  Button,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material"
import { useAppDispatch, useAppSelector } from "@app/hooks"

import type { ITransaction } from "@interfaces/index"
import { calculateGains } from "@helpers/calculateGains"
import { calculatePercentageGains } from "@helpers/calculatePercentageGains"
import { deleteTransaction } from "@components/Transactions/transactionSlice"
import moment from "moment"
import { selectStockInformations } from "@components/Transactions/Transaction/StockInformation/stockInformationSlice"

const tableCells = [
  "Action",
  "Date",
  "Type",
  "Ticker",
  "Amount",
  "Price",
  "Comission",
  "Total",
  "Precio actual",
  "Rendimiento %",
  "Rendimiento $",
]

interface IDefaultTableProps {
  transactions: ITransaction[]
  status: string
}
const DefaultTable = ({ transactions, status }: IDefaultTableProps) => {
  const dispatch = useAppDispatch()
  const stockInformations = useAppSelector(selectStockInformations)

  if (transactions.length === 0) {
    return (
      <div>
        <h2>No hay transacciones</h2>
      </div>
    )
  }

  if (status === "loading") {
    return (
      <Box>
        <LinearProgress sx={{ width: "100%" }} />
      </Box>
    )
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small">
        <TableHead>
          <TableRow>
            {tableCells.map(cell => (
              <TableCell key={cell} align="right">
                {cell}
              </TableCell>
            ))}
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
                {transaction.comission + transaction.amount * transaction.price}
              </TableCell>
              <TableCell align="right">
                {stockInformations[transaction.ticker]?.currentPrice || 0}
              </TableCell>

              <TableCell align="right">
                {calculatePercentageGains(
                  transaction,
                  stockInformations[transaction.ticker]?.currentPrice || 0,
                )}
              </TableCell>
              <TableCell align="right">
                {calculateGains(
                  transaction,
                  stockInformations[transaction.ticker]?.currentPrice || 0,
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default DefaultTable
