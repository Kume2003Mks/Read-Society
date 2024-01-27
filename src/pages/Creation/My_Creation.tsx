import '../../Style/Global.css'
import Book_Card from '../../components/Element/Book_Card'
import CreationBar from '../../components/navigation/CreationBar'
import { Book } from '../../function/DeclareType'
import { useBook } from '../../function/context/BooksContext';

const My_Creation = () => {

    const { Ownerbooks } = useBook();

    return (
            <main className="flex-row h-screen justify-between flex-wrap flex p-container">
                <CreationBar/>
                <div className='grid-layout h-full flex-1 p-4'>
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
                </div>
            </main>
    )
}

export default My_Creation
