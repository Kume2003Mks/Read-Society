import { useNavigate, useParams } from "react-router-dom"
import Books from '../../function/Books';
import { Book, Episode, Profile, Comment } from "../../function/DeclareType";
import { useEffect, useState, lazy, Suspense, useCallback } from "react";
import Loading from "../../components/loading/Loading";
import { useAuth } from "../../function/context/AuthContext";
import { Icon } from "@iconify/react";
import userDataBase from "../../function/userDataBase";
import interaction from "../../function/interaction";

import Styles from '../../Style/Component.module.css';
import table from '../../Style/table.module.css'
import BooksStyle from '../../Style/BooksStyle.module.css';
import Swal from "sweetalert2";

const Comment_Box = lazy(() => import('../../components/Element/Comment_Box'));

const BookDetails = () => {

    const navigate = useNavigate();

    const [book, setBook] = useState<Book>();
    const [ep, setEp] = useState<Episode[] | null>(null);
    const [desloading, setdesLoading] = useState<boolean>(true);
    const [eploading, setepLoading] = useState<boolean>(true);
    const [editing, setEditing] = useState<boolean>(false);
    const [userProfile, setUserProfile] = useState<Profile | null>(null)
    const [commentText, setCommentText] = useState<string>('');
    const [comment, setComment] = useState<Comment[]>([])
    const [reloadComponent, setReloadComponent] = useState(false);
    const [loadlike, setloadlike] = useState(false);
    const [likecount, setlikecount] = useState(0);
    const [userLiked, setUserLiked] = useState(false);
    const [userBookmarked, setUserBookmarked] = useState(false);

    const { book_id } = useParams();
    const { userData, isLoggedIn } = useAuth();

    useEffect(() => {
        const getProfile = async (uid: string) => {
            const Uprofile = new userDataBase(uid);
            const userProfile = await Uprofile.getProfile()
            setUserProfile(userProfile)
        }
        if (userData && userData.user.uid) {
            getProfile(userData.user.uid)
        }

        async function loadBooks() {
            try {
                setdesLoading(true);
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
        async function loadComments() {
            try {
                const id: string = book_id!;
                const book = new Books();
                const comments = await book.getComments(id)
                setComment(comments)
            } catch (error) {
                console.error("Error loading book:", error);
            }
        }
        const checkUserLiked = async () => {
            if (userData && userData.user && userData.user.uid) {
                setloadlike(true);
                const bookInteraction = new interaction(book_id!);
                const { userLiked } = await bookInteraction.getLikes(userData.user.uid);
                setUserLiked(userLiked);
                setloadlike(false);
            }
        };

        const LikedCount = async () => {
            const bookInteraction = new interaction(book_id!);
            const count: number = await bookInteraction.getAllLikes();
            setlikecount(count);
        }
        const loadBookmarkStatus = async () => {
            if (userData && userData.user && userData.user.uid) {
                const bookInteraction = new interaction(book_id!);
                const { userBookmarked } = await bookInteraction.getBookmarked(userData.user.uid);
                setUserBookmarked(userBookmarked);
            }
        };
        
        loadBooks();
        loadEps();
        loadComments()
        checkUserLiked();
        LikedCount();
        loadBookmarkStatus();

    }, [book_id, userData, reloadComponent]);
    console.log(ep);

    const handleLikeClick = async () => {
        if (userData && userData.user && userData.user.uid) {
            const bookInteraction = new interaction(book_id!);
            try {
                if (userLiked) {
                    await bookInteraction.unlike(userData.user.uid);
                } else {
                    await bookInteraction.like(userData.user.uid);
                }
                setUserLiked(!userLiked);
                setReloadComponent((prev) => !prev);
            } catch (error) {
                console.error('Error toggling like:', error);
            }
        }
    };

    const handleBookmarkClick = async () => {
        if (userData && userData.user && userData.user.uid) {
            const bookInteraction = new interaction(book_id!);
            try {
                if (userBookmarked) {
                    await bookInteraction.removeBookmark(userData.user.uid);
                    console.log('Bookmark removed successfully!');
                } else {
                    await bookInteraction.addBookmark(userData.user.uid);
                    console.log('Bookmark added successfully!');
                }
    
                setUserBookmarked(!userBookmarked);
            } catch (error) {
                console.error('Error handling bookmark:', error);
            }
        }
    };

    const handleSendComment = async () => {
        let uid: string = ""
        if (userData && userData.user.uid) {
            uid = userData.user.uid
        }

        if (commentText.trim() !== '') {
            const book = new Books();
            const newComment: Comment = {
                text: commentText,
                uid: uid,
            }
            setComment([...comment, newComment]);

            const success = await book.addComment(book_id!, uid, commentText);
            if (success) {
                console.log('Comment added successfully!');
            } else {
                console.error('Failed to add comment.');
            }
            setCommentText('');
            setReloadComponent((prev) => !prev);
        }
    };

    const handleCopyToClipboard = useCallback(async () => {
        try {
            const bookUrl = window.location.href;
            await navigator.clipboard.writeText(bookUrl);
            console.log("URL copied to clipboard:", bookUrl);
            Swal.fire({
                icon: "success",
                title: "URL Copied!",
                text: "The URL has been copied to the clipboard.",
                timer: 1500,
                timerProgressBar: true,
                showConfirmButton: false,
            });
        } catch (error) {
            console.error("Error copying URL to clipboard:", error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "An error occurred while copying the URL to the clipboard.",
            });
        }
    }, []);

    return (
        <main className="flex-col flex flex-1 items-center p-container">
            {desloading ? (
                <Loading />
            ) : book ? (
                <>
                    {/* book preview */}
                    <div className={BooksStyle.book_container}>
                        {editing &&
                            <div
                                className="absolute right-4 top-4 w-6 h-6"
                                title="Edit"
                                onClick={() => navigate(`/mycreation/edited/book/${book_id!}`)}>
                                <Icon icon="uil:edit" className={`w-6 h-6 cursor-pointer ${BooksStyle.icon_button}`} />
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

                        {!loadlike && (

                            <div className="absolute flex flex-row right-4 bottom-4 gap-4">

                                <button className={BooksStyle.interact_button} title="Like" onClick={handleLikeClick} disabled={editing}>
                                    <Icon icon="mdi:heart" className={`w-6 h-6 ${userLiked ? 'text-red-500' : BooksStyle.icon_button}`} />
                                    {likecount !== 0 && <h1>{likecount}</h1>}
                                </button>
                                <button className={BooksStyle.interact_button} title="Book mark" onClick={handleBookmarkClick} disabled={editing}>
                                    <Icon icon="solar:bookmark-bold" className={`w-6 h-6 ${userBookmarked ? 'text-orange-500' : BooksStyle.icon_button}`} />
                                </button>

                                <button className={BooksStyle.interact_button} title="Share" onClick={handleCopyToClipboard}>
                                    <Icon icon="majesticons:share" className={`w-6 h-6 ${BooksStyle.icon_button}`} />
                                </button>
                            </div>
                        )}

                    </div>

                    <div className={BooksStyle.raspons_container}>
                        {/* episode preview */}
                        <div className={BooksStyle.book_container_col}>
                            <div className="bg-[#1FA0F6] w-full items-center flex p-4 relative">
                                <h1 className="text-2xl font-bold mb-1">Episodes</h1>
                                {editing &&
                                    <div className="flex flex-row gap-4 absolute right-4 self-center">
                                        <div title="Upload ep" onClick={() => navigate(`/mycreation/upload/ep/${book_id!}`)}>
                                            <Icon icon="fluent:arrow-upload-16-filled" className={`w-6 h-6 cursor-pointer ${BooksStyle.icon_button}`} />
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
                                                                <Icon icon="ph:pencil-bold" className={`w-6 h-6 cursor-pointer ${BooksStyle.icon_button}`} />
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
                        <div className={BooksStyle.book_container_col}>
                            <div className="bg-[#1FA0F6] w-full items-center flex p-4 relative">
                                <h1 className="text-2xl font-bold mb-1">Comment</h1>
                            </div>
                            <div className="flax flex-1 overflow-y-auto p-4">
                                <Suspense fallback={<div>Loading...</div>}>
                                    {comment.map((comment, index) => (
                                        <Comment_Box key={index}
                                            text={comment?.text}
                                            image={comment.profile?.profile_image}
                                            user_name={comment.profile?.userName}
                                            uid={comment.uid}
                                            timestamp={comment?.timestamp}
                                        />
                                    ))}
                                </Suspense>
                            </div>
                            {isLoggedIn && (
                                <div className={Styles.comment_section}>
                                    <div className={Styles.comment_box_input}>
                                        <img src={userProfile?.profile_image} alt={userProfile?.userName} className={Styles.profile_user} />
                                        <input
                                            type="text"
                                            placeholder="Write a comment..."
                                            onChange={(e) => setCommentText(e.target.value)}
                                        />
                                        <div onClick={handleSendComment} className={Styles.sendButton}>
                                            <Icon icon="mingcute:send-line" className='w-full h-full' />
                                        </div>

                                    </div>
                                </div>
                            )}
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