import { Suspense, lazy } from 'react';
import '../../Style/Global.css'
import CreationBar from '../../components/navigation/CreationBar'
import { Book } from '../../function/DeclareType'
import { useBook } from '../../function/context/BooksContext';
import Loading from '../../components/loading/Loading';

const Book_Card = lazy(() => import('../../components/Element/Book_Card'));

const My_Creation = () => {

    const { Ownerbooks } = useBook();

    return (
        <main className="flex-row h-screen justify-between flex-wrap flex p-container">
            <CreationBar />
            <div className='grid-layout h-full flex-1 p-4'>
                <Suspense fallback={
                    <div className='flex flex-1 justify-center items-center'>
                        <Loading />
                    </div>}>
                    {Ownerbooks.map((props: Book, index: number) => (
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

export default My_Creation
