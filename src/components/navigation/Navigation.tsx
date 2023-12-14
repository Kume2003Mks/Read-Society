import { NavLink, useNavigate } from 'react-router-dom'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Icon } from '@iconify/react'
import logo from '../../assets/RS_Logo.svg'
import './NavBar.css'
import './NavBar-dropdown.css'
import { useAuth } from '../../function/context/AuthContext'
import userDataBase from '../../function/userDataBase'
import { Profile } from '../../function/DeclareType'
import { useTheme } from '../../function/context/ThemeContext'
import ProfileLoad from '../loading/ProfileLoad'

const Navigation: JSX.ElementType = () => {
  const { isLoggedIn, logout, userData } = useAuth();
  const { isDarkTheme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<Profile | null>(null)
  const [isProfileMenuOpen, setProfileMenuOpen] = useState<boolean>(false);
  const navbarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (userData && userData.user.uid) {
      getProfile(userData.user.uid)
    }
  }, [userData]);


  const toggleProfileMenu = useCallback(() => {
    setProfileMenuOpen((prevIsProfileMenuOpen) => !prevIsProfileMenuOpen);
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target as Node)) {
        toggleProfileMenu();
      }
    };

    if (isProfileMenuOpen) {
      window.addEventListener('click', handleOutsideClick);
    } else {
      window.removeEventListener('click', handleOutsideClick);
    }

    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, [isProfileMenuOpen, toggleProfileMenu]);

  const getProfile = async (uid: string) => {
    const Uprofile = new userDataBase(uid);
    const userProfile = await Uprofile.getProfile()
    setUserProfile(userProfile)
  }

  return (
    <nav className={`navbar ${isMenuOpen ? 'menu-open' : ''}`}>
      <div className='navbar-logo'>
        <NavLink to='/'>
          <img src={logo} alt="logo" className='w-24 h-full mr-4' />
        </NavLink>
        <div className="m-wrap">
          <div className="m-theme-button" onClick={() => toggleTheme()}>
            {isDarkTheme ? (
              <Icon
                icon="charm:moon"
                className='toggle-theme' />
            ) : (
              <Icon
                icon="mingcute:sun-fill"
                className='toggle-theme' />
            )}
          </div>
          <div className="m-theme-button" onClick={() => setMenuOpen(!isMenuOpen)}>
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
              <NavLink to='/community'>Community</NavLink>
            </li>
            <li>
              <NavLink to='/collection'>Collection</NavLink>
            </li>
            <li>
              <NavLink to='/mycreation/mybooks'>My Creation</NavLink>
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
        <div className="theme-button" onClick={() => toggleTheme()}>
          {isDarkTheme ? (
            <Icon
              icon="bi:moon-stars-fill"
              className='toggle-theme' />
          ) : (
            <Icon
              icon="material-symbols:wb-sunny-rounded"
              className='toggle-theme' />
          )}
        </div>
        {isLoggedIn ? (
          <>
            {userProfile ? (
              <div className='flex flex-row align-middle gap-2 hover:cursor-pointer' onClick={toggleProfileMenu} ref={navbarRef}>
                <p className='profile-name'>{userProfile.userName}</p>
                <img src={userProfile.profile_image} alt={userProfile.userName} className='profile-img' />
                <Icon
                  icon={isProfileMenuOpen ? 'octicon:x-12' : 'ci:hamburger-md'}
                  className={`toggle-dropdown ${isProfileMenuOpen ? 'open' : ''} self-center`}
                />
                {isProfileMenuOpen && (
                  <div className="profile-menu">
                    <ul>
                      <li onClick={() => navigate('/user/profile')}>
                        <div className="nav-button">
                          <Icon icon="ph:pencil-bold" className="menu-icon-size" />
                          <h1>Edit Profile</h1>
                        </div>
                      </li>
                      <li onClick={() => navigate('/user/security')}>
                        <div className="nav-button">
                          <Icon icon="oi:shield" className="menu-icon-size" />
                          <h1>Password & Security</h1>
                        </div>
                      </li>
                      <li onClick={() => navigate('/user/help')}>
                        <div className="nav-button">
                          <Icon icon="mingcute:question-fill" className="menu-icon-size" />
                          <h1>Help</h1>
                        </div>
                      </li>
                      <li onClick={() => logout()}>
                        <div className="nav-button">
                          <Icon icon="ion:log-out" className="menu-icon-size" />
                          <h1>
                            Logout
                          </h1>
                        </div>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <ProfileLoad/>
            )}
          </>
        ) : (
          <>
            <div className="login-button" onClick={() => navigate('/user/login')}>
              Login
            </div>
            <div className="regis-button" onClick={() => navigate('/user/register')}>
              Register
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navigation;