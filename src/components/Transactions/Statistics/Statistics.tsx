import { Box } from "@mui/material"
import SimpleBarChart from "./Charts/Bars"
import Summary from "./Summary/Summary"
import useViewportSize from "@hooks/useViewportSize"

const Statistics = () => {
  const { isMobile, isTablet } = useViewportSize()
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        border: "2px solid #114B5F10",
        borderRadius: "5px",
        flexWrap: "wrap",
      }}
    >
      <Summary />
      {!isTablet && !isMobile && <SimpleBarChart width={500} height={170} />}
    </Box>
  )
}

export default Statistics
