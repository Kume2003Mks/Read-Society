import SideBar from '../components/Layouts/SideBar'
import '../Style/Global.css'
import { Suspense, lazy, useEffect, useState } from 'react'
import Capsule from '../components/Element/Capsule'
import SearchBar from '../components/Search/SearchBar'
import Filter_Button from '../components/Element/Filter_Button'
import Loading from '../components/loading/Loading'
import { Book } from '../function/DeclareType'
import { useBook } from '../function/context/BooksContext'
import Line from '../components/line/Line'

const Book_Card = lazy(() => import('../components/Element/Book_Card'));

const Explore: JSX.ElementType = () => {

    const { books, loading } = useBook();

    const [sortedBooks, setSortedBooks] = useState<Book[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    
    useEffect(() => {
        setSortedBooks(books)
    }, [books]);

    const filteredBooks = sortedBooks.filter((book) => {
        const searchableFields = [book.title, book.genre, book.genre2, book.type, book.description, book.profile?.userName];

        const isMatch = searchableFields.some((field) => {
            const fieldValue = field ? field.toLowerCase() : '';
            return fieldValue.includes(searchTerm.toLowerCase());
        });

        return isMatch;
    });

    const handleSortByTimestamp = () => {
        const sortedByTimestamp = [...books].sort((a, b) => b.created.seconds - a.created.seconds);
        setSortedBooks(sortedByTimestamp);
    };

    const handleSortByLikes = () => {
        const sortedByLikes = [...books].sort((a, b) => b.like - a.like);
        setSortedBooks(sortedByLikes);
    };

    const handleReset = () => {
        setSearchTerm('');
        setSortedBooks([...books]);
    };

    return (
        <main className="flex-row justify-between flex-wrap flex h-screen p-container">
            <SideBar className='p-2'>
                <h1 className='text-2xl font-bold text-center underline underline-offset-2'>Explore</h1>
                {/* Search */}
                <h1 className='text-xl font-bold text-left px-3 mt-2'>Search</h1>
                <Line />
                <div className='flex gap-2 mx-2 mt-1'>
                    <SearchBar onSearchChange={(e) => setSearchTerm(e)} />
                </div>
                <h1 className='text-xl font-bold text-left px-3 mt-2'>Category</h1>
                <Line />
                <div className='grid grid-cols-2 gap-2 mx-2 mt-1 pt-1'>
                    <Capsule label='Novel' color='red' onClick={() => setSearchTerm('Novel')} />
                    <Capsule label='Cartoon' color='orange' onClick={() => setSearchTerm('Cartoon')} />
                    <Capsule label='General' color='green' onClick={() => setSearchTerm('General')} />
                    <Capsule label='Non-Fiction' color='blue' onClick={() => setSearchTerm('Non-Fiction')} />
                </div>
                <h1 className='text-xl font-bold text-left px-3 mt-2'>Genre</h1>
                <Line />
                <div className='grid grid-cols-2 gap-2 mx-2 mt-1 pt-1'>
                    <Capsule label='Novel' color='red' onClick={() => setSearchTerm('Novel')} />
                    <Capsule label='Cartoon' color='orange' onClick={() => setSearchTerm('Cartoon')} />
                    <Capsule label='General' color='green' onClick={() => setSearchTerm('General')} />
                    <Capsule label='Non-Fiction' color='blue' onClick={() => setSearchTerm('Non-Fiction')} />
                </div>
                <h1 className='text-xl font-bold text-left px-3 mt-2'>Sort By</h1>
                <Line />
                <div className='flex flex-col gap-2 mx-2 mt-1 pt-2'>
                    <Filter_Button icon='ph:list-bold' label='All' onClick={handleReset} />
                    <Filter_Button icon='icon-park-solid:time' label='Latest' onClick={handleSortByTimestamp} />
                    <Filter_Button icon='solar:star-bold' label='Top Rated' onClick={handleSortByLikes} />
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
                        {filteredBooks.map((props: Book, index: number) => (
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
