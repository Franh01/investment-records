import "./App.css"

import { BrowserRouter, Route, Routes } from "react-router-dom"

import Home from "./pages/Home"
import Layout from "@components/Layout"
import Login from "./pages/Login"
import StockDetails from "@pages/StockDetails"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          {/* <Route path="/transactions" element={<Transactions />} /> */}
          <Route path="/stocks/:symbol" element={<StockDetails />} />
          {/* <Route path="/reports" element={<Reports />} /> */}
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
