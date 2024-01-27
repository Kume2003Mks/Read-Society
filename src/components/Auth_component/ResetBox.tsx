import './auth.css'
import { Icon } from '@iconify/react';
import React, { useState } from 'react';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import Swal from 'sweetalert2';

const ResetBox: JSX.ElementType = () => {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({
    email: '',
  });

  const validateForm = () => {
    const newErrors = {
      email: '',
    };
    if (!email.trim()) {
      newErrors.email = 'Plese Enter Your Email';
    } else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/.test(email)) {
      newErrors.email = 'Invalid email format';
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
        const auth = getAuth();
        sendPasswordResetEmail(auth, email)
          .then(() => {
            Swal.fire({
                title: '<strong>Send email</strong>',
                icon: 'success',
                confirmButtonText: '<h1>Ok</h1>',
                timer: 3000,
                timerProgressBar: true,
            })
          })
          .catch((error) => {
            console.error(error.message)
            Swal.fire({
              title: '<strong>user not found</strong>',
              icon: 'warning',
              confirmButtonText: '<h1>Ok</h1>',
              timer: 3000,
              timerProgressBar: true,
          })
          });
    }
  }

  return (
    <form className="mainbox gap-y-2">
      <h1 style={{ textAlign: 'center', marginTop: '1rem' }}>Reset Password</h1>
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
      <div style={{ width: '80%', marginBottom: '2rem', marginTop: '0.5rem' }}>
        <div className="login-btn" style={{ marginBottom: '1rem' }} onClick={handleSubmit}>Reset Password</div>
      </div>
    </form>
  )
}

export default ResetBox