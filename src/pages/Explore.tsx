import SideBar from '../components/Layouts/SideBar'
import '../Style/Global.css'
import { useEffect, useState } from 'react'
import Capsule from '../components/Element/Capsule'
import SearchBar from '../components/Search/SearchBar'
import Books from '../function/Books'
import Book_Card from '../components/Element/Book_Card'
import Filter_Button from '../components/Element/Filter_Button'
import { Book } from '../function/DeclareType'

const Explore: JSX.ElementType = () => {

    const [books, setBooks] = useState<Book[]>([]);

    useEffect(() => {
        async function loadBooks() {
            const book = new Books();
            const data: Book[] = await book.getBooks();
            setBooks(data);
        }
        loadBooks();
    }, [])

    return (
        <>
            <main className="flex-row justify-between flex-wrap flex h-screen p-container">
                <SideBar className='bg-white p-2'>
                    <h1 className='text-2xl font-bold text-center underline underline-offset-2'>Explore</h1>
                    {/* My Creation */}
                    <h1 className='text-xl font-bold text-left px-3 mt-2'>Category</h1>
                    <div className='mx-4 border-t-2 border-black' />
                    <div className='grid grid-cols-2 gap-2 mx-2 mt-1 pt-1'>
                        <Capsule label='Novel' color='red' />
                        <Capsule label='Cartoon' color='orange' />
                        <Capsule label='Cartoon' color='green' />
                        <Capsule label='Audio Book' color='blue' />
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
                <div className='grid-layout h-full flex-1 p-4'>
                    {books?.map((props: any, index: any) => (
                        <Book_Card
                            key={index}
                            id={props.id}
                            genre={props.genre}
                            title={props.title}
                            thumbnail={props.thumbnail}
                            user={props.owner.userName}
                        />
                    ))}
                </div>
            </main>
        </>

    )
}

export default Explore
