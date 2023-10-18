import { NavLink } from 'react-router-dom'
import SideBar from '../../components/Layouts/SideBar'
import { useAuth } from '../../function/context/AuthContext'


import '../../Style/Global.css'
import { Icon } from '@iconify/react'
import { useEffect, useState } from 'react'
import Books from '../../function/Books'
import Book_Card from '../../components/Element/Book_Card'

const Link_Btn: string = 'text-base text-center flex flex-row flex-wrap justify-between p-2'

const My_Creation = () => {
    const { userData } = useAuth();
    const [books, setBooks] = useState<any>([]);
    useEffect(() => {
        async function loadBooks() {
            const book = new Books();
            if (userData && userData.uid) {
                const data: any = await book.getBooksByOwner(userData.uid);
                setBooks(data);  
            }
        }
        loadBooks();
    }, []);

    return (
        <main className="flex-row h-screen justify-between flex-wrap flex p-container">
            <CreationBar item={books.length}/>
            <div className='grid-layout h-full flex-1 p-4'>
                {books.map((props: any, index: any) => (
                        <Book_Card
                            key={index}
                            genre={props.genre}
                            title={props.title}
                            thumbnail={props.thumbnail}
                            user={props.owner.userName}
                        />
                    ))
                }
            </div>
        </main>
    )
}

export default My_Creation

export const CreationBar = ({item}:any) => {

    return (
        <SideBar className='p-2'>
            <h1 className='text-2xl font-bold text-center px-3 mb-2'>My Creation</h1>
            <div className='m-4 border-t-2 border-black' />
            <ul className='nav-list mx-2'>
                <li>
                    <NavLink to='/mycreation/mybooks' className={Link_Btn}>
                        <p className='text-left flex flex-row'>
                            <Icon icon="solar:book-bold" className="icon-size" />
                            Your Books
                        </p>
                        <p className='text-right'>{item}</p>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/mycreation/upload' className={Link_Btn}>
                        <p className='text-left flex flex-row'>
                            <Icon icon="fluent:arrow-upload-16-filled" className="icon-size" />
                            Upload
                        </p>
                    </NavLink>
                </li>
            </ul>
            <div className='m-4 border-t-2 border-black' />
            <ul className='nav-list mx-2'>
                <li>
                    <NavLink to='/mycreation/deleted' className={Link_Btn}>
                        <p className='text-left flex flex-row'>
                            <Icon icon="mingcute:delete-2-fill" className="icon-size" />
                            Deleted
                        </p>
                    </NavLink>
                </li>
            </ul>
        </SideBar>
    )
}