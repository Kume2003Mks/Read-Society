import { Link } from 'react-router-dom'
import SideBar from '../Layouts/SideBar'
import { Icon } from '@iconify/react'
import { useAuth } from '../../function/context/AuthContext';

const Sidebarnav = () => {

    const { logout } = useAuth();

    const Link_Btn: string = 'text-base text-center flex flex-row flex-wrap justify-between p-2 cursor-pointer'
    return (
            <SideBar className='p-1'>
                <ul className='nav-list mx-2'>
                    <li>
                        <Link to='/user/profile' className={Link_Btn}>
                            <p className='text-left flex flex-row'>
                                <Icon icon="ph:pencil-bold" className="icon-size" />
                                Edit Profile
                            </p>
                        </Link>
                    </li>
                    <li>
                        <Link to='/user/security' className={Link_Btn}>
                            <p className='text-left flex flex-row'>
                                <Icon icon="oi:shield" className="icon-size" />
                                Password & Security
                            </p>
                        </Link>
                    </li>
                    <li>
                        <Link to='/user/help' className={Link_Btn}>
                            <p className='text-left flex flex-row'>
                                <Icon icon="mingcute:question-fill" className="icon-size" />
                                Help
                            </p>
                        </Link>
                    </li> 
                    <li>
                        <div className={Link_Btn} onClick={() => logout()}>
                            <p className='text-left flex flex-row'>
                                <Icon icon="ion:log-out" className="icon-size" />
                                Logout
                            </p>
                        </div>
                    </li>
                </ul>
            </SideBar>
    )
}

export default Sidebarnav