import { CssBaseline, ThemeProvider } from '@mui/material'
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import { ColorModeContext, useMode } from './theme'
import { Provider } from 'react-redux';
import store from "./store"
import Routing from './pages/router'
import "react-toastify/dist/ReactToastify.css"

const App = () => {
  const [theme, colorMode] = useMode()
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <ToastContainer />
            <CssBaseline />
            <Routing />
          </ThemeProvider>
        </ColorModeContext.Provider>
      </BrowserRouter>
    </Provider>
  )
}

export default App
