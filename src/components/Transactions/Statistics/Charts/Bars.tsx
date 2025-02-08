import { Box, Switch } from "@mui/material"

import { BarChart } from "@mui/x-charts/BarChart"
import { selectGroupedTransactions } from "@components/Transactions/transactionSlice"
import { useAppSelector } from "@app/hooks"
import { useState } from "react"

interface ISimpleBarChartProps {
  readonly width?: number
  readonly height?: number
}

export default function SimpleBarChart({
  width = 500,
  height = 300,
}: ISimpleBarChartProps) {
  const [isViewingPercentage, setIsViewingPercentage] = useState(false)
  const groupedTransactions = useAppSelector(selectGroupedTransactions)

  const xLabels: string[] = groupedTransactions.map(t => t.ticker)
  const totalPortfolioValue = groupedTransactions.reduce(
    (acc, t) => acc + Number(t.price * t.amount),
    0,
  )
  const totalPrice = groupedTransactions.map(t => Number(t.totalPrice))
  const totalPricePercentage = groupedTransactions.map(
    t => (Number(t.totalPrice) / totalPortfolioValue) * 100,
  )

  const normalPrice = [{ data: totalPrice, label: "Total ($)", id: "tpId" }]
  const pricePercentage = [
    { data: totalPricePercentage, label: "Porcentaje (%)", id: "tpPId" },
  ]

  //TODO: Move this colors to variables in theme
  const colors1 = ["#3e95cd"]
  const colors2 = ["#1a936f"]

  let x = 100
  let y = 40

  return (
    <Box sx={{ position: "relative" }}>
      <Switch
        sx={{ position: "absolute", top: "6px", right: "38px", zIndex: 1 }}
        onChange={() => setIsViewingPercentage(!isViewingPercentage)}
        value={isViewingPercentage}
      />
      <BarChart
        viewBox={{ x: 0, y: 0, width: 400, height: height }}
        margin={{ top: y, right: x, bottom: y, left: x }}
        colors={isViewingPercentage ? colors2 : colors1}
        width={width}
        height={height}
        series={isViewingPercentage ? pricePercentage : normalPrice}
        xAxis={[{ data: xLabels, scaleType: "band" }]}
      />
    </Box>
  )
}
