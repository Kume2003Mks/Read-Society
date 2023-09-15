import Nav from '../components/nevigation/NavBar'
import SideBar from '../components/Layouts/SideBar'

import '../Style/Global.css'
import { Icon } from '@iconify/react'

const Link_Btn: string = 'text-base text-center flex flex-row flex-wrap justify-between p-2'

const My_Creation = () => {
    return (
        <>
            <Nav />
            <main className="flex-row h-screen justify-between flex-wrap flex p-container">
                <SideBar className='p-2'>
                    <h1 className='text-2xl font-bold text-center px-3 mb-2'>My Creation</h1>
                    <div className='m-4 border-t-2 border-black' />
                    <ul className='nav-list mx-2'>
                        <li>
                            <a href='#' className={Link_Btn}>
                                <p className='text-left flex flex-row'>
                                    <Icon icon="solar:book-bold" className="icon-size" />
                                    Your Books
                                </p>
                                <p className='text-right'>1</p>
                            </a>
                        </li>
                        <li>
                            <a href='#' className={Link_Btn}>
                                <p className='text-left flex flex-row'>
                                    <Icon icon="fluent:arrow-upload-16-filled" className="icon-size" />
                                    Upload
                                </p>
                            </a>
                        </li>
                    </ul>
                    <div className='m-4 border-t-2 border-black' />
                    <ul className='nav-list mx-2'>
                        <li>
                            <a href='#' className={Link_Btn}>
                                <p className='text-left flex flex-row'>
                                    <Icon icon="mingcute:delete-2-fill" className="icon-size" />
                                    Deleted
                                </p>
                            </a>
                        </li>
                    </ul>
                </SideBar>
                <div className='grid-layout h-full flex-1 p-4'>
                    555
                </div>

            </main>
        </>
    )
}

export default My_Creation