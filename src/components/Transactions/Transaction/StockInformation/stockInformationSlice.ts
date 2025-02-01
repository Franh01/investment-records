import type { IStockInformation } from "@interfaces/index"
import type { RootState } from "@app/store"
import { createAppSlice } from "@app/createAppSlice"
import { getStockInformationBySymbols } from "./stockInformationAPI"

export interface StockInformationSliceSliceState {
  stocksInformation: { [key: string]: IStockInformation }
  status: "idle" | "loading" | "failed"
}

const initialState: StockInformationSliceSliceState = {
  stocksInformation: {},
  status: "idle",
}

const createObjectFromArray = (arr: IStockInformation[]) => {
  const obj: { [key: string]: IStockInformation } = {}
  arr.forEach((item: IStockInformation) => {
    obj[item.symbol] = item
  })
  return obj
}

// If you are not using async thunks you can use the standalone `createSlice`.
export const stockInformationSlice = createAppSlice({
  name: "stockInformation",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: create => ({
    getAllStocksInformation: create.asyncThunk(
      async (_, thunkAPI) => {
        const { transaction } = thunkAPI.getState() as RootState
        console.log(" second")

        const symbolsByTransactions = transaction.transactions.map(
          transaction => transaction.ticker,
        )

        const settedSymbols = new Set(symbolsByTransactions)

        const uniqueSymbols = Array.from(settedSymbols)

        const response = await getStockInformationBySymbols(uniqueSymbols)
        // The value we return becomes the `fulfilled` action payload
        return response
      },
      {
        pending: state => {
          state.status = "loading"
        },
        fulfilled: (state, action) => {
          state.status = "idle"
          state.stocksInformation = createObjectFromArray(action.payload)
        },
        rejected: state => {
          state.status = "failed"
          state.stocksInformation = initialState.stocksInformation
        },
      },
    ),
  }),
  // You can define your selectors here. These selectors receive the slice
  // state as their first argument.
  selectors: {
    selectStatus: stockInformation => stockInformation.status,
    selectStockInformations: stockInformation =>
      stockInformation.stocksInformation,
  },
})

// Action creators are generated for each case reducer function.
export const { getAllStocksInformation } = stockInformationSlice.actions

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectStatus, selectStockInformations } =
  stockInformationSlice.selectors

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
