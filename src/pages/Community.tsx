import Nav from '../components/nevigation/NavBar'
import SideBar from '../components/Layouts/SideBar'
import { Icon } from '@iconify/react'
import '../Style/Global.css'

const Community: JSX.ElementType = () => {
    return (
        <>
            <Nav />
            <main className="flex-row h-screen justify-between flex-wrap flex p-container">
                <SideBar className="p-1">
                    <h1 className='text-xl font-bold text-left px-3 mb-2'>Explore</h1>
                    <ul className='nav-list mx-2'>
                        <li>
                            <a href='#' className={Link_Btn}>
                                <p className='text-left flex flex-row'>
                                    <Icon icon="basil:explore-solid" className="icon-size" />
                                    Explore
                                </p>
                            </a>
                        </li>
                        <li>
                            <a href='#' className={Link_Btn}>
                                <p className='text-left flex flex-row'>
                                    <Icon icon="fa6-solid:fire" className="icon-size" />
                                    Popular
                                </p>
                            </a>
                        </li>
                        <li>
                            <a href='#' className={Link_Btn}>
                                <p className='text-left flex flex-row'>
                                    <Icon icon="fluent:megaphone-loud-32-filled" className="icon-size" />
                                    New
                                </p>
                            </a>
                        </li>
                    </ul>
                    <div className='m-4 border-t-2 border-black' />

                    <h1 className='text-xl font-bold text-left px-3 my-2'>Topic</h1>
                    <ul className='nav-list mx-2'>
                        <li>
                            <a href='#' className={Link_Btn}>
                                <p className='text-left flex flex-row'>
                                    <Icon icon="fa-solid:book" className="icon-size" />
                                    Novel
                                </p>
                            </a>
                        </li>
                        <li>
                            <a href='#' className={Link_Btn}>
                                <p className='text-left flex flex-row'>
                                    <Icon icon="material-symbols:manga-rounded" className="icon-size" />
                                    Cartoon
                                </p>
                            </a>
                        </li>
                        <li>
                            <a href='#' className={Link_Btn}>
                                <p className='text-left flex flex-row'>
                                    <Icon icon="icon-park-solid:all-application" className="icon-size" />
                                    General
                                </p>
                            </a>
                        </li>

                    </ul>


                </SideBar>

                <SideBar className='p-2'>
                    <h1 className='text-xl font-bold text-left px-3 mb-2'>Following</h1>
                </SideBar>
            </main>
        </>

    )
}

const Link_Btn: string = 'text-base text-center flex flex-row flex-wrap justify-between p-2 '

export default Community