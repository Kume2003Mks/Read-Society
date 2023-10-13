import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

import './Style/Core_Style.css'
import { AuthProvider } from './function/context/AuthContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
)
