import { NavLink } from "react-router-dom"
import SideBar from "../Layouts/SideBar"
import { Icon } from "@iconify/react"
import { useBook } from '../../function/context/BooksContext';

const Link_Btn: string = 'text-base text-center flex flex-row flex-wrap justify-between p-2'

const CreationBar: React.FC = () => {
    const { OwnerbookCount } = useBook();
    return (
        <SideBar className='p-2 pt-4'>
            <h1 className='text-2xl font-bold text-center underline underline-offset-2 mb-4'>My Creation</h1>
            <ul className='nav-list mx-2'>
                <li>
                    <NavLink to='/mycreation/mybooks' className={Link_Btn}>
                        <p className='text-left flex flex-row'>
                            <Icon icon="solar:book-bold" className="icon-size" />
                            Your Books
                        </p>
                        <p className='text-right'>{OwnerbookCount}</p>
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
        </SideBar>
    )
}

export default CreationBar;