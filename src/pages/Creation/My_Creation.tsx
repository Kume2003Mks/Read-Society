import { useAuth } from '../../function/context/AuthContext'
import '../../Style/Global.css'
import { useEffect, useState } from 'react'
import Books from '../../function/Books'
import Book_Card from '../../components/Element/Book_Card'
import CreationBar from '../../components/navigation/CreationBar'
import { Book } from '../../function/DeclareType'

const My_Creation = () => {
    const { userData } = useAuth();
    const [books, setBooks] = useState<Book[]>([]);
    useEffect(() => {
        async function loadBooks() {
            const book = new Books();
            if (userData && userData.uid) {
                const data: Book[] = await book.getBooksByOwner(userData.uid);
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
