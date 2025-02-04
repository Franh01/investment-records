import { AppBar, Box, Toolbar, Typography } from "@mui/material"

import { Outlet } from "react-router-dom"

const Layout = () => {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Investment Records</Typography>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ p: 3 }}>
        <Outlet />
      </Box>
    </Box>
  )
}

export default Layout
