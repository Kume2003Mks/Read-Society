import './auth.css'
import { useNavigate } from 'react-router-dom'
import { Icon } from '@iconify/react';
import React, { useState } from 'react';
import authentication from '../../function/authentication.ts';

const RegisterBox: JSX.ElementType = () => {
    const navigate = useNavigate();
    const getRegister = new authentication();

    // State variables for form inputs and errors
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConPassword, setConShowPassword] = useState(false);

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleToggleConshowPassword = () => {
        setConShowPassword(!showConPassword);
    };

    const handleLoginPage = (): void => {
        navigate('/login');
    }

    // Validation functions
    const validateForm = () => {
        const newErrors = {
            firstName: '',
            lastName: '',
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
        };

        if (!firstName.trim()) {
            newErrors.firstName = 'Plese Enter Your Firstname';
        }

        if (!lastName.trim()) {
            newErrors.lastName = 'Plese Enter Your Lastname';
        }

        if (!username.trim()) {
            newErrors.username = 'Plese Enter Your Username';
        }

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

        if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);

        return Object.values(newErrors).every((error) => !error);
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            getRegister.register(email, password, firstName, lastName, username)
            navigate('/login')
            console.log('Form submitted successfully');
        }
    }

    return (
        <form className="mainbox gap-y-2" onSubmit={handleSubmit}>
            <h1 style={{ textAlign: 'center', marginTop: '1rem', marginBottom: '1rem' }}>Register</h1>
            {/* First Name & Last Name */}
            <div className="register-btn-layout" style={{ marginBottom: '0.5rem', marginTop: '0.5rem' }}>
                <div className="from-layout" style={{ width: '100%', margin: 0 }}>
                    <div className="input-wrapper">
                        <label>
                            <Icon icon="mdi:pencil" className="icon-from" />
                        </label>
                        <input type="text" className="input-from" placeholder="First Name"
                            value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    </div>
                    <div className="error">{errors.firstName}</div>
                </div>
                <div className="from-layout" style={{ width: '100%', margin: 0 }}>
                    <div className="input-wrapper">
                        <label>
                            <Icon icon="mdi:pencil" className="icon-from" />
                        </label>
                        <input type="text" className="input-from" placeholder="Last Name"
                            value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    </div>
                    <div className="error">{errors.lastName}</div>
                </div>
            </div>
            {/* User Name */}

            <div className="from-layout">
                <div className="input-wrapper">
                    <label>
                        <Icon icon="wpf:name" className="icon-from" />
                    </label>
                    <input type="text" className="input-from" placeholder="Username"
                        value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="error">{errors.username}</div>
            </div>

            {/* Email */}
            <div className="from-layout">
                <div className="input-wrapper">
                    <label>
                        <Icon icon="ic:round-mail" className="icon-from" />
                    </label>
                    <input type="email" className="input-from" placeholder="Email"
                        value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="error">{errors.email}</div>
            </div>

            {/* Password */}
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

            {/* Confirm Password */}
            <div className="from-layout" >

                <div className="input-wrapper">
                    <label>
                        <Icon icon="mdi:password-check" className="icon-from" />
                    </label>
                    <input
                        type={showConPassword ? 'text' : 'password'}
                        className="input-from"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)} />
                    <div
                        onClick={handleToggleConshowPassword}
                        className="password-toggle-button">
                        <Icon icon={showConPassword ? 'mdi:eye-off' : 'mdi:eye'} className="icon-from" />
                    </div>
                </div>
                <div className="error">{errors.confirmPassword}</div>
            </div>
            {/* Regis*/}
            <div className="register-btn-layout" style={{ margin: '1rem', marginBottom: '2rem' }}>
                <div style={{ flex: 1, marginRight: '0.5rem' }}>
                    <button type="submit" className="login-btn" onClick={handleSubmit}>Register</button>
                </div>
                <div style={{ flex: 1, marginLeft: '0.5rem' }}>
                    <button className="Register-btn" onClick={handleLoginPage}>Cancel</button>
                </div>
            </div>
        </form>
    )
}

export default RegisterBox;