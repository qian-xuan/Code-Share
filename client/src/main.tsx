import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { GlobalThemeProvider } from './contexts/GlobalThemeContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GlobalThemeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GlobalThemeProvider>
  </StrictMode>,
)
