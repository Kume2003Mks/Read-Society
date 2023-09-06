import './auth.css'
import { Link, useNavigate } from 'react-router-dom'
import { Icon } from '@iconify/react';
import React, { useState } from 'react';

const LoginBox: JSX.ElementType = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleRegisterPage = (): void => {
    navigate('/register');
  }

  // Validation functions
  const validateForm = () => {
    const newErrors = {
      email: '',
      password: '',
    };

    if (!email.trim()) {
      newErrors.email = 'Plese Enter Your Email';
    } else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/.test(email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    setErrors(newErrors);

    return Object.values(newErrors).every((error) => !error);
  }


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {

      //firebase data

      console.log('Login successfully');
    }
  }

  return (
    <form className="mainbox gap-y-2">

      <h1 style={{ textAlign: 'center', marginTop: '1rem' }}>Login</h1>
      {/**Email */}
      <div className="from-layout">
        <div className="input-wrapper">
          <label>
            <Icon icon="ic:round-mail" className="icon-from" />
          </label>
          <input
            type="email"
            className="input-from"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="error">{errors.email}</div>
      </div>
      {/**Password */}
      <div className="from-layout">
        <div className="input-wrapper">
          <label>
            <Icon icon="mdi:lock" className="icon-from" />
          </label>
          <input
            type={showPassword ? 'text' : 'password'}
            className="input-from"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} />
          <div
            onClick={handleTogglePassword}
            className="password-toggle-button">
              <Icon icon={showPassword ? 'mdi:eye-off' : 'mdi:eye'} className="icon-from" />
          </div>
        </div>
        <div className="error">{errors.password}</div>
      </div>
      <div className="from-layout-password">
        <Link to="#">Forgotten Password</Link>
      </div>
      <div style={{ width: '80%', marginBottom: '2rem', marginTop: '0.5rem' }}>
        <button type="submit" className="login-btn" style={{ marginBottom: '1rem' }} onClick={handleSubmit}>Login</button>
        <button className="Register-btn" onClick={handleRegisterPage}>Register</button>
      </div>
    </form>

  )
}

export default LoginBox