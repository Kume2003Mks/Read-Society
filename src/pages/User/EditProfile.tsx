import styles from '../../Style/form.module.css'
import '../../Style/Global.css'
import Sidebarnav from '../../components/navigation/Sidebarnav'
import { useEffect, useState } from 'react'
import { useAuth } from '../../function/context/AuthContext'
import userDataBase from '../../function/userDataBase'
import Swal from 'sweetalert2'

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
  const [previewImage, setPreviewImage] = useState('');
  const [imgfile, setImgfile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleImageUpload = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size <= 2 * 1024 * 1024) { // 2MB
        const imageUrl = URL.createObjectURL(file);
        setPreviewImage(imageUrl);
        setImgfile(file);
      } else {
        Swal.fire({
          title: '<strong>File size exceeds the limit (Max: 2MB)</strong>',
          icon: 'error',
          confirmButtonText: '<h1>Ok</h1>',
        });
      }
    }
  };

  const updateProfile = async () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirm'
    }).then(async (result) => {
      if (result.isConfirmed) {
        setIsLoading(true); // เริ่มแสดงสถานะ loading
        try {
          await Uprofile.editProfile(username, firstName, lastName, Instagram, Facebook, Website, aboutMe, imgfile);
          await getProfile();
          Swal.fire({
            title: '<strong>Profile updated successfully!</strong>',
            icon: 'success',
            confirmButtonText: '<h1>Ok</h1>',
            timer: 3000,
            timerProgressBar: true,
          }).then(() => {
            window.location.reload();
          });
        } catch (error) {
          Swal.fire({
            title: '<strong>Error updating profile. Please try again.</strong>',
            icon: 'error',
            confirmButtonText: '<h1>Ok</h1>',
            timer: 3000,
            timerProgressBar: true,
          });
          console.error('Error updating profile:', error);
        } finally {
          setIsLoading(false);
        }
      }
    })
  };

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
              <div className={styles.profile_container}>
                <label htmlFor="uploadInput" className={styles.edit_image}>
                  {previewImage ? (
                    <>
                      <img
                        src={previewImage}
                        alt="Preview"
                        className={styles.editable_image}
                      />
                      <p className={styles.preview_label}>Preview</p>
                    </>
                  ) : (
                    <img
                      src={userProfile?.profile_image}
                      alt={userProfile.userName}
                      className={styles.editable_image}
                    />
                  )}
                  <input
                    type="file"
                    id="uploadInput"
                    accept="image/*"
                    className={styles.upload_input}
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
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

            {isLoading ? (
              <div>Loading...</div>
            ) : (
              <div className={styles.save_btn} onClick={updateProfile}>Save</div>
            )}

          </div>

        </form>
      </main>
    </>
  )
}

export default EditProfile