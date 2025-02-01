import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material"
import { useMemo, useState } from "react"

import type { ITransaction } from "@interfaces/index"

interface HeadCell {
  id: keyof ITransaction
  label: string
  numeric: boolean
}

const headCells: HeadCell[] = [
  { id: "name", label: "Nombre", numeric: false },
  { id: "amount", label: "Monto", numeric: true },
  { id: "date", label: "Fecha", numeric: true },
]

type Order = "asc" | "desc"

export default function TransactionsTable({
  transactions,
}: {
  transactions: ITransaction[]
}) {
  const [order, setOrder] = useState<Order>("asc")
  const [orderBy, setOrderBy] = useState<keyof ITransaction>("date")

  const handleRequestSort = (property: keyof ITransaction) => {
    const isAsc = orderBy === property && order === "asc"
    setOrder(isAsc ? "desc" : "asc")
    setOrderBy(property)
  }

  const sortedRows = useMemo(() => {
    return [...transactions].sort((a, b) => {
      if (a[orderBy] < b[orderBy]) return order === "asc" ? -1 : 1
      if (a[orderBy] > b[orderBy]) return order === "asc" ? 1 : -1
      return 0
    })
  }, [transactions, order, orderBy])

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table sx={{ minWidth: 750 }}>
            <TableHead>
              <TableRow>
                {headCells.map(headCell => (
                  <TableCell
                    key={headCell.id}
                    align={headCell.numeric ? "right" : "left"}
                  >
                    <TableSortLabel
                      active={orderBy === headCell.id}
                      direction={orderBy === headCell.id ? order : "asc"}
                      onClick={() => handleRequestSort(headCell.id)}
                    >
                      {headCell.label}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedRows.map(row => (
                <TableRow key={row.id}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell align="right">{row.amount}</TableCell>
                  <TableCell align="right">
                    {new Date(row.date).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  )
}
