import { Paper, Typography } from "@mui/material"

import type { ITransaction } from "@interfaces/index"

const Transaction = (transaction: ITransaction) => {
  return (
    <Paper
      sx={{ p: 2, mb: 2, border: "1px solid #ccc", display: "flex", gap: 2 }}
    >
      <Typography>{transaction.date}</Typography>
      <Typography>{transaction.ticker}</Typography>
      <Typography>{transaction.type}</Typography>
      <Typography>{transaction.amount}</Typography>
      <Typography>{transaction.price}</Typography>
      <Typography>{transaction.comission}</Typography>
      <Typography>{transaction.total}</Typography>
    </Paper>
  )
}

export default Transaction
