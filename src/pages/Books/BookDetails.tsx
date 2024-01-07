import { useNavigate, useParams } from "react-router-dom"
import Books from '../../function/Books';
import Styles from '../../Style/Component.module.css';
import table from '../../Style/table.module.css'
import { Book, Episode } from "../../function/DeclareType";
import { useEffect, useState } from "react";
import Loading from "../../components/loading/Loading";
import { useAuth } from "../../function/context/AuthContext";
import { Icon } from "@iconify/react";


const BookDetails = () => {

    const navigate = useNavigate();

    const [book, setBook] = useState<Book>();
    const [ep, setEp] = useState<Episode[] | null>(null);
    const [desloading, setdesLoading] = useState<boolean>(true);
    const [eploading, setepLoading] = useState<boolean>(true);
    const [editing, setEditing] = useState<boolean>(false);

    const { book_id } = useParams();
    const { userData } = useAuth();

    useEffect(() => {
        async function loadBooks() {
            try {
                const id: string = book_id!;
                const book = new Books();
                const loadedBook = await book.getBookById(id);
                setBook(loadedBook);
                setdesLoading(false);

                if (loadedBook?.owner === (userData && userData.user?.uid)) {
                    console.log("Is owner");
                    setEditing(true);
                }

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

    }, [book_id, userData]);
    console.log(ep);

    return (
        <main className="flex-col flex flex-1 items-center p-container">
            {desloading ? (
                <Loading />
            ) : book ? (
                <>
                    {/* book preview */}
                    <div className="flex w-full h-[400px] p-8 container border-2 border-black mt-8 relative">
                        {editing &&
                            <div
                                className="absolute right-4 top-4 w-6 h-6"
                                title="Edit"
                                onClick={() => navigate(`/mycreation/edited/book/${book_id!}`)}>
                                <Icon icon="uil:edit" className="w-full h-full cursor-pointer" />
                            </div>
                        }
                        <div className="flex-none mr-8">
                            <img
                                src={book.thumbnail}
                                alt={`${book.title} - ${book.genre} book cover`}
                                className={`${Styles.A4_Size} object-cover h-full`}
                            />
                        </div>
                        <div className="flex-1 flex flex-col">
                            <h1 className="text-2xl font-bold mb-1">{book.title}</h1>
                            <h2
                                className="text-l text-gray-500 mb-4 cursor-pointer"
                                onClick={() => navigate(`/community/profile/${book.owner}`)} >
                                Author: {book.profile?.userName}
                            </h2>
                            <div className="overflow-y-auto max-h-[225px]">
                                <p style={{ whiteSpace: 'pre-line' }}>{book.description} </p>
                            </div>
                        </div>
                        <div className="absolute flex flex-row right-4 bottom-4 gap-4">
                            <div className="p-2" title="Like">
                                <Icon icon="mdi:heart" className="w-6 h-6 cursor-pointer" />
                            </div>
                            <div className="p-2" title="Book mark">
                                <Icon icon="solar:bookmark-bold" className="w-6 h-6 cursor-pointer" />
                            </div>
                            <div className="p-2" title="Share">
                                <Icon icon="majesticons:share" className="w-6 h-6 cursor-pointer" />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-row w-full container gap-2 mb-8">
                        {/* episode preview */}
                        <div className="flex w-full h-[400px] container flex-col border-2 border-black mt-8 relative">
                            <div className="bg-[#1FA0F6] w-full items-center flex p-4 relative">
                                <h1 className="text-2xl font-bold mb-1">Episodes</h1>
                                {editing &&
                                    <div className="flex flex-row gap-4 absolute right-4 self-center">
                                        <div title="Upload ep" onClick={() => navigate(`/mycreation/upload/ep/${book_id!}`)}>
                                            <Icon icon="fluent:arrow-upload-16-filled" className="w-6 h-6 cursor-pointer" />
                                        </div>
                                    </div>
                                }
                            </div>
                            <div className="overflow-y-auto">
                                {eploading ? (<>
                                    <p>Loading...</p>
                                </>) : (<>
                                    <table className={table.table}>
                                        <thead>
                                            <tr>
                                                <th className="w-12 mr-2"><h1 className="text-center">Episode</h1></th>
                                                <th><h1 className="text-left">Title</h1></th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {ep?.map((episode, index) => (
                                                <tr key={index}>
                                                    <td><h1 className="text-center">{index + 1}</h1></td>
                                                    <td 
                                                    onClick={() => navigate(`/book-detail/read/${book_id!}/${episode.id}`)}
                                                    className="cursor-pointer"><h1>{episode.title}</h1></td>
                                                    {editing &&
                                                        <td className={table.edit}>
                                                            <div title={`edit ${episode.title}`}
                                                                onClick={() => navigate(`/mycreation/edited/ep/${book_id!}/${episode.id}`)}
                                                            >
                                                                <Icon icon="ph:pencil-bold" className="w-6 h-6 cursor-pointer" />
                                                            </div>
                                                        </td>
                                                    }
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </>)}

                            </div>
                        </div>
                        {/* comment preview */}
                        <div className="flex w-full h-[400px] container flex-col border-2 border-black mt-8 relative">
                            <div className="bg-[#1FA0F6] w-full items-center flex p-4 relative">
                                <h1 className="text-2xl font-bold mb-1">Comment</h1>
                            </div>
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