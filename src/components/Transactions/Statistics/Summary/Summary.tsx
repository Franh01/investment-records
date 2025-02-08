import { Box, Typography } from "@mui/material"

import AddOperation from "./Buttons/AddOperation"
import type { ITransactionStatistics } from "@interfaces/index"
import Refresh from "./Buttons/Refresh"
import { selectTransactionsStatistics } from "@components/Transactions/transactionSlice"
import { useAppSelector } from "@app/hooks"

const Summary = () => {
  const statistics: ITransactionStatistics = useAppSelector(
    selectTransactionsStatistics,
  )

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        padding: "8px 49px",
        height: "100%",
      }}
    >
      <Box id="balance" mb={"2px"}>
        <Typography fontSize={"20px"} fontWeight={"400"}>
          Balance
        </Typography>
        <Typography fontSize={"32px"} fontWeight={"500"}>
          $ {statistics.totalInvestment.toFixed(2)}
        </Typography>
      </Box>
      <Box
        id="pnl"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "7px",
          fontSize: "16px",
        }}
      >
        <Typography mr={"3px"} fontWeight={"400"}>
          PnL
        </Typography>
        <Typography
          sx={{
            color:
              statistics.unrealizedGains < 0
                ? "var(--lower-color)"
                : "var(--higher-color)",
          }}
        >
          $ {statistics.unrealizedGains.toFixed(2)}
        </Typography>
        <Typography
          sx={{
            color:
              statistics.unrealizedGainsPercentage < 0
                ? "var(--lower-color)"
                : "var(--higher-color)",
          }}
        >
          ({statistics.unrealizedGainsPercentage.toFixed(2)}%)
        </Typography>
      </Box>
      <Box id="buttons" sx={{ display: "flex", gap: "10px", mt: "10px" }}>
        <AddOperation />
        <Refresh />
      </Box>
    </Box>
  )
}

export default Summary
