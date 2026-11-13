import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/roboto'
import '@fontsource-variable/roboto/wght-italic.css'
import '@fontsource-variable/jost'
import './styles/index.css'
import App from './App'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
