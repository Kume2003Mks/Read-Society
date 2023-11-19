import { useParams } from "react-router-dom"
import Books from '../../function/Books';
import Styles from '../../Style/Component.module.css';
import { Book } from "../../function/DeclareType";
import { useEffect, useState } from "react";


const BookDetails = () => {

    const [book, setBook] = useState<Book>();
    const [loading, setLoading] = useState(true);

    const { book_id } = useParams();

    useEffect(() => {

        async function loadBooks() {
            try {
                const id: string = book_id!;
                const book = new Books();
                const data: Book = await book.getBookById(id);
                setBook(data);
                setLoading(false);
            } catch (error) {
                console.error("Error loading book:", error);
                // Handle error (e.g., set an error state)
                setLoading(false);
            }
        }
        loadBooks();
    }, []);

    console.log(book);

    return (
        <main className="flex-row justify-center flex-1 flex p-container">
            {loading ? (
                <p>Loading...</p>
            ) : book ? (
                <div className="flex w-full h-[400px] p-8 container border-2 border-black rounded-lg mt-8 relative">
                    <div className="flex-none mr-8">
                        <img
                            src={book.thumbnail}
                            alt={`${book.title} - ${book.genre} book cover`}
                            className={`${Styles.A4_Size} object-cover rounded-lg h-full`}
                        />
                    </div>
                    <div className="flex-1 flex flex-col">
                        <h1 className="text-2xl font-bold mb-1">{book.title}</h1>
                        <h2 className="text-l text-gray-500 mb-4">Author: {book.profile?.userName}</h2>
                        <div className="overflow-y-auto max-h-[300px]">
                            <p className="text-gray-700">{book.description} </p>
                        </div>
                    </div>
                </div>


            ) : (
                <p>Book not found</p>
            )}
        </main>
    )
}

export default BookDetails