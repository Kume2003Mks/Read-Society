import './auth.css'
import { Link, useNavigate } from 'react-router-dom'
import { Icon } from '@iconify/react';

const LoginBox: JSX.ElementType = () => {

  const navigate = useNavigate();

  const handleRegisterPage = (): void => {
    navigate('/register');
  }

  return (
    <form className="mainbox gap-y-2">

      <h1 style={{ textAlign: 'center', marginTop: '1rem' }}>Login</h1>

      <div className="from-layout">
        <label><Icon icon="ic:round-mail" className="icon-from" /></label>
        <input type="email" className="input-from" placeholder="Email" />

      </div>
      <div className="from-layout">
        <label><Icon icon="mdi:lock" className="icon-from" /></label>
        <input type="password" className="input-from" placeholder="Password" />
      </div>
      <div className="from-layout-password">
        <Link to="#">Forgotten Password</Link>
      </div>
      <div style={{ width: '80%', marginBottom: '2rem', marginTop: '0.5rem' }}>
        <button type="submit" className="login-btn" style={{ marginBottom: '1rem' }}>Login</button>
        <button className="Register-btn" onClick={handleRegisterPage}>Register</button>
      </div>
    </form>

  )
}

export default LoginBox