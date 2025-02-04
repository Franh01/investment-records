import { Box, Typography } from "@mui/material"

import type { ITransactionStatistics } from "@interfaces/index"
import SimpleBarChart from "./Charts/Bars"
import { selectTransactionsStatistics } from "../transactionSlice"
import { useAppSelector } from "@app/hooks"

const Statistics = () => {
  const statistics: ITransactionStatistics = useAppSelector(
    selectTransactionsStatistics,
  )

  return (
    <Box
      mb={5}
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "flex-start",
      }}
    >
      <SimpleBarChart />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "flex-end",
        }}
      >
        Total:
        <Typography variant="h5">
          $ {statistics.totalInvestment.toFixed(2)}
        </Typography>
        Unrealized Gains:
        <Typography
          variant="h5"
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
          variant="h5"
          sx={{
            color:
              statistics.unrealizedGainsPercentage < 0
                ? "var(--lower-color)"
                : "var(--higher-color)",
          }}
        >
          {statistics.unrealizedGainsPercentage.toFixed(2)}%
        </Typography>
      </Box>
    </Box>
  )
}

export default Statistics
