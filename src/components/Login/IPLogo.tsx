import { Box, Typography } from "@mui/material"

const IPLogo = () => {
  return (
    <Box
      sx={{
        width: "100px",
        height: "100px",
        backgroundColor: "primary.main",
        borderRadius: "50%",
        placeSelf: "center",
        mb: "20px",
        position: "relative",
      }}
    >
      <Typography
        color="primary.contrastText"
        fontSize={"65px"}
        fontFamily={"Noto Serif Hentaigana"}
        align="center"
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        IP
      </Typography>
    </Box>
  )
}

export default IPLogo
