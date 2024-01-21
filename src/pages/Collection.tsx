import SideBar from '../components/Layouts/SideBar'
import { Icon } from '@iconify/react'
import { Suspense, lazy, useEffect, useState } from 'react'
import '../Style/Global.css'
import classStyle from '../Style/Collection.module.css'
import { Book } from '../function/DeclareType.ts'
import { useBook } from '../function/context/BooksContext.tsx'
import Line from '../components/line/Line.tsx'
import { useCollection } from '../function/context/CollectionContext.tsx'

const Book_Card = lazy(() => import('../components/Element/Book_Card'));

const Collection: JSX.ElementType = () => {

    const [activeFilter, setActiveFilter] = useState<string>('all');
    const [typeCounts, setTypeCounts] = useState<Record<string, number>>({});
    const [genreCounts, setGenreCounts] = useState<Record<string, number>>({});


    const { OwnerbookCount, Ownerbooks } = useBook();
    const { allcollection, countallcollection, bookmark, countbookmark, likebook, countlike } = useCollection();

    const filteredData = () => {
        switch (activeFilter) {
            case 'bookmark':
                return bookmark;
            case 'likebook':
                return likebook;
            case 'owner':
                return Ownerbooks;
            default:
                if (activeFilter !== 'all') {
                    return allcollection.filter(book => book.type === activeFilter || book.genre === activeFilter);
                }
                return allcollection;
        }
    };

    const countTypes = () => {
        const typeCounts: Record<string, number> = {};

        allcollection.forEach((book) => {
            const type = book.type || 'any';
            typeCounts[type] = (typeCounts[type] || 0) + 1;
        });

        return typeCounts;
    };

    const countGenre = () => {
        const typeCounts: Record<string, number> = {};

        allcollection.forEach((book) => {
            const type = book.genre || 'any' ;
            typeCounts[type] = (typeCounts[type] || 0) + 1;
        });

        return typeCounts;
    };

    const typeColorMap: Record<string, string> = {
        'Novel': 'red',
        'Cartoon': 'yellow',
        'General': 'green',
        'Non-Fiction': 'blue',
    };

    const genreColorMap: Record<string, string> = {
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
        setTypeCounts(countTypes());
        setGenreCounts(countGenre());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allcollection]);

    const isActive = (filter: string) => filter === activeFilter;

    return (
        <main className="flex-row justify-between flex-wrap flex h-screen p-container">
            <SideBar className='p-2 pt-4'>
                <h1 className='text-2xl font-bold text-center underline underline-offset-2 mb-4'>My Collection</h1>
                {/* My Creation */}

                <ul className='nav-list mx-2'>
                    <li>
                        <div className={`${classStyle.Link_Btn} ${isActive('all') ? classStyle.ActiveButton : ''}`}
                            onClick={() => setActiveFilter('all')}>
                            <p className='text-left flex flex-row'>
                                <Icon icon="solar:book-bold" className="icon-size" />
                                All Book
                            </p>
                            <p className='text-right'>{countallcollection}</p>
                        </div>
                    </li>
                </ul>
                <Line />
                <ul className='nav-list mx-2'>
                    <li>
                        {/* owner */}
                        <div className={`${classStyle.Link_Btn} ${isActive('owner') ? classStyle.ActiveButton : ''}`}
                            onClick={() => setActiveFilter('owner')}>
                            <p className='text-left flex flex-row'>
                                <Icon icon="solar:book-bold" className="icon-size" />
                                My Creation
                            </p>
                            <p className='text-right'>{OwnerbookCount}</p>
                        </div>
                    </li>
                    <li>
                        {/* Bookmark */}
                        <div className={`${classStyle.Link_Btn} ${isActive('bookmark') ? classStyle.ActiveButton : ''}`}
                            onClick={() => setActiveFilter('bookmark')}>
                            <p className='text-left flex flex-row'>
                                <Icon icon="solar:bookmark-bold" className="icon-size" />
                                Bookmark
                            </p>
                            <p className='text-right'>{countbookmark}</p>
                        </div>
                    </li>
                    <li>
                        {/* favorite */}
                        <div className={`${classStyle.Link_Btn} ${isActive('likebook') ? classStyle.ActiveButton : ''}`}
                            onClick={() => setActiveFilter('likebook')}>
                            <p className='text-left flex flex-row'>
                                <Icon icon="iconamoon:heart-fill" className="icon-size" />
                                Favorite
                            </p>
                            <p className='text-right'>{countlike}</p>
                        </div>
                    </li>
                </ul>

                <Line />

                <p className='text-right text-sm underline mx-4'>Type</p>
                <ul className='nav-list mx-2'>
                    {Object.entries(typeCounts).map(([type, count]) => (
                        <li key={type}>
                            <div
                                className={`${classStyle.Link_Btn} ${isActive(type) ? classStyle.ActiveButton : ''}`}
                                onClick={() => setActiveFilter(type)}
                            >
                                <p className='text-left flex flex-row'>
                                    <Icon icon="material-symbols:circle" color={typeColorMap[type] || 'gray'} className="icon-size" />
                                    {type}
                                </p>
                                <p className='text-right'>{count}</p>
                            </div>
                        </li>
                    ))}
                </ul>
                <Line />

                <p className='text-right text-sm underline mx-4'>Genre</p>
                <ul className='nav-list mx-2'>
                    {Object.entries(genreCounts).map(([type, count]) => (
                        <li key={type}>
                            <div
                                className={`${classStyle.Link_Btn} ${isActive(type) ? classStyle.ActiveButton : ''}`}
                                onClick={() => setActiveFilter(type)}
                            >
                                <p className='text-left flex flex-row'>
                                    <Icon icon="material-symbols:circle" color={genreColorMap[type] || 'gray'} className="icon-size" />
                                    {type}
                                </p>
                                <p className='text-right'>{count}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </SideBar>
            <div className='grid-layout h-full flex-1 p-4'>
                <Suspense fallback={<div className='self-center'>Loading...</div>}>
                    {filteredData().map((props: Book, index: number) => (
                        <Book_Card
                            key={index}
                            {...props}
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