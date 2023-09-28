import { NavLink, useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { Icon } from '@iconify/react'
import logo from '../../assets/RS_Logo.svg'
import './NavBar.css'
import './NavBar-dropdown.css'
import { useAuth } from '../../function/context/AuthContext'
import userDataBase from '../../function/userDataBase'

const Nav: JSX.ElementType = () => {
  const { isLoggedIn, logout, userData } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null)
  const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);
  const navbarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (userData && userData.uid) {

      console.log('User UID:', userData.uid);
      getProfile(userData.uid)
    }
  }, [userData]);

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
  }, [isProfileMenuOpen]);

  const getProfile = async (uid: string) => {
    const Uprofile = new userDataBase(uid);
    const userProfile = await Uprofile.getProfile()
    setUserProfile(userProfile)
  }

  console.log(userProfile)

  const toggleProfileMenu = (): void => {
    setProfileMenuOpen(!isProfileMenuOpen);
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
                      <li>
                        <div className="nav-button" >
                          <Icon icon="ph:pencil-bold" className="menu-icon-size" />
                          <h1>Edit Profile</h1>
                        </div>
                      </li>
                      <li>
                        <div className="nav-button">
                          <Icon icon="oi:shield" className="menu-icon-size" />
                          <h1>Password & Securerity</h1>
                        </div>
                      </li>
                      <li>
                        <div className="nav-button">
                          <Icon icon="mingcute:question-fill" className="menu-icon-size" />
                          <h1>Help</h1>
                        </div>
                      </li>
                      <li>
                        <div className="nav-button" onClick={() => logout()}>
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
              <p>Loading...</p>
            )}
          </>
        ) : (
          <>
            <div className="login-button" onClick={() => navigate('/login')}>
              Login
            </div>
            <div className="regis-button" onClick={() => navigate('/register')}>
              Register
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;