import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { PrimeReactProvider } from 'primereact/api'
import { Toaster } from "sileo"
import 'sileo/styles.css'
import 'primereact/resources/themes/lara-light-blue/theme.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import './index.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PrimeReactProvider>
      <BrowserRouter>
        <Toaster position="bottom-right" />
        <App />
      </BrowserRouter>
    </PrimeReactProvider>
  </StrictMode>
)
