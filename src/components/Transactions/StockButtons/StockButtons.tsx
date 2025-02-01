import { Box, Button } from "@mui/material"

import { NavLink } from "react-router"
import { selectStockInformations } from "../Transaction/StockInformation/stockInformationSlice"
import { useAppSelector } from "@app/hooks"

export const StockButtons = () => {
  const stocksInformation = useAppSelector(selectStockInformations)
  return (
    <Box>
      {Object.keys(stocksInformation).map(symbol => (
        <NavLink key={symbol} to={`/stocks/${symbol}`}>
          <Button key={symbol}>{symbol}</Button>
        </NavLink>
      ))}
    </Box>
  )
}
