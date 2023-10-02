import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import { AuthProvider } from './function/context/AuthContext.tsx';

import Home from './pages/Home.tsx'
import Explore from './pages/Explore.tsx'
import Collection from './pages/Collection.tsx'
import Community from './pages/Community/Community.tsx'
import My_Creation from './pages/Creation/My_Creation.tsx';
import LoginPage from './pages/User/LoginPage.tsx'
import RegisterPage from './pages/User/RegisterPage.tsx'
import ErrorPage from './pages/ErrorPage.tsx'
import Profile from './pages/Community/Profile.tsx';
import Navigation from './components/navigation/Navigation.tsx';
import EditProfile from './pages/User/EditProfile.tsx';
import Security from './pages/User/Security.tsx';
import Help from './pages/User/Help.tsx';

const App = () => {

    const Layout = () => {
        return (
            <>
                <Navigation />
                <Outlet />
            </>
        )
    }

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout />,
            children: [
                {
                    path: '',
                    element: <Home />,
                }
            ],
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
            element: <Layout />,
            children: [
                {
                    path: '',
                    element: <Collection />,
                },
            ],
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
            element: <Layout />,
            children: [
                {
                    path: '',
                    element: <My_Creation />,
                },
            ],
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
                {
                    path: "profile",
                    element: <EditProfile />
                },
                {
                    path: "security",
                    element: <Security />
                },
                {
                    path: "help",
                    element: <Help />
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