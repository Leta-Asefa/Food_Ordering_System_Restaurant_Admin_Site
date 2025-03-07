import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './output.css'
import { SocketContextProvider } from './contexts/SocketContext.jsx'
import { AuthUserContextProvider } from './contexts/AuthUserContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthUserContextProvider>
      <SocketContextProvider>
        <App />
      </SocketContextProvider>
    </AuthUserContextProvider>
  </StrictMode>
)
