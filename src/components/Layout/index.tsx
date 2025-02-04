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
      // Verifica que el contenedor tenga contenido con scroll, que no se haya activado el stop por hover,
      // y que no estemos en la pausa al final
      if (
        scrollContainer.scrollWidth > scrollContainer.clientWidth &&
        !stopScrolling &&
        !pauseAtEndRef.current
      ) {
        setScrollAmount(prevScrollAmount => {
          const maxScroll =
            scrollContainer.scrollWidth - scrollContainer.clientWidth
          const newScrollAmount = prevScrollAmount + scrollStep

          if (newScrollAmount >= maxScroll) {
            // Activamos la pausa para evitar seguir incrementando el scroll
            pauseAtEndRef.current = true

            // Después de 1 segundo, reseteamos el scroll a 0 y desactivamos la pausa
            setTimeout(() => {
              scrollContainer.scrollTo({
                left: 0,
                behavior: "instant",
              })
              setTimeout(() => {
                setScrollAmount(0)
                pauseAtEndRef.current = false
              }, 1000)
            }, 1000)

            // Retornamos el valor previo para no modificar el estado hasta que se reinicie
            return prevScrollAmount
          } else {
            scrollContainer.scrollTo({
              left: newScrollAmount,
              behavior: "instant",
            })
            return newScrollAmount
          }
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
