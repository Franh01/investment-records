import { Box, CircularProgress, IconButton, Typography } from "@mui/material"
import {
  getAllStocksInformation,
  selectStatus,
} from "@components/StockInformation/stockInformationSlice"
import { useAppDispatch, useAppSelector } from "@app/hooks"

import { RefreshOutlined } from "@mui/icons-material"

const RefreshStockInformationButton = () => {
  const allStockInformationStatus = useAppSelector(selectStatus)
  const dispatch = useAppDispatch()
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <Typography>Refresh stock information</Typography>
      <IconButton
        onClick={() => dispatch(getAllStocksInformation())}
        disabled={allStockInformationStatus === "loading"}
      >
        {allStockInformationStatus === "loading" ? (
          <CircularProgress size={20} />
        ) : (
          <RefreshOutlined />
        )}
      </IconButton>
    </Box>
  )
}

export default RefreshStockInformationButton
