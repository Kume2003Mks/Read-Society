import LoginBox from "../../components/Auth_component/LoginBox";
import '../../Style/Global.css'
import { useAuth } from '../../function/context/AuthContext'

const LoginPage: JSX.ElementType = () => {

    const { isLoggedIn } = useAuth();

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