import { Paper, Typography } from "@mui/material"

import type { ITransaction } from "../transactionSlice"

const Transaction = (transaction: ITransaction) => {
  return (
    <Paper sx={{ p: 2, mb: 2, border: "1px solid #ccc" }}>
      <Typography>{transaction.date}</Typography>
      <Typography>{transaction.amount}</Typography>
      <Typography>{transaction.type}</Typography>
      <Typography>{transaction.price}</Typography>
      <Typography>{transaction.comission}</Typography>
      <Typography>{transaction.total}</Typography>
    </Paper>
  )
}

export default Transaction
