import "./App.css"

import { BrowserRouter, Route, Routes } from "react-router-dom"

import Home from "./pages/Home"
import StockDetails from "@components/StockDetails"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Home />} />
        {/* <Route path="/transactions" element={<Transactions />} /> */}
        <Route path="/stocks/:symbol" element={<StockDetails />} />
        {/* <Route path="/reports" element={<Reports />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
