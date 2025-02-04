import { Box, Typography, useMediaQuery } from "@mui/material"
import {
  selectStatus,
  selectStockInformations,
} from "@components/StockInformation/stockInformationSlice"
import { useEffect, useRef, useState } from "react"

import DailyPricesWidget from "@components/DailyPricesWidget/DailyPricesWidget"
import { Outlet } from "react-router-dom"
import { useAppSelector } from "@app/hooks"

const Layout = () => {
  const allStockInformationStatus = useAppSelector(selectStatus)
  const allStockInformation = useAppSelector(selectStockInformations)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [stopScrolling, setStopScrolling] = useState<boolean>(false)
  const [scrollAmount, setScrollAmount] = useState<number>(0)
  const pauseAtEndRef = useRef<boolean>(false)
  const isMobile = useMediaQuery("(max-width: 600px)")

  const MapStockInformation = () => {
    // Acumula los elementos JSX en un array
    const stockInfoElements = Object.entries(allStockInformation).map(
      ([key, value]) => <DailyPricesWidget data={value} key={key} />,
    )

    return stockInfoElements
  }

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current
    if (!scrollContainer) return

    const scrollStep = 1 // Ajusta este valor para cambiar la velocidad del scroll
    const scrollInterval = 35 // Ajusta este valor para cambiar la suavidad del scroll

    const scroll = () => {
      if (
        scrollContainer.scrollWidth > scrollContainer.clientWidth &&
        !stopScrolling &&
        !pauseAtEndRef.current
      ) {
        setScrollAmount(prevScrollAmount => {
          let newScrollAmount = prevScrollAmount + scrollStep // Ajusta la posición del scroll
          if (
            newScrollAmount >=
            scrollContainer.scrollWidth - scrollContainer.clientWidth
          ) {
            // Resetea la posición del scroll cuando llega al final
            newScrollAmount = 0
          }
          scrollContainer.scrollTo({
            left: newScrollAmount,
            behavior: "smooth",
          })

          return newScrollAmount
        })
      }
    }

    const intervalId = setInterval(scroll, scrollInterval)

    return () => clearInterval(intervalId)
  }, [allStockInformation, stopScrolling])

  return (
    <Box>
      <Box
        component="header"
        onMouseEnter={() => setStopScrolling(true)}
        onMouseLeave={() => setStopScrolling(false)}
        ref={scrollContainerRef}
        sx={{
          width: isMobile ? "90vw" : "100%",
          height: "35px",
          position: "fixed",
          top: 0,
          background: "var(--dark-background)",
          display: "flex",
          padding: "0 40px",
          overflowX: "auto",
          whiteSpace: "nowrap",
          "&::-webkit-scrollbar": {
            display: "none",
          },
          zIndex: 1,
        }}
      >
        {allStockInformationStatus === "loading" || scrollAmount < 0 ? (
          <Typography>Loading...</Typography>
        ) : (
          <MapStockInformation />
        )}
      </Box>

      <Box component="main" sx={{ p: 3, mt: "35px" }}>
        <Outlet />
      </Box>
    </Box>
  )
}

export default Layout
