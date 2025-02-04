import { Box, Typography } from "@mui/material"
import {
  selectStatus,
  selectStockInformations,
} from "@components/StockInformation/stockInformationSlice"

import DailyPricesWidget from "@components/DailyPricesWidget/DailyPricesWidget"
import { Outlet } from "react-router-dom"
import { useAppSelector } from "@app/hooks"

const Layout = () => {
  const allStockInformationStatus = useAppSelector(selectStatus)
  const allStockInformation = useAppSelector(selectStockInformations)

  const MapStockInformation = () => {
    // Acumula los elementos JSX en un array
    const stockInfoElements = Object.entries(allStockInformation).map(
      ([key, value]) => <DailyPricesWidget data={value} key={key} />,
    )
    // Retorna el array de elementos JSX
    return stockInfoElements
  }

  return (
    <Box>
      <Box
        sx={{
          width: "100%",
          height: "35px",
          position: "fixed",
          top: 0,
          background: "var(--dark-background)",
          display: "flex",
          padding: "0 20px",
        }}
      >
        {allStockInformationStatus === "loading" ? (
          <Typography>Loading...</Typography>
        ) : (
          <MapStockInformation />
        )}
      </Box>

      <Box component="main" sx={{ p: 3 }}>
        <Outlet />
      </Box>
    </Box>
  )
}

export default Layout
