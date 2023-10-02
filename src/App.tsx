import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import { AuthProvider } from './function/context/AuthContext.tsx';

import Home from './pages/Home.tsx'
import Explore from './pages/Explore.tsx'
import Collection from './pages/Collection.tsx'
import Community from './pages/Community/Community.tsx'
import My_Creation from './pages/My_Creation.tsx';
import LoginPage from './pages/User/LoginPage.tsx'
import RegisterPage from './pages/User/RegisterPage.tsx'
import ErrorPage from './pages/ErrorPage.tsx'
import Profile from './pages/Community/Children_pages/Profile.tsx';
import Nav from './components/nevigation/NavBar.tsx';



const App = () => {

    const Layout = () => {
        return (
            <>
                <Nav />
                <Outlet />
            </>
        )
    }

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Home />
        },
        {
            path: "/explore",
            element: <Layout />,
            children: [
                {
                    path: '',
                    element: <Explore />,
                },
                {
                    path: 'books/:id',
                    element: <div />,
                },
            ],
        },
        {
            path: "/collection",
            element: <Collection />
        },
        {
            path: "/community",
            element: <Layout />,
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
            path: "/user",
            element: <Layout />,
            children: [
                {
                    path: "login",
                    element: <LoginPage />
                },
                {
                    path: "register",
                    element: <RegisterPage />
                },
            ],
        },
        {
            path: "*",
            element: <ErrorPage />
        },
    ]);

    return (
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    )
}

export default App