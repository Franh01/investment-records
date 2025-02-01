import { Box, Button } from "@mui/material"

import { selectStockInformations } from "../Transaction/StockInformation/stockInformationSlice"
import { useAppSelector } from "@app/hooks"

export const StockButtons = () => {
  const stocksInformation = useAppSelector(selectStockInformations)
  return (
    <Box>
      {Object.keys(stocksInformation).map(symbol => (
        <Button key={symbol}>{symbol}</Button>
      ))}
    </Box>
  )
}
