import { Box, Typography } from "@mui/material"

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp"
import type { IStockInformation } from "@interfaces/index"

interface IDailyPricesWidgetProps {
  data: IStockInformation
}

const DailyPricesWidget = ({ data }: IDailyPricesWidgetProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mr: 6,
        color: "var(--dark-contrast)",
        minWidth: "150px",
      }}
    >
      <Typography mr={"10px"} fontSize={"14px"}>
        {data.symbol}
      </Typography>
      <Typography fontSize={"14px"} fontWeight={"500"}>
        {data.currentPrice}
      </Typography>
      {data.dailyChange > 0 ? (
        <ArrowDropUpIcon sx={{ color: "var(--higher-color)" }} />
      ) : (
        <ArrowDropDownIcon sx={{ color: "var(--lower-color)" }} />
      )}
      <Typography
        sx={{
          fontWeight: "500",
          fontSize: "14px",
          color:
            data.dailyChange > 0 ? "var(--higher-color)" : "var(--lower-color)",
        }}
      >
        {data.dailyChangePercent.toFixed(2)}%
      </Typography>
    </Box>
  )
}

export default DailyPricesWidget
