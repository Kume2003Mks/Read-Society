import SideBar from '../../components/Layouts/SideBar'
import { Icon } from '@iconify/react'
import '../../Style/Global.css'
import PostBox from '../../components/Element/PostBox'
import Followers from '../../components/Element/Followers'

const Community: JSX.ElementType = () => {
    return (
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
                <div className='flex flex-col flex-1 gap-8 py-8 px-[10%] container overflow-y-auto'>
                    <PostBox content={faketext} img_link='https://images.pexels.com/photos/18355606/pexels-photo-18355606/free-photo-of-e-commerce-banner-photo.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'/>
                    <PostBox img_link='https://images.pexels.com/photos/18334760/pexels-photo-18334760/free-photo-of-processed-with-vsco-with-m5-preset.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'/>
                    <PostBox content={faketext2}/>
                </div>

                <SideBar className='p-2 flex gap-2'>
                    <h1 className='text-xl font-bold text-left px-3 mb-2 '>Following</h1>
                    <Followers name='Oakza007' image='https://play-lh.googleusercontent.com/cJokjWYV_EhTZJvJG0zbV6CowN5V8EoyjzF4LssGyjhTo6rAVntx3XjD7AkBQ2IdFKw'/>
                    <Followers name='Tammy' image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT71xmspkWvWl83N6iCRNHZcok0SMJfrE9SZw&usqp=CAU'/>
                    <Followers name='Mookrata' image='https://today.tamu.edu/wp-content/uploads/2019/06/image-220.png'/>
                </SideBar>
            </main>
    )
}

const Link_Btn: string = 'text-base text-center flex flex-row flex-wrap justify-between p-2 '

export default Community

const faketext: string = '푸른 달아 오랜 고운 내 달아 비친 내 손에 내려다오 은색 소매 내 곁에 두른 채로 한 번만 타는 입을 축여다오'
const faketext2: string = "I couldn't wait for you to come and clear the cupboards But now you're gonna leave with nothing but a sign Another evening I'll be sitting, reading in between your lines Because I miss you all the time"
