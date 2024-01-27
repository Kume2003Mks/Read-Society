import styles from '../../Style/form.module.css'
import '../../Style/Global.css'
import Sidebarnav from '../../components/navigation/Sidebarnav'
import { useState } from 'react'
// import { useAuth } from '../../function/context/AuthContext'
import { Icon } from '@iconify/react'

const Security = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [oldpassword, setOldPassword] = useState('')
  const [newpassword, setNewPassword] = useState('')
  const [conpassword, setConPassword] = useState('')

  const [showConPassword, setConShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showOldPassword, setOldShowPassword] = useState(false);
  const [showPassword, setshowPassword] = useState(false);
  const [mailerrors, setmailErrors] = useState({
    email: '',
    password: '',
  });
  const [passerrors, setpassErrors] = useState({
    oldpassword: '',
    newpassword: '',
    conpassword: '',
  });

  const validateFormChangeMail = () => {
    const newErrors = {
      email: '',
      password: '',
    };
    if (!email.trim()) {
      newErrors.email = 'Plese Enter Your Email';
    } else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/.test(email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!password.trim()) {
      newErrors.password = 'Password is required';
    }
    setmailErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  }

  const validateFormChangePasswrd = () => {
    const newErrors = {
      oldpassword: '',
      newpassword: '',
      conpassword: '',
    };

    if (!oldpassword) {
      newErrors.oldpassword = 'Password is required';
    }
    if (!newpassword) {
      newErrors.newpassword = 'Password is required';
    } else if (password.length < 8) {
      newErrors.newpassword = 'Password must be at least 8 characters';
    }
    if (newpassword !== conpassword) {
      newErrors.conpassword = 'Passwords do not match';
    }

    setpassErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  }

  const Emailchange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateFormChangeMail()) {
      alert(email)
    }
  }
  const Passwordchange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateFormChangePasswrd()) {
      alert('45')
    }
  }

  return (
      <main className="flex-row h-screen justify-between flex p-container">
        <Sidebarnav />
        <div className="flex flex-1 p-8 flex-row">
          <div className={styles.container}>
            <h1 className='text-4xl font-bold'>Password & Security</h1>
            <form className='w-1/2 flex flex-col'>
              <h2 className='text-xl font-bold'>Change Email</h2>
              <p className='mt-2'>Email</p>
              <div className={styles.input_container}>
                <input type="text"
                  placeholder='Email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className={styles.error}>{mailerrors.email}</div>
              <p className='mt-2'>Password</p>
              <div className={styles.input_container}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder='Password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} />
                <div
                  onClick={() => setshowPassword(!showPassword)}
                  className={styles.toggle_btn}>
                  <Icon icon={showPassword ? 'mdi:eye-off' : 'mdi:eye'} className="icon-from" />
                </div>
              </div>
              <div className={styles.error}>{mailerrors.password}</div>
              <div className={styles.confirm_btn} onClick={Emailchange}>
                Save
              </div>
            </form>

            <form>
              <h2 className='text-xl font-bold'>Change Password</h2>
              <div className='w-1/2'>
                <p className='mt-2'>Old Password</p>
                <div className={styles.input_container}>
                  <input
                    type={showOldPassword ? 'text' : 'password'}
                    placeholder='Old Password'
                    value={oldpassword}
                    onChange={(e) => setOldPassword(e.target.value)} />
                  <div
                    onClick={() => setOldShowPassword(!showOldPassword)}
                    className={styles.toggle_btn}>
                    <Icon icon={showOldPassword ? 'mdi:eye-off' : 'mdi:eye'} className="icon-from" />
                  </div>
                </div>
                <div className={styles.error}>{passerrors.oldpassword}</div>
              </div>
              <div className='w-1/2'>
                <p className='mt-2'>New Password</p>
                <div className={styles.input_container}>
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    placeholder='New Password'
                    value={newpassword}
                    onChange={(e) => setNewPassword(e.target.value)} />
                  <div
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className={styles.toggle_btn}>
                    <Icon icon={showNewPassword ? 'mdi:eye-off' : 'mdi:eye'} className="icon-from" />
                  </div>
                </div>
                <div className={styles.error}>{passerrors.newpassword}</div>
              </div>
              <div className='w-1/2'>
                <p className='mt-2'>Confirm Password</p>
                <div className={styles.input_container}>
                  <input
                    type={showConPassword ? 'text' : 'password'}
                    placeholder='Confirm Password'
                    value={conpassword}
                    onChange={(e) => setConPassword(e.target.value)} />
                  <div
                    onClick={() => setConShowPassword(!showConPassword)}
                    className={styles.toggle_btn}>
                    <Icon icon={showConPassword ? 'mdi:eye-off' : 'mdi:eye'} className="icon-from" />
                  </div>
                </div>
                <div className={styles.error}>{passerrors.conpassword}</div>

              </div>
              <div className={styles.confirm_btn} onClick={Passwordchange}>
                Save
              </div>
            </form>
          </div>
        </div>
      </main>
  )
}

export default Security