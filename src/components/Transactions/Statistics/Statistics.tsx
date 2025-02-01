import { Box, Typography } from "@mui/material"

import type { ITransactionStatistics } from "@interfaces/index"
import { selectTransactionsStatistics } from "../transactionSlice"
import { useAppSelector } from "@app/hooks"

const Statistics = () => {
  const statistics: ITransactionStatistics = useAppSelector(
    selectTransactionsStatistics,
  )

  return (
    <Box mb={5}>
      Total:
      <Typography variant="h5">
        $ {statistics.totalInvestment.toFixed(2)}
      </Typography>
      Unrealized Gains:
      <Typography
        variant="h5"
        sx={{ color: statistics.unrealizedGains < 0 ? "red" : "green" }}
      >
        $ {statistics.unrealizedGains.toFixed(2)}
      </Typography>
      <Typography
        variant="h5"
        sx={{
          color: statistics.unrealizedGainsPercentage < 0 ? "red" : "green",
        }}
      >
        {statistics.unrealizedGainsPercentage.toFixed(2)}%
      </Typography>
      <Typography variant="h5"></Typography>
    </Box>
  )
}

export default Statistics
