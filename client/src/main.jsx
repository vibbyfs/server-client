import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx'
import { SocketProvider } from './contexts/SocketContext.jsx'
import HistoryRouter from './router/HistoryRouter.jsx'
import { createBrowserHistory } from 'history'

const history = createBrowserHistory()

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HistoryRouter history={history}>
      <AuthProvider>
        <SocketProvider>
          <App />
        </SocketProvider>
      </AuthProvider>
    </HistoryRouter>
  </React.StrictMode>
)
