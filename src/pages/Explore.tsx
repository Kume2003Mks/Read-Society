import SideBar from '../components/Layouts/SideBar'
import '../Style/Global.css'
import { Suspense, lazy } from 'react'
import Capsule from '../components/Element/Capsule'
import SearchBar from '../components/Search/SearchBar'
import Filter_Button from '../components/Element/Filter_Button'
import Loading from '../components/loading/Loading'
import { Book } from '../function/DeclareType'
import { useBook } from '../function/context/BooksContext'

const Book_Card = lazy(() => import('../components/Element/Book_Card'));

const Explore: JSX.ElementType = () => {

    const { books, loading } = useBook();

    return (
        <main className="flex-row justify-between flex-wrap flex h-screen p-container">
            <SideBar className='p-2'>
                <h1 className='text-2xl font-bold text-center underline underline-offset-2'>Explore</h1>
                {/* My Creation */}
                <h1 className='text-xl font-bold text-left px-3 mt-2'>Category</h1>
                <div className='mx-4 border-t-2 border-black' />
                <div className='grid grid-cols-2 gap-2 mx-2 mt-1 pt-1'>
                    <Capsule label='Novel' color='red' />
                    <Capsule label='Cartoon' color='orange' />
                    <Capsule label='General' color='green' />
                    <Capsule label='Non-Fiction' color='blue' />
                </div>
                <h1 className='text-xl font-bold text-left px-3 mt-2'>Hot Tag</h1>
                <div className='mx-4 border-t-2 border-black' />
                <div className='flex gap-2 mx-2 mt-1'>
                    <SearchBar />
                </div>
                <h1 className='text-xl font-bold text-left px-3 mt-2'>More Filters</h1>
                <div className='mx-4 border-t-2 border-black' />
                <div className='flex flex-col gap-2 mx-2 mt-1 pt-2'>
                    <Filter_Button icon='icon-park-solid:time' label='Latest' />
                    <Filter_Button icon='mdi:eye' label='Most Viewed' />
                    <Filter_Button icon='solar:star-bold' label='Top Rated' />
                </div>

            </SideBar>

            {loading ? (
                <div className='flex flex-1 justify-center items-center'>
                    <Loading />
                </div>
            ) : (
                <div className='grid-layout h-full flex-1 p-4'>
                    <Suspense fallback={
                        <div className='flex flex-1 justify-center items-center'>
                            <Loading />
                        </div>}>
                        {books?.map((props: Book, index: number) => (
                            <Book_Card
                                key={index}
                                {...props}
                                user={props.profile?.userName}
                            />
                        ))}
                    </Suspense>
                </div>
            )}

        </main>
    )
}

export default Explore
