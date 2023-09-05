import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import './Style/Core_Style.css'
import Home from './pages/Home.tsx'
import Explore from './pages/Explore.tsx'
import Collection from './pages/Collection.tsx'
import Community from './pages/Community.tsx'
import LoginPage from './pages/LoginPage.tsx'
import RegisterPage from './pages/RegisterPage.tsx'
import ErrorPage from './pages/ErrorPage.tsx'

const router = createBrowserRouter([
  { 
    path : "/",
    element : <Home/>
  },
  { 
    path : "explore",
    element : <Explore/>
  },
  { 
    path : "collection",
    element : <Collection/>
  },
  { 
    path : "community",
    element : <Community/>
  },
  {
    path : "login",
    element : <LoginPage/>
  },
  {
    path : "register",
    element : <RegisterPage/>
  },
  {
    path : "*",
    element : <ErrorPage/>
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
