import "./App.css"

import { BrowserRouter, Route, Routes } from "react-router-dom"

import StockDetails from "@components/StockDetails"
import Transactions from "./components/Transactions"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Transactions />} />
        {/* <Route path="/transactions" element={<Transactions />} /> */}
        <Route path="/stocks/:symbol" element={<StockDetails />} />
        {/* <Route path="/reports" element={<Reports />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
