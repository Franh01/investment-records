import { Box, Switch } from "@mui/material"

import { BarChart } from "@mui/x-charts/BarChart"
import { selectGroupedTransactions } from "@components/Transactions/transactionSlice"
import { useAppSelector } from "@app/hooks"
import { useState } from "react"

export default function SimpleBarChart() {
  const [isViewingPercentage, setIsViewingPercentage] = useState(false)
  const groupedTransactions = useAppSelector(selectGroupedTransactions)

  groupedTransactions.sort((a, b) => {
    return b.price * b.amount - a.price * a.amount
  })

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

  const colors1 = ["#3e95cd"]
  const colors2 = ["#3cba9f"]

  return (
    <Box>
      Precio
      <Switch
        onChange={() => setIsViewingPercentage(!isViewingPercentage)}
        value={isViewingPercentage}
      />
      Porcentaje
      <BarChart
        colors={isViewingPercentage ? colors2 : colors1}
        width={500}
        height={300}
        series={isViewingPercentage ? pricePercentage : normalPrice}
        xAxis={[{ data: xLabels, scaleType: "band" }]}
      />
    </Box>
  )
}
