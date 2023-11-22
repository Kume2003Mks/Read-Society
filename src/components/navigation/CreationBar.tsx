import { NavLink } from "react-router-dom"
import SideBar from "../Layouts/SideBar"
import { Icon } from "@iconify/react"

const Link_Btn: string = 'text-base text-center flex flex-row flex-wrap justify-between p-2'

interface CreationBarProps {
    item?: number; // Replace 'number' with the actual type of 'item'
  }

const CreationBar:React.FC<CreationBarProps> = ({item}) => {

    return (
        <SideBar className='p-2'>
            <h1 className='text-2xl font-bold text-center px-3 mb-2'>My Creation</h1>
            <div className='m-4 border-t-2 border-black' />
            <ul className='nav-list mx-2'>
                <li>
                    <NavLink to='/mycreation/mybooks' className={Link_Btn}>
                        <p className='text-left flex flex-row'>
                            <Icon icon="solar:book-bold" className="icon-size" />
                            Your Books
                        </p>
                        <p className='text-right'>{item}</p>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/mycreation/upload' className={Link_Btn}>
                        <p className='text-left flex flex-row'>
                            <Icon icon="fluent:arrow-upload-16-filled" className="icon-size" />
                            Upload
                        </p>
                    </NavLink>
                </li>
            </ul>
            <div className='m-4 border-t-2 border-black' />
            <ul className='nav-list mx-2'>
                <li>
                    <NavLink to='/mycreation/deleted' className={Link_Btn}>
                        <p className='text-left flex flex-row'>
                            <Icon icon="mingcute:delete-2-fill" className="icon-size" />
                            Deleted
                        </p>
                    </NavLink>
                </li>
            </ul>
        </SideBar>
    )
}

export default CreationBar;