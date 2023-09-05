import './auth.css'
import { useNavigate } from 'react-router-dom'
import { Icon } from '@iconify/react';

const RegisterBox: JSX.ElementType = () => {

    const navigate = useNavigate();

    const handleLoginPage = (): void => {
        navigate('/login');
    }

    return (
        
        <form className="mainbox gap-y-2">

            <h1 style={{ textAlign: 'center', marginTop: '1rem', marginBottom: '1rem' }}>Register</h1>
            {/* First Name & Last Name*/}

            <div className="register-btn-layout" style={{ marginBottom: '0.5rem', marginTop: '0.5rem' }} >
                <div className="from-layout" style={{ width: '100%', margin: 0 }}>
                    <label>
                        <Icon icon="mdi:pencil" className="icon-from" />
                    </label>
                    <input type="text" className="input-from" placeholder="First Name" />
                </div>
                <div className="from-layout" style={{ width: '100%', margin: 0 }}>
                    <label>
                        <Icon icon="mdi:pencil" className="icon-from" />
                    </label>
                    <input type="text" className="input-from" placeholder="Last Name" />
                </div>
            </div>
            {/* User Name */}
            <div className="from-layout">
                <label>
                    <Icon icon="wpf:name" className="icon-from" />
                </label>
                <input type="text" className="input-from" placeholder="Username" />

            </div>
            {/* Email */}
            <div className="from-layout">
                <label>
                    <Icon icon="ic:round-mail" className="icon-from" />
                </label>
                <input type="email" className="input-from" placeholder="Email" />

            </div>
            {/* Password */}
            <div className="from-layout">
                <label>
                    <Icon icon="mdi:lock" className="icon-from" />
                </label>

                <input type="password" className="input-from" placeholder="Password" />

            </div>
            {/* Confirm Password */}
            <div className="from-layout" >
                <label>
                    <Icon icon="mdi:password-check" className="icon-from" />
                </label>

                <input type="password" className="input-from" placeholder="Confirm Password" />
            </div>
            <div className="register-btn-layout" style={{ margin: '1rem', marginBottom:'2rem'}}>
                <div style={{ flex: 1, marginRight: '0.5rem' }}>
                    <button type="submit" className="login-btn" >Register</button>
                </div>

                <div style={{ flex: 1, marginLeft: '0.5rem' }}>
                    <button className="Register-btn" onClick={handleLoginPage}>Cancel</button>
                </div>
            </div>

        </form>
    )
}

export default RegisterBox