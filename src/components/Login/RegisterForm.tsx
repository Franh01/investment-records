import { Box, Divider, Paper, Typography } from "@mui/material"

import IPLogo from "./IPLogo"
import { NavLink } from "react-router-dom"
import ReusableForm from "@components/common/ReusableForm/ReusableForm"
import { useState } from "react"

interface IUserInfo {
  username: string
  email: string
  password: string
  confirmPassword: string
}
const RegisterForm = () => {
  const [userInfo, setUserInfo] = useState<IUserInfo>({
    username: "",
    password: "",
    email: "",
    confirmPassword: "",
  })

  const formInputs = [
    {
      name: "username",
      type: "text",
      label: "Usuario",
      placeholder: "johndoe1",
    },
    {
      name: "email",
      type: "email",
      label: "Correo",
      placeholder: "johndoe@hotmail.com",
    },
    {
      name: "password",
      type: "password",
      label: "Contraseña",
      placeholder: "qes3g1f#aws",
    },
    {
      name: "confirmPassword",
      type: "password",
      label: "Confirmar contraseña",
      placeholder: "qes3g1f#aws",
    },
  ]

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }
  return (
    <Paper sx={{ maxWidth: "350px", padding: "30px 15px", width: "100%" }}>
      <IPLogo />

      <ReusableForm
        formInputs={formInputs}
        handleSubmit={handleSubmit}
        setState={setUserInfo}
        state={userInfo}
        submitText="Registrarse"
      >
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
          <Typography>¿Ya tienes cuenta?</Typography>
          <NavLink to={`/login`} style={{ color: "#114B5F" }}>
            <Typography>Ingresa</Typography>
          </NavLink>
        </Box>
      </ReusableForm>
    </Paper>
  )
}

export default RegisterForm
