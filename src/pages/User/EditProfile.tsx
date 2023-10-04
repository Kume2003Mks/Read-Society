import styles from '../../Style/form.module.css'
import '../../Style/Global.css'
import Sidebarnav from '../../components/navigation/Sidebarnav'
import { useEffect, useState } from 'react'
import { useAuth } from '../../function/context/AuthContext'
import userDataBase from '../../function/userDataBase'


const EditProfile = () => {

  const { isLoggedIn, userData } = useAuth();
  const [userProfile, setUserProfile] = useState<any>(null);
  const [aboutMe, setAboutMe] = useState('');
  const maxWords = 250;

  useEffect(() => {
    if (userData && userData.uid) {

      console.log('User UID:', userData.uid);
      getProfile(userData.uid)
    }
  }, [userData]);

  const getProfile = async (uid: string) => {
    const Uprofile = new userDataBase(uid);
    const userProfile = await Uprofile.getProfile()
    setUserProfile(userProfile)
  }

  const handleAboutMeChange = (e:any) => {
    const text = e.target.value;
    if (text.length <= maxWords) {
      setAboutMe(text);
    }
  };

  return (
    <>
      <main className="flex-row h-screen justify-between flex p-container">
        <Sidebarnav />
        <form className="flex flex-1 p-8 flex-row">
          <div className={styles.container}>
            <h1 className='text-4xl font-bold'>Edit Profile</h1>
            <div className='w-full'>
              <p>Username</p>
              <input type="text" placeholder='Username' />
            </div>
            <div className='w-full'>
              <p>First Name</p>
              <input type="text" placeholder='First Name' />
            </div>
            <div className='w-full'>
              <p>Last Name</p>
              <input type="text" placeholder='Last Name' />
            </div>
            <div className='w-full'>
              <p>Instagram</p>
              <input type="text" placeholder='Instagram' />
            </div>
            <div className='w-full'>
              <p>Facebook</p>
              <input type="text" placeholder='Facebook' />
            </div>
            <div className='w-full'>
              <p>Website</p>
              <input type="text" placeholder='Website' />
            </div>

          </div>
          <div className={styles.container}>
            {userProfile ? (
              <> <img src={userProfile?.profile_image} alt={userProfile.userName} className={styles.profile_image} /></>
            )
              :
              (<><div className='styles.profile_image'>Loading...</div></>)}
            <div>
              <p>About Me</p>
              <textarea
                id="aboutMe"
                placeholder="Write about yourself..."
                className={styles.aboutme_input}
                value={aboutMe}
                onChange={handleAboutMeChange}
              />
              <p>Words remaining:  {maxWords - aboutMe.length}</p>
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

export default EditProfile