import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import { AuthProvider } from './function/context/AuthContext.tsx';

import './Style/Core_Style.css'
import Home from './pages/Home.tsx'
import Explore from './pages/Explore.tsx'
import Collection from './pages/Collection.tsx'
import Community from './pages/Community/Community.tsx'
import My_Creation  from './pages/My_Creation.tsx';
import LoginPage from './pages/LoginPage.tsx'
import RegisterPage from './pages/RegisterPage.tsx'
import ErrorPage from './pages/ErrorPage.tsx'
import Profile from './pages/Community/Children_pages/Profile.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/explore",
    element: <Explore />
  },
  {
    path: "/collection",
    element: <Collection />
  },
  {
    path: "/community",
    element: <Outlet/>,
        children: [
      {
        path: '',
        element: <Community />,
      },
      {
        path: 'profile/:id',
        element: <Profile />,
      },
    ],
  },
  {
    path: "/mycreation",
    element: <My_Creation />
  },
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/register",
    element: <RegisterPage />
  },
  {
    path: "*",
    element: <ErrorPage />
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
