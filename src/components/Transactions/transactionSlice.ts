import type { ITransaction } from "../../interfaces"
import type { RootState } from "../../app/store"
import { createAppSlice } from "../../app/createAppSlice"
import { createTransaction } from "./transactionAPI"
import moment from "moment"
import uuidv4 from "@helpers/uuidv4"

export interface TransactionSliceState {
  formValue: ITransaction
  transactions: ITransaction[]
  status: "idle" | "loading" | "failed"
}

const storedTransactions = localStorage.getItem("transactions")
const initialTransactions = storedTransactions
  ? JSON.parse(storedTransactions)
  : [] // Si no hay datos en localStorage, usa un array vacío

const initialState: TransactionSliceState = {
  formValue: {
    id: uuidv4(),
    date: moment().toISOString(),
    amount: 0,
    type: "buy",
    price: 0,
    comission: 0,
  },
  transactions: initialTransactions,
  status: "idle",
}

// If you are not using async thunks you can use the standalone `createSlice`.
export const transactionSlice = createAppSlice({
  name: "transaction",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: create => ({
    createForm: create.asyncThunk(
      async (formData: ITransaction, thunkAPI) => {
        const { transaction } = thunkAPI.getState() as RootState

        const response = await createTransaction(
          formData,
          transaction.transactions,
        )
        // The value we return becomes the `fulfilled` action payload
        return response.data
      },
      {
        pending: state => {
          state.status = "loading"
        },
        fulfilled: (state, action) => {
          state.status = "idle"
          state.formValue = {
            ...initialState.formValue,
            id: uuidv4(), // Genera un nuevo ID para la próxima transacción
            date: moment().toISOString(), // Actualiza la fecha
          }
          state.transactions.push(action.payload)
        },
        rejected: state => {
          state.status = "failed"
          state.formValue = initialState.formValue
        },
      },
    ),
  }),
  // You can define your selectors here. These selectors receive the slice
  // state as their first argument.
  selectors: {
    selectInitialFormValue: transaction => transaction.formValue,
    selectInitialStatus: transaction => transaction.status,
    selectTransactions: transaction => transaction.transactions,
  },
})

// Action creators are generated for each case reducer function.
export const { createForm } = transactionSlice.actions

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const {
  selectInitialFormValue,
  selectInitialStatus,
  selectTransactions,
} = transactionSlice.selectors

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
