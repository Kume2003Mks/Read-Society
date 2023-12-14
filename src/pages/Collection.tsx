import SideBar from '../components/Layouts/SideBar'
import { Icon } from '@iconify/react'
import { Suspense, lazy } from 'react'
import '../Style/Global.css'
import { Book } from '../function/DeclareType.ts'
import { useBook } from '../function/context/BooksContext.tsx'

const Book_Card = lazy(() => import('../components/Element/Book_Card'));

const Collection: JSX.ElementType = () => {
    
    const { OwnerbookCount, Ownerbooks } = useBook();

    return (
        <main className={classStyle.MainScreen}>
            <SideBar className='p-2'>
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
                            <p className='text-right'>{OwnerbookCount}</p>
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
                <Suspense fallback={<div className='self-center'>Loading...</div>}>
                    {Ownerbooks.map((props: Book, index: number) => (
                        <Book_Card
                            key={index}
                            id={props.id}
                            genre={props.genre}
                            title={props.title}
                            thumbnail={props.thumbnail}
                            user={props.profile?.userName}
                        />
                    ))
                    }
                </Suspense>
            </div>
        </main>
    )
}

export default Collection

const classStyle = {
    MainScreen: 'flex-row justify-between flex-wrap flex h-screen p-container',
    Link_Btn: 'text-base text-center flex flex-row flex-wrap justify-between p-2',
}