import { useParams } from "react-router-dom"
import Books from '../../function/Books';
import Styles from '../../Style/Component.module.css';
import table from '../../Style/table.module.css'
import { Book, Episode } from "../../function/DeclareType";
import { useEffect, useState } from "react";
import Loading from "../../components/loading/Loading";


const BookDetails = () => {

    const [book, setBook] = useState<Book>();
    const [ep, setEp] = useState<Episode[] | null>(null);
    const [desloading, setdesLoading] = useState(true);
    const [eploading, setepLoading] = useState(true);

    const { book_id } = useParams();

    useEffect(() => {
        async function loadBooks() {
            try {
                const id: string = book_id!;
                const book = new Books();
                setBook((await book.getBookById(id)));
                setEp((await book.getEpisodesById(id)))
                setdesLoading(false);
            } catch (error) {
                console.error("Error loading book:", error);
                setdesLoading(false);
            }
        }
        async function loadEps() {
            try {
                const id: string = book_id!;
                const book = new Books();
                setEp((await book.getEpisodesById(id)))
                setepLoading(false);
            } catch (error) {
                console.error("Error loading book:", error);
                setepLoading(false);
            }
        }
        loadBooks();
        loadEps();
    }, [book_id]);

    console.log(ep);

    return (
        <main className="flex-col flex flex-1 items-center p-container">
                {desloading ? (
                    <Loading />
                ) : book ? (
                    <>
                        {/* book preview */}
                        <div className="flex w-full h-[400px] p-8 container border-2 border-black mt-8 relative">
                            <div className="flex-none mr-8">
                                <img
                                    src={book.thumbnail}
                                    alt={`${book.title} - ${book.genre} book cover`}
                                    className={`${Styles.A4_Size} object-cover h-full`}
                                />
                            </div>
                            <div className="flex-1 flex flex-col">
                                <h1 className="text-2xl font-bold mb-1">{book.title}</h1>
                                <h2 className="text-l text-gray-500 mb-4">Author: {book.profile?.userName}</h2>
                                <div className="overflow-y-auto max-h-[300px]">
                                    <p>{book.description} </p>
                                </div>
                            </div>
                        </div>
                        {/* episode preview */}
                        <div className="flex w-full h-[400px] container flex-col border-2 border-black mt-8 relative">
                            <div className="bg-[#1FA0F6] w-full items-center flex p-4">
                                <h1 className="text-2xl font-bold mb-1">Episodes</h1>
                            </div>
                            <div className="overflow-y-auto">
                                {eploading ? (<>
                                    <p>Loading...</p>
                                </>) : (<>
                                    <table className={table.table}>
                                        <thead>
                                            <tr>
                                                <th className="text-center w-12 mr-2">Episode</th>
                                                <th className="text-left">Title</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {ep?.map((episode, index) => (
                                                <tr key={index}>
                                                    <td className="text-center">{index + 1}</td>
                                                    <td>{episode.title}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </>)}

                            </div>
                        </div>
                    </>
                ) : (
                    <p>Book not found</p>
                )}
        </main>
    )
}

export default BookDetails