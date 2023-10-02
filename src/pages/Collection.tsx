import SideBar from '../components/Layouts/SideBar'
import { Icon } from '@iconify/react'
import { useEffect, useState } from 'react'
import '../Style/Global.css'
import Collection_Card from '../components/Element/Collection_Card'
import getdata from '../function/test/getdata.ts'


const Collection: JSX.ElementType = () => {
    const [data, setdata] = useState([])

    async function fatchtest() {
        let test:any = await getdata();
        setdata(test)
    }

    useEffect(() => {
        fatchtest()
    }, [])

    return (
        <>
            <div className={classStyle.MainScreen}>
                <SideBar className='bg-white p-2'>
                    <h1 className='text-2xl font-bold text-center'>My Collection</h1>
                    {/* My Creation */}
                    <div className='m-4 border-t-2 border-black' />

                    <ul className='nav-list mx-2'>
                        <li>
                            <a href='#' className={classStyle.Link_Btn}>
                                <p className='text-left flex flex-row'>
                                    <Icon icon="solar:book-bold" className="icon-size" />
                                    My Creation
                                </p>
                                <p className='text-right'>1</p>
                            </a>
                        </li>
                    </ul>

                    <div className='m-4 border-t-2 border-black' />

                    <ul className='nav-list mx-2'>
                        <li>
                            {/* All Book */}
                            <a href='#' className={classStyle.Link_Btn}>
                                <p className='text-left flex flex-row'>
                                    <Icon icon="solar:book-bold" className="icon-size" />
                                    All Book
                                </p>
                                <p className='text-right'>0</p>
                            </a>
                        </li>
                        <li>
                            {/* Last Read */}
                            <a href='#' className={classStyle.Link_Btn}>
                                <p className='text-left flex flex-row'>
                                    <Icon icon="mingcute:history-fill" className="icon-size" />
                                    Last Read
                                </p>
                                <p className='text-right'>0</p>
                            </a>
                        </li>
                        <li>
                            {/* favorite */}
                            <a href='#' className={classStyle.Link_Btn}>
                                <p className='text-left flex flex-row'>
                                    <Icon icon="iconamoon:heart-fill" className="icon-size" />
                                    Favorite
                                </p>
                                <p className='text-right'>0</p>
                            </a>
                        </li>


                    </ul>

                    <div className='m-4 border-t-2 border-black' />

                    <ul className='nav-list mx-2'>
                        <li>
                            {/* Deleted */}
                            <a href='#' className={classStyle.Link_Btn}>
                                <p className='text-left flex flex-row'>
                                    <Icon icon="mingcute:delete-fill" className="icon-size" />
                                    Deleted
                                </p>
                                <p className='text-right'>0</p>
                            </a>
                        </li>
                    </ul>

                    <div className='m-4 border-t-2 border-black' />

                    <p className='text-right text-sm underline mx-4'>category</p>

                    <ul className='nav-list mx-2'>
                        <li>
                            {/* Categoly */}
                            <a href='#' className={classStyle.Link_Btn}>
                                <p className='text-left flex flex-row'>
                                    <Icon icon="material-symbols:circle" color="red" className="icon-size" />
                                    Novel
                                </p>
                                <p className='text-right'>0</p>
                            </a>

                        </li>
                        <li>
                            <a href='#' className={classStyle.Link_Btn}>
                                <p className='text-left flex flex-row'>
                                    <Icon icon="material-symbols:circle" color="yellow" className="icon-size" />
                                    Manga
                                </p>
                                <p className='text-right'>0</p>
                            </a>
                        </li>
                    </ul>
                </SideBar>
                <div className='grid-layout h-full flex-1 p-4'>
                    {data?.map((items: any) => (
                        <Collection_Card key={items.id} props={items}/>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Collection

const classStyle = {
    MainScreen: 'flex-row justify-between flex-wrap flex h-screen p-container',
    Link_Btn: 'text-base text-center flex flex-row flex-wrap justify-between p-2',
}