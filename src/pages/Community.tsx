import Nav from '../components/nevigation/NavBar'
import SideBar from '../components/Layouts/SideBar'
import { Icon } from '@iconify/react'
import '../Style/Global.css'
import ComBox from '../components/Element/CommunBox'
import PostBox from '../components/Element/PostBox'

const Community: JSX.ElementType = () => {
    return (
        <>
            <Nav />
            <main className="flex-row h-screen justify-between flex p-container">
                <SideBar className='p-1'>
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

                <SideBar className='p-2 sticky top-0'>
                    <h1 className='text-xl font-bold text-left px-3 mb-2 '>Following</h1>
                </SideBar>
            </main>
        </>

    )
}

const Link_Btn: string = 'text-base text-center flex flex-row flex-wrap justify-between p-2 '

export default Community

const faketext: string = '푸른 달아 오랜 고운 내 달아 비친 내 손에 내려다오 은색 소매 내 곁에 두른 채로 한 번만 타는 입을 축여다오'
const faketext2: string = "I couldn't wait for you to come and clear the cupboards But now you're gonna leave with nothing but a sign Another evening I'll be sitting, reading in between your lines Because I miss you all the time"