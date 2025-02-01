import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  TextField,
  Typography,
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
      name: "ticker",
      type: "text",
    },
    {
      name: "amount",
      type: "number",
    },
    {
      name: "price",
      type: "number",
    },
    {
      name: "comission",
      type: "number",
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
    <Modal open={isCreating} onClose={() => setIsCreating(false)}>
      <Paper>
        <Typography variant="h2">Transaction Form</Typography>
        <Typography>{status}</Typography>
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
            label="Select date"
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
            <InputLabel id="type-selector">Type</InputLabel>
            <Select
              labelId="type-selector"
              id="type-selector"
              value={formValues.type}
              label="Type"
              onChange={e =>
                setFormValues({
                  ...formValues,
                  type: e.target.value as ITransaction["type"],
                })
              }
            >
              <MenuItem value={"buy"}>Buy</MenuItem>
              <MenuItem value={"sell"}>Sell</MenuItem>
            </Select>
          </FormControl>

          {formInputs.map((input: { name: string; type: string }) => (
            <TextField
              key={input.name}
              label={input.name}
              type={input.type}
              value={formValues[input.name]}
              onChange={e =>
                setFormValues({
                  ...formValues,
                  [input.name]: e.target.value,
                })
              }
            />
          ))}
          <Button
            variant="contained"
            type="submit"
            disabled={status === "loading"}
          >
            Add transaction
          </Button>
        </Box>
      </Paper>
    </Modal>
  )
}
