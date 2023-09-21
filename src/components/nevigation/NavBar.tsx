import { NavLink, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Icon } from '@iconify/react'
import logo from '../../assets/RS_Logo.svg'
import './NavBar.css'
import { useAuth } from '../../function/context/AuthContext'
import userDataBase from '../../function/userDataBase'

const Nav: JSX.ElementType = () => {
  const { isLoggedIn, logout, userData } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [userProfile, setUserProfile] =useState<any>(null)

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

  console.log(userProfile)

  const handleLoginPage = (): void => {
    navigate('/login');
  };

  const handleRegisterPage = (): void => {
    navigate('/register');
  };

  const toggleMenu = (): void => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`navbar ${isMenuOpen ? 'menu-open' : ''}`}>
      <div className='navbar-logo'>
        <NavLink to='/'>
          <img src={logo} alt="logo" className='w-24 h-full mr-4' />
        </NavLink>
        <div className="m-wrap">
          <div className="m-theme-button" onClick={() => { alert('hello world') }}>
            <Icon
              icon="mingcute:sun-fill"
              className='toggle-theme' />
          </div>
          <div className="m-theme-button" onClick={toggleMenu}>
            <Icon
              icon={isMenuOpen ? 'octicon:x-12' : 'ci:hamburger-md'}
              className={`toggle-dropdown ${isMenuOpen ? 'open' : ''}`}
            />
          </div>

        </div>

      </div>

      <ul className={`navbar-links ${isMenuOpen ? 'menu-open' : ''}`}>

        <li>
          <NavLink to='/'>Home</NavLink>
        </li>
        <li>
          <NavLink to='/explore'>Explore</NavLink>
        </li>

        {isLoggedIn ? (
          <>
            <li>
              <NavLink to='/collection'>Collection</NavLink>
            </li>
            <li>
              <NavLink to='/community'>Community</NavLink>
            </li>
            <li>
              <NavLink to='/mycreation'>My Creation</NavLink>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to='/community'>Community</NavLink>
            </li>
          </>
        )}
      </ul>
      <div className={`navbar-buttons ${isMenuOpen ? 'menu-open' : ''}`}>
        <div className="theme-button" onClick={() => { alert('hello world') }}>
          <Icon icon="mingcute:sun-fill" className='toggle-theme' />
        </div>
        {isLoggedIn ? (
          <>
              {userProfile ? (
                <div className='flex flex-row align-middle gap-2'>
                  <p className='profile-name'>{userProfile[0].userName}</p>
                  <img src={userProfile[0].profile_image} alt={userProfile[0].userName} className='profile-img' />
                </div>
              ) : (
                <p>Loading...</p>
              )}
            <div className="login-button" onClick={() => logout()}>
              Logout
            </div>
          </>
        ) : (
          <>
            <div className="login-button" onClick={handleLoginPage}>
              Login
            </div>
            <div className="regis-button" onClick={handleRegisterPage}>
              Register
            </div>
          </>
        )}

      </div>
    </nav>
  );
};

export default Nav;
