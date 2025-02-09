import { Box, TextField } from "@mui/material"

import SimpleButton from "../SimpleButton/SimpleButton"

interface IReusableFormProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  formInputs: {
    name: string
    type: string
    label: string
    placeholder: string
  }[]
  state: any
  setState: any
  submitText: string
  children?: React.ReactNode
}
const ReusableForm = ({
  handleSubmit,
  formInputs,
  state,
  setState,
  submitText,
  children,
}: IReusableFormProps) => {
  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1.5,
        width: "100%",
      }}
    >
      {formInputs.map(
        (input: {
          name: string
          type: string
          label: string
          placeholder: string
        }) => (
          <TextField
            color="primary"
            placeholder={input.placeholder}
            size="small"
            key={input.name}
            label={input.label}
            type={input.type}
            value={state[input.name]}
            onChange={e =>
              setState({
                ...state,
                [input.name]: e.target.value,
              })
            }
          />
        ),
      )}
      <SimpleButton type="submit" text={submitText} size="medium" />
      {children}
    </Box>
  )
}

export default ReusableForm
