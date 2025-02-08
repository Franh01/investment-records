import {
  Box,
  Button,
  FormControl,
  InputLabel,
  LinearProgress,
  MenuItem,
  Modal,
  Paper,
  Select,
  TextField,
} from "@mui/material"
import {
  createTransaction,
  selectInitialFormValue,
  selectInitialStatus,
} from "../transactionSlice"
import { useAppDispatch, useAppSelector } from "@app/hooks"

import { DatePicker } from "@mui/x-date-pickers"
import type { ITransaction } from "@interfaces/index"
import moment from "moment"
import { useState } from "react"

interface ITransactionFormProps {
  isCreating: boolean
  setIsCreating: React.Dispatch<React.SetStateAction<boolean>>
}
export const TransactionForm = ({
  isCreating,
  setIsCreating,
}: ITransactionFormProps) => {
  const dispatch = useAppDispatch()
  const initialValue = useAppSelector(selectInitialFormValue)
  const status = useAppSelector(selectInitialStatus)

  const [formValues, setFormValues] = useState<ITransaction>(initialValue)

  const formInputs = [
    {
      name: "symbol",
      type: "text",
      label: "Símbolo",
    },
    {
      name: "amount",
      type: "number",
      label: "Cantidad",
    },
    {
      name: "price",
      type: "number",
      label: "Precio",
    },
    {
      name: "comission",
      type: "number",
      label: "Comisión",
    },
  ]

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = {
      ...formValues,
      amount: Number(formValues.amount),
      price: Number(formValues.price),
      comission: Number(formValues.comission),
    }
    dispatch(createTransaction(formData))
    setFormValues(initialValue)
    setIsCreating(false)
  }

  return (
    <Modal
      open={isCreating}
      onClose={() => setIsCreating(false)}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper>
        {status === "loading" && <LinearProgress />}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            p: 2,
            gap: 2,
          }}
        >
          <DatePicker
            disableFuture
            label="Fecha"
            value={moment(formValues.date)}
            onChange={newValue => {
              setFormValues({
                ...formValues,
                date: newValue
                  ? newValue.toISOString()
                  : moment().toISOString(),
              })
            }}
          />
          <FormControl>
            <InputLabel id="type-selector">Tipo</InputLabel>
            <Select
              labelId="type-selector"
              id="type-selector"
              value={formValues.type}
              label="Tipo"
              onChange={e =>
                setFormValues({
                  ...formValues,
                  type: e.target.value as ITransaction["type"],
                })
              }
            >
              <MenuItem value={"buy"}>Compra</MenuItem>
              <MenuItem value={"sell"}>Venta</MenuItem>
            </Select>
          </FormControl>

          {formInputs.map(
            (input: { name: string; type: string; label: string }) => (
              <TextField
                key={input.name}
                label={input.label}
                type={input.type}
                value={formValues[input.name]}
                onChange={e =>
                  setFormValues({
                    ...formValues,
                    [input.name]: e.target.value,
                  })
                }
              />
            ),
          )}
          <Button
            variant="contained"
            type="submit"
            disabled={status === "loading"}
          >
            Añadir operación
          </Button>
        </Box>
      </Paper>
    </Modal>
  )
}
