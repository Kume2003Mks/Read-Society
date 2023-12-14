import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

import './Style/Core_Style.css'
import { AuthProvider } from './function/context/AuthContext.tsx'
import { ThemeProvider } from './function/context/ThemeContext.tsx'
import { MybookProvider } from './function/context/BooksContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <MybookProvider>
          <App />
        </MybookProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
)
