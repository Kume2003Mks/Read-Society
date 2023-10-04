import RegisterBox from '../../components/Auth_component/RegisterBox'
import '../../Style/Global.css'
import { useAuth } from '../../function/context/AuthContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

const RegisterPage: JSX.ElementType = () => {
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
                    <div className='flex-row items-center align-middle'>
                        <h1 onClick={() => window.location.reload()} className='text-2xl'>Regiser Complete</h1>
                        <h2 onClick={() => window.location.reload()} className='text-center text-red-800 cursor-pointer'>
                            Go Homepage
                            </h2>

                    </div>
                ) : (
                    <>
                        <RegisterBox />
                    </>
                )}

            </main>
        </>

    )
}

export default RegisterPage