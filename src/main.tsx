import "./index.css"

import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment"
import App from "./App"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { Provider } from "react-redux"
import { ThemeProvider } from "@mui/material/styles"
import { createRoot } from "react-dom/client"
import { store } from "./app/store"
import { theme } from "./MUITheme"

const container = document.getElementById("root")

//Define MUI styles

if (container) {
  const root = createRoot(container)

  root.render(
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <App />
        </Provider>
      </ThemeProvider>
    </LocalizationProvider>,
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}
