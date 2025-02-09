import { Box, Divider, Paper, Typography } from "@mui/material"

import IPLogo from "./IPLogo"
import { NavLink } from "react-router-dom"
import ReusableForm from "@components/common/ReusableForm/ReusableForm"
import { useState } from "react"

interface IUserInfo {
  username: string
  password: string
}
const LoginForm = () => {
  const [userInfo, setUserInfo] = useState<IUserInfo>({
    username: "",
    password: "",
  })

  const formInputs = [
    {
      name: "username",
      type: "text",
      label: "Usuario",
      placeholder: "johndoe1",
    },
    {
      name: "password",
      type: "password",
      label: "Contraseña",
      placeholder: "qes3g1f#aws",
    },
  ]

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }
  return (
    <Paper sx={{ maxWidth: "350px", padding: "30px 15px", width: "100%" }}>
      <IPLogo />
      <Typography mb={1}>Iniciar sesión</Typography>
      <ReusableForm
        formInputs={formInputs}
        handleSubmit={handleSubmit}
        setState={setUserInfo}
        state={userInfo}
        submitText="Ingresar"
      >
        <a
          href="mailto:fran_lopez9@live.com"
          style={{
            color: "#114B5F",
          }}
        >
          <Typography>¿Olvidaste tu contraseña?</Typography>
        </a>

        <Divider sx={{ marginBottom: "30px" }} />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            gap: 1,
            flexWrap: "wrap",
          }}
        >
          <Typography>¿No tienes cuenta?</Typography>
          <NavLink to={`/register`} style={{ color: "#114B5F" }}>
            <Typography>Registrarse</Typography>
          </NavLink>
        </Box>
      </ReusableForm>
    </Paper>
  )
}

export default LoginForm
