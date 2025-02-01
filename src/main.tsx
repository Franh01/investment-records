import "./index.css"

import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment"
import App from "./App"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { Provider } from "react-redux"
import { createRoot } from "react-dom/client"
import { store } from "./app/store"

const container = document.getElementById("root")

if (container) {
  const root = createRoot(container)

  root.render(
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Provider store={store}>
        <App />
      </Provider>
    </LocalizationProvider>,
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}
