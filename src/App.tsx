import { createBrowserRouter, RouterProvider, Outlet, Navigate } from 'react-router-dom'
import { useAuth } from './function/context/AuthContext.tsx';

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
import Upload from './pages/Creation/Upload.tsx';
import Deleted from './pages/Creation/Deletedpage.tsx';
import { ProtectRouteProps } from './function/DeclareType.ts'
import ResetPassword from './pages/User/ResetPassword.tsx';

const App = () => {

    const { isLoggedIn } = useAuth();

    const Layout = () => {
        return (
            <>
                <Navigation />
                <Outlet />
            </>
        )
    }

    const ProtectuserRoute : React.FC<ProtectRouteProps> = ({ user, children }) => {
        if (user === true) {
            return <Navigate to="/" />;
          }
          return children;
    }

    const ProtectRoute : React.FC<ProtectRouteProps>  = ({ user, children }) => {
        if (user === false) {
            return <Navigate to="/" />;
          }
          return children;
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
                    element: <ProtectRoute user={isLoggedIn}><Collection /></ProtectRoute>,
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
            element: <ProtectRoute user={isLoggedIn}><Layout /></ProtectRoute>,
            children: [
                {
                    path: 'mybooks',
                    element: <My_Creation />,
                },
                {
                    path: 'upload',
                    element: <Upload />,
                },
                {
                    path: 'deleted',
                    element: <Deleted />,
                },
            ],
        },
        {
            path: "/user",
            element: <Layout />,
            children: [
                {
                    path: "login",
                    element: <ProtectuserRoute user={isLoggedIn}><LoginPage /></ProtectuserRoute>
                },
                {
                    path: "register",
                    element: <ProtectuserRoute user={isLoggedIn}><RegisterPage /></ProtectuserRoute>
                },
                {
                    path: "profile",
                    element: <ProtectRoute user={isLoggedIn}><EditProfile /></ProtectRoute>
                },
                {
                    path: "security",
                    element: <ProtectRoute user={isLoggedIn}><Security /></ProtectRoute>
                },
                {
                    path: "help",
                    element: <ProtectRoute user={isLoggedIn}><Help /></ProtectRoute>
                },
                {
                    path: "forgot-password",
                    element: <ResetPassword />
                },
            ],
        },
        {
            path: "*",
            element: <ErrorPage />
        },
    ]);

    return (
            <RouterProvider router={router} />
    )
}

export default App