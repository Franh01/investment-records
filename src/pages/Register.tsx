import { Box } from "@mui/material"
import RegisterForm from "@components/Login/RegisterForm"

const Register = () => {
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
      <RegisterForm />
    </Box>
  )
}

export default Register
