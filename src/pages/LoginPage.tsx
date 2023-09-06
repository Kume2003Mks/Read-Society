import Nav from "../components/nevigation/NavBar"
import LoginBox from "../components/Auth_component/LoginBox";
import '../Style/Global.css'


const LoginPage: JSX.ElementType = () => {

    return (
        <>
            <Nav />
            <main className="blackground-css">
                <LoginBox />
            </main>
        </>
    )
}

export default LoginPage