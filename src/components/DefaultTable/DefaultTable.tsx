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
  capitalize,
} from "@mui/material"
import { useAppDispatch, useAppSelector } from "@app/hooks"

import type { ITransaction } from "@interfaces/index"
import { calculateGains } from "@helpers/calculateGains"
import { calculatePercentageGains } from "@helpers/calculatePercentageGains"
import { deleteTransaction } from "@components/Transactions/transactionSlice"
import moment from "moment"
import { selectStockInformations } from "@components/StockInformation/stockInformationSlice"

const tableCells = [
  {
    id: "date",
    title: "Fecha",
    align: "center",
  },
  {
    id: "type",
    title: "Tipo",
    align: "center",
  },
  {
    id: "ticker",
    title: "Ticker",
    align: "center",
  },
  {
    id: "amount",
    title: "Cantidad",
    align: "center",
  },
  {
    id: "price",
    title: "Precio",
    align: "center",
  },
  {
    id: "commission",
    title: "Comisión",
    align: "center",
  },
  {
    id: "total",
    title: "Total",
    align: "center",
  },
  {
    id: "current_price",
    title: "Precio actual",
    align: "center",
  },
  {
    id: "performance_percentage",
    title: "Rendimiento %",
    align: "center",
  },
  {
    id: "performance_dollars",
    title: "Rendimiento $",
    align: "center",
  },
  {
    id: "action",
    title: "",
    align: "center",
  },
]

interface IDefaultTableProps {
  transactions: ITransaction[]
  status: string
  tableCellsToAvoid?: string[] // ["type", "action"] only
}
const DefaultTable = ({
  transactions,
  status,
  tableCellsToAvoid,
}: IDefaultTableProps) => {
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
    //TODO: Make this table sortable
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small">
        <TableHead>
          <TableRow>
            {tableCells.map(cell => {
              if (tableCellsToAvoid?.includes(cell.id)) return null
              return (
                <TableCell key={cell.id} align="center" sortDirection="desc">
                  {cell.title}
                </TableCell>
              )
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((transaction: ITransaction) => {
            if (transaction.amount === 0) return null
            const gainsInPercentage = calculatePercentageGains(
              transaction,
              stockInformations[transaction.ticker]?.currentPrice || 0,
            )

            const gainsInDollars = calculateGains(
              transaction,
              stockInformations[transaction.ticker]?.currentPrice || 0,
            )
            return (
              <TableRow key={transaction.id}>
                <TableCell align="center">
                  {moment(transaction.date).format("L")}
                </TableCell>
                {tableCellsToAvoid?.includes("type") ? null : (
                  <TableCell
                    align="center"
                    sx={{ color: transaction.type === "buy" ? "green" : "red" }}
                  >
                    {capitalize(transaction.type)}
                  </TableCell>
                )}
                <TableCell align="center">{transaction.ticker}</TableCell>
                <TableCell align="center">{transaction.amount}</TableCell>
                <TableCell align="center">
                  {transaction.price.toFixed(2)}
                </TableCell>
                <TableCell align="center">{transaction.comission}</TableCell>
                <TableCell align="center">
                  {(
                    transaction.comission +
                    transaction.amount * transaction.price
                  ).toFixed(2)}
                </TableCell>
                <TableCell align="center">
                  {/* Precio actual */}
                  {stockInformations[transaction.ticker]?.currentPrice || 0}
                </TableCell>

                <TableCell
                  align="center"
                  sx={{
                    color: Number(gainsInPercentage) > 0 ? "green" : "red",
                    fontWeight: "400",
                  }}
                >
                  {gainsInPercentage}%
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    color: Number(gainsInDollars) > 0 ? "green" : "red",
                    fontWeight: "400",
                  }}
                >
                  $ {gainsInDollars}
                </TableCell>
                {tableCellsToAvoid?.includes("action") ? null : (
                  <TableCell align="center">
                    <Button
                      disabled={status === "loading"}
                      variant="contained"
                      color="error"
                      onClick={() => dispatch(deleteTransaction(transaction))}
                    >
                      Delete
                    </Button>
                  </TableCell>
                )}
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default DefaultTable
