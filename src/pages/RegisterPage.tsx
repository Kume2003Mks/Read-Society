
import Nav from '../components/nevigation/NavBar'
import RegisterBox from '../components/Auth_component/RegisterBox'
import '../Style/Global.css'

const RegisterPage: JSX.ElementType = () => {
    return (
        <>
        <Nav />
            <main className="blackground-css">
                <RegisterBox />
            </main>
        </>

    )
}

export default RegisterPage