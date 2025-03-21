import { Box } from "@mui/material"
import LoginForm from "@components/Login/LoginForm"

const Login = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        padding: "10px",
        background: "#F3E9D230",
      }}
    >
      <LoginForm />
    </Box>
  )
}

export default Login
