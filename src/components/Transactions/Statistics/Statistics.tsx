import { Box } from "@mui/material"
import SimpleBarChart from "./Charts/Bars"
import Summary from "./Summary/Summary"

const Statistics = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        border: "2px solid #114B5F10",
        borderRadius: "5px",
        height: "170px",
      }}
    >
      <Summary />
      <SimpleBarChart width={500} height={170} />
    </Box>
  )
}

export default Statistics
