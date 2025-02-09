import { useMediaQuery } from "@mui/material"

const useViewportSize = () => {
  const isMobile = useMediaQuery("(max-width:600px)")
  const isTablet = useMediaQuery("(min-width:601px) and (max-width:1024px)")
  const isLaptop = useMediaQuery("(min-width:1025px) and (max-width:1440px)")
  const isDesktop = useMediaQuery("(min-width:1441px)")

  return {
    isMobile,
    isTablet,
    isLaptop,
    isDesktop,
  }
}

export default useViewportSize
