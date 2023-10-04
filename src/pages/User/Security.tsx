import styles from '../../Style/form.module.css'
import '../../Style/Global.css'
import Sidebarnav from '../../components/navigation/Sidebarnav'
import { useEffect, useState } from 'react'
import { useAuth } from '../../function/context/AuthContext'
import userDataBase from '../../function/userDataBase'
import { Icon } from '@iconify/react'

const Security = () => {

  const [showConPassword, setConShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showOldPassword, setOldShowPassword] = useState(false);

  return (
    <>
      <main className="flex-row h-screen justify-between flex p-container">
        <Sidebarnav />
        <form className="flex flex-1 p-8 flex-row">
          <div className={styles.container}>
            <h1 className='text-4xl font-bold'>Password & Security</h1>
            <div className='w-1/2'>
              <p>Email</p>
              <div className={styles.input_container}>
                <input type="text" placeholder='Email' />
              </div>
            </div>
            <div className='w-1/2'>
              <p>Old Password</p>
              <div className={styles.input_container}>
                <input
                  type={showOldPassword ? 'text' : 'password'}
                  placeholder='Old Password' />
                <div
                  onClick={() => setOldShowPassword(!showOldPassword)}
                  className={styles.toggle_btn}>
                  <Icon icon={showOldPassword ? 'mdi:eye-off' : 'mdi:eye'} className="icon-from" />
                </div>
              </div>
            </div>
            <div className='w-1/2'>
              <p>New Password</p>
              <div className={styles.input_container}>
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  placeholder='New Password' />
                <div
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className={styles.toggle_btn}>
                  <Icon icon={showNewPassword ? 'mdi:eye-off' : 'mdi:eye'} className="icon-from" />
                </div>
              </div>
            </div>
            <div className='w-1/2'>
              <p>Confirm Password</p>
              <div className={styles.input_container}>
                <input
                  type={showConPassword ? 'text' : 'password'}
                  placeholder='Confirm Password' />
                <div
                  onClick={() => setConShowPassword(!showConPassword)}
                  className={styles.toggle_btn}>
                  <Icon icon={showConPassword ? 'mdi:eye-off' : 'mdi:eye'} className="icon-from" />
                </div>
              </div>
            </div>
            <div className={styles.save_btn}>
              Save
            </div>
          </div>
        </form>
      </main>
    </>
  )
}

export default Security