import { createBrowserRouter, RouterProvider, Outlet, Navigate } from 'react-router-dom';
import { useAuth } from './function/context/AuthContext.tsx';
import { ProtectRouteProps } from './function/DeclareType.ts'

import Home from './pages/Home.tsx'
import Explore from './pages/Explore.tsx'
import Collection from './pages/Collection.tsx'
import Community from './pages/Community/Community.tsx'
import My_Creation from './pages/Creation/My_Creation.tsx';
import LoginPage from './pages/User/LoginPage.tsx'
import RegisterPage from './pages/User/RegisterPage.tsx'
import ErrorPage from './pages/ErrorPage.tsx'
import C_Profile from './pages/Community/C_Profile.tsx';
import Navigation from './components/navigation/Navigation.tsx';
import EditProfile from './pages/User/EditProfile.tsx';
import Security from './pages/User/Security.tsx';
import Help from './pages/User/Help.tsx';
import Upload from './pages/Creation/Upload.tsx';
import Deleted from './pages/Creation/Deletedpage.tsx';
import ResetPassword from './pages/User/ResetPassword.tsx';
import BookDetails from './pages/Books/BookDetails.tsx';
import Upload_EP from './pages/Creation/Upload_EP.tsx';
import Edit_Book from './pages/Creation/Edit_Book.tsx';
import Edit_Ep from './pages/Creation/Edit_Ep.tsx';
import Read from './pages/Books/Read.tsx';

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

    const ProtectRoute: React.FC<ProtectRouteProps> = ({ user, children }) => {
        return user ? children : <Navigate to='/' />;
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
            ],
        },
        {
            path: "/book-detail",
            element: <Layout />,
            children: [
                {
                    path: ':book_id',
                    element: <BookDetails />,
                },
                {
                    path: 'read/:book_id/:ep_id',
                    element: <Read />,
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
                    path: 'profile/:user_id',
                    element: <C_Profile />,
                },
            ],
        },
        {
            path: "/mycreation",
            element: (
                <ProtectRoute user={isLoggedIn}>
                    <Layout />
                </ProtectRoute>),
            children: [
                {
                    path: 'mybooks',
                    element: <My_Creation />,
                },
                {
                    path: 'upload',
                    element: <Outlet />,
                    children: [
                        {
                            path: '',
                            element: <Upload />,
                        },
                        {
                            path: 'ep/:upload_id',
                            element: <Upload_EP />,
                        }
                    ]
                },
                {
                    path: 'deleted',
                    element: <Deleted />,
                },
                {
                    path: 'edited',
                    element: <Outlet />,
                    children: [
                        {
                            path: 'book/:editbook_id',
                            element: <Edit_Book />,
                        },
                        {
                            path: 'ep/:editbook_id/:editep_id',
                            element: <Edit_Ep />,
                        }
                    ]
                },
            ],
        },
        {
            path: "/user",
            element: <Layout />,
            children: [
                {
                    path: "login",
                    element: <ProtectRoute user={!isLoggedIn}><LoginPage /></ProtectRoute>
                },
                {
                    path: "register",
                    element: <ProtectRoute user={!isLoggedIn}><RegisterPage /></ProtectRoute>
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

export default App;