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
import StyleLayout from '../Style/Gridlayout.module.css'
import { Icon } from '@iconify/react'

const Book_Card = lazy(() => import('../components/Element/Book_Card'));

const Explore: JSX.ElementType = () => {

    const { books, loading } = useBook();

    const [sortedBooks, setSortedBooks] = useState<Book[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isDropdownOpen_1, setDropdownOpen_1] = useState(false);
    const [isDropdownOpen_2, setDropdownOpen_2] = useState(false);
    const [isDropdownOpen_3, setDropdownOpen_3] = useState(false);

    const genreColors: { [genre: string]: string } = {
        Horror: "#FF5733",      // Red-Orange
        Mystery: "#663399",     // DarkSlateBlue
        Drama: "#800000",       // Maroon
        Comedy: "#FFD700",      // Gold
        Science: "#008080",     // Teal
        Adventure: "#006400",   // DarkGreen
        Fantasy: "#9932CC",     // DarkOrchid
        Romance: "#FF1493",     // DeepPink
        Action: "#FF4500",      // OrangeRed
        Physics: "#4682B4",     // SteelBlue
        SciFi: "#00CED1",       // DarkTurquoise
        History: "#8B4513",     // SaddleBrown
        Dystopian: "#696969",   // DimGray
        Adult: "#800080",       // Purple
        Biography: "#2E8B57",   // SeaGreen
        Poetry: "#800080"       // Purple
    };

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
            <SideBar className='p-2 overflow-y-auto'>
                <h1 className='text-2xl font-bold text-center underline underline-offset-2'>Explore</h1>
                {/* Search */}
                <h1 className='text-xl font-bold text-left px-3 mt-2'>Search</h1>
                <Line />
                <div className='flex gap-2 mx-2 mt-1'>
                    <SearchBar onSearchChange={(e) => setSearchTerm(e)} />
                </div>
                {/* Category */}
                <div className='flex flex-col cursor-pointer'
                    onClick={() => setDropdownOpen_1(!isDropdownOpen_1)}>
                    <div className='flex flex-row justify-between items-center px-3  mt-2'>
                        <h1 className='text-xl font-bold text-left'>Category</h1>
                        <Icon icon="mingcute:down-fill" className={`${StyleLayout.icon} ${isDropdownOpen_1 ? StyleLayout.rotate_icon : ''}`} />
                    </div>
                    <Line />
                </div>
                <div className={`${StyleLayout.grid_button} ${isDropdownOpen_1 ? StyleLayout.open : StyleLayout.close}`} >
                    <Capsule label='Novel' color='red' onClick={() => setSearchTerm('Novel')} />
                    <Capsule label='Cartoon' color='orange' onClick={() => setSearchTerm('Cartoon')} />
                    <Capsule label='General' color='green' onClick={() => setSearchTerm('General')} />
                    <Capsule label='Non-Fiction' color='blue' onClick={() => setSearchTerm('Non-Fiction')} />
                </div>

                {/* Genre */}
                <div className='flex flex-col cursor-pointer'
                    onClick={() => setDropdownOpen_2(!isDropdownOpen_2)}>
                    <div className='flex flex-row justify-between items-center px-3  mt-2'>
                        <h1 className='text-xl font-bold text-left'>Genre</h1>
                        <Icon icon="mingcute:down-fill" className={`${StyleLayout.icon} ${isDropdownOpen_2 ? StyleLayout.rotate_icon : ''}`} />
                    </div>
                    <Line />
                </div>
                <div className={`${StyleLayout.grid_button} ${isDropdownOpen_2 ? StyleLayout.open : StyleLayout.close}`} >
                    {Object.keys(genreColors).map((genre) => (
                        <Capsule
                            key={genre}
                            label={genre}
                            color={genreColors[genre]}
                            onClick={() => setSearchTerm(genre)}
                        />
                    ))}
                </div>

                <div className='flex flex-col cursor-pointer'
                    onClick={() => setDropdownOpen_3(!isDropdownOpen_3)}>
                    <div className='flex flex-row justify-between items-center px-3  mt-2'>
                        <h1 className='text-xl font-bold text-left'>Sort By</h1>
                        <Icon icon="mingcute:down-fill" className={`${StyleLayout.icon} ${isDropdownOpen_3 ? StyleLayout.rotate_icon : ''}`} />
                    </div>
                    <Line />
                </div>
                <div className={`${StyleLayout.line_button} ${isDropdownOpen_3 ? StyleLayout.open : StyleLayout.close}`}>
                    <Filter_Button icon='ph:list-bold' label='All' onClick={handleReset} />
                    <Filter_Button icon='icon-park-solid:time' label='New' onClick={handleSortByTimestamp} />
                    <Filter_Button icon='solar:star-bold' label='Popular' onClick={handleSortByLikes} />
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
