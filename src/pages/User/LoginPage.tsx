import LoginBox from "../../components/Auth_component/LoginBox";
import '../../Style/Global.css'
import { useAuth } from '../../function/context/AuthContext'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'


const LoginPage: JSX.ElementType = () => {

    const { isLoggedIn } = useAuth();

    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn === true) {
            navigate('/');
        }
    },[isLoggedIn])


    return (
        <>
            <main className="blackground-css">
                {isLoggedIn ? (
                    <>Your login</>
                ) : (
                    <>
                        <LoginBox />
                    </>
                )}

            </main>
        </>
    )
}

export default LoginPage