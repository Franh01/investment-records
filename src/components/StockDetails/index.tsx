import { NavLink, useParams } from "react-router-dom"
import {
  selectInitialStatus,
  selectTransactions,
} from "@components/Transactions/transactionSlice"

import { Box } from "@mui/material"
import DefaultTable from "@components/DefaultTable/DefaultTable"
import { useAppSelector } from "@app/hooks"

const StockDetails = () => {
  const { symbol } = useParams<{ symbol: string }>()
  const transactions = useAppSelector(selectTransactions)
  const status = useAppSelector(selectInitialStatus)

  return (
    <Box>
      <NavLink to={`/`}>HOME</NavLink>
      <DefaultTable
        status={status}
        transactions={transactions.filter(t => t.ticker === symbol)}
      />
    </Box>
  )
}

export default StockDetails
