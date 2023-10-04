import styles from '../../Style/form.module.css'
import '../../Style/Global.css'
import Sidebarnav from '../../components/navigation/Sidebarnav'
import { useEffect, useState } from 'react'
import { useAuth } from '../../function/context/AuthContext'
import userDataBase from '../../function/userDataBase'


const EditProfile = () => {

  const { userData } = useAuth();
  const [usertoken, setusertoken] = useState('')
  const [userProfile, setUserProfile] = useState<any>(null);
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [Instagram, setInstagram] = useState('');
  const [Facebook, setFacebook] = useState('');
  const [Website, setWebsite] = useState('');
  const [aboutMe, setAboutMe] = useState('');
  const [canEdit, setCanEdit] = useState(true);


  const maxWords = 250;

  useEffect(() => {
    if (userData && userData.uid) {

      console.log('User UID:', userData.uid);
      setusertoken(userData.uid)
      getProfile()
    }
  }, [userData]);

  const Uprofile = new userDataBase(usertoken);

  const getProfile = async () => {
    const userProfile = await Uprofile.getProfile()
    setUserProfile(userProfile)
    setUsername(userProfile.userName)
    setFirstName(userProfile.firstName)
    setLastName(userProfile.lastName)
    setInstagram(userProfile.instagram)
    setFacebook(userProfile.facebook)
    setWebsite(userProfile.website)
    setAboutMe(userProfile.about_me)

    const lastUpdatedTimestamp = userProfile.last_time.seconds * 1000;
    const sevenDaysTimestamp = Date.now() - 7 * 24 * 60 * 60 * 1000;

    if (lastUpdatedTimestamp > sevenDaysTimestamp) {
      console.log('can not update')
      setCanEdit(false); // ห้ามแก้ไขหากห่างกันมากกว่า 7 วัน
    }

  }

  const updateProfile = async () => {
    await Uprofile.editProfile(username, firstName, lastName, Instagram, Facebook, Website, aboutMe)
    await getProfile();
    window.location.reload()
  }

  const handleAboutMeChange = (e: any) => {
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
              <p>Username {!canEdit ? '(you can edit after 7 days)' : ''}</p>
              <input
                type="text"
                className={!canEdit ? 'text-gray-500' : 'text-black'}
                placeholder='Username'
                value={username}
                disabled={!canEdit}
                onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className='w-full'>
              <p>First Name {!canEdit ? '(you can edit after 7 days)' : ''}</p>
              <input
                type="text"
                className={!canEdit ? 'text-gray-500' : 'text-black'}
                placeholder='First Name'
                value={firstName}
                disabled={!canEdit}
                onChange={(e) => setFirstName(e.target.value)} />
            </div>
            <div className='w-full'>
              <p>Last Name {!canEdit ? '(you can edit after 7 days)' : ''}</p>
              <input
                type="text"
                className={!canEdit ? 'text-gray-500' : 'text-black'}
                placeholder='Last Name'
                value={lastName}
                disabled={!canEdit}
                onChange={(e) => setLastName(e.target.value)} />
            </div>
            <div className='w-full'>
              <p>Instagram</p>
              <input
                type="text"
                placeholder='Instagram'
                value={Instagram}
                onChange={(e) => setInstagram(e.target.value)} />
            </div>
            <div className='w-full'>
              <p>Facebook</p>
              <input type="text" placeholder='Facebook'
                value={Facebook}
                onChange={(e) => setFacebook(e.target.value)} />
            </div>
            <div className='w-full'>
              <p>Website</p>
              <input type="text" placeholder='Website'
                value={Website}
                onChange={(e) => setWebsite(e.target.value)} />
            </div>

          </div>
          <div className={styles.container}>
            {userProfile ? (
              <> <img src={userProfile?.profile_image} alt={userProfile.userName} className={styles.profile_image} /></>
            )
              :
              (<><div className='styles.profile_image'>Loading...</div></>)}

            <div className={styles.aboutme_container}>
              <p>About Me</p>
              <div className={styles.textarea_container}>
                <textarea
                  id="aboutMe"
                  placeholder="Write about yourself..."
                  className={styles.aboutme_input}
                  value={aboutMe}
                  onChange={handleAboutMeChange}
                />
                <p className={styles.word_count}>Words remaining: {maxWords - aboutMe.length}</p>
              </div>
            </div>
            <div className={styles.save_btn} onClick={updateProfile}>
              Save
            </div>
          </div>

        </form>
      </main>
    </>
  )
}

export default EditProfile