import { useEffect, useState } from 'react';
import '../../Style/Global.css';
import styles from '../../Style/uploadPage.module.css';
import fromStyle from '../../Style/form.module.css';
import CreationBar from '../../components/navigation/CreationBar';
import Swal from 'sweetalert2';
import { Icon } from '@iconify/react';
import Books from '../../function/Books';
import { useAuth } from '../../function/context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import { Book } from '../../function/DeclareType';
import Loading from '../../components/loading/Loading';

const Edit_Book = () => {

    const navigate = useNavigate();

    const TypeOptionset: string[] = ['Novel', 'Cartoon', 'General', 'Non-Fiction'];
    const GenreOptionset: string[] = [
        "Horror",
        "Science",
        "Mystery",
        "Drama",
        "Nonfiction",
        "Fantasy",
        "Humor",
        "Romance",
        "Action",
        "Physics",
        "Contemporary",
        "SciFi",
        "History",
        "GraphicNovels",
        "Adult",
        "Biography",
        "FantasyRomance",
        "HistoricalFiction",
        "SelfHelp",
        "Thriller",
        "Adventure",
        "Poetry",];

    const { userData } = useAuth();
    const { editbook_id } = useParams();

    const [imgfile, setImgfile] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState('');
    const [TypeOption, setTypeOption] = useState('');
    const [GenreOption, setGenreOption] = useState('');
    const [subGenreOption, setsubGenreOption] = useState<string | undefined>('');
    const [tags, setTags] = useState<string[] | undefined>([]);
    const [bookName, setBookName] = useState('');
    const [description, setDescription] = useState('');
    const [editing, setEditing] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function loadBooks() {
            try {
                const id: string = editbook_id!;
                const book = new Books();
                const loadedBook: Book = await book.getBookById(id);
                setLoading(false);

                if (loadedBook?.owner === (userData && userData.user?.uid)) {
                    console.log("Is owner");
                    setEditing(true);
                }
                setBookName(loadedBook.title)
                setDescription(loadedBook.description)
                setPreviewImage(loadedBook.thumbnail)
                setTypeOption(loadedBook.type)
                setGenreOption(loadedBook.genre)
                setsubGenreOption(loadedBook?.genre2)
                setTags(loadedBook?.tags)


            } catch (error) {
                console.error("Error loading book:", error);
                setLoading(false);
            }
        }

        loadBooks();


    }, [editbook_id, userData]);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {

        const file = e.target.files?.[0];
        if (file) {
            if (file.size <= 2 * 1024 * 1024) {
                const imageUrl = URL.createObjectURL(file);
                setPreviewImage(imageUrl);
                setImgfile(file);
            } else {
                Swal.fire({
                    title: '<strong>File size exceeds the limit (Max: 2MB)</strong>',
                    icon: 'error',
                    confirmButtonText: '<h1>Ok</h1>',
                });
            }
        }
    };

    const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTag = e.target.value;
        setTags((prevTags) => [...(prevTags || []), newTag]);
    };

    const handleSubmit = async () => {
        if (!bookName || !TypeOption || !GenreOption || !description) {
            Swal.fire({
                title: '<strong>Please fill in all required fields.</strong>',
                icon: 'error',
                confirmButtonText: '<h1>Ok</h1>',
            });
            return;
        }

        try {
            const booksManager = new Books();
            await booksManager.editBook(
                editbook_id!,
                bookName,
                GenreOption,
                TypeOption,
                description,
                imgfile,
                tags,
                subGenreOption,
            );

            setImgfile(null);
            setPreviewImage('');
            setTypeOption('');
            setGenreOption('');
            setsubGenreOption('');
            setTags([]);
            setBookName('');
            setDescription('');

            Swal.fire({
                title: 'Edit successful!',
                icon: 'success',
                confirmButtonText: '<h1>Ok</h1>',
            }).then(() => {
                navigate(`/book-detail/${editbook_id!}`)
            });
        } catch (error) {
            console.error('Error uploading book:', error);
        }
    };

    const handleDel = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to delete?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confrim'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const booksManager = new Books();
                await booksManager.deleteBook(editbook_id!);
                Swal.fire({
                    title: 'Delete successful!',
                    icon: 'success',
                    confirmButtonText: '<h1>Ok</h1>',
                  }).then(() => {
                    navigate("/")
                  });
            }
        })
    }

    return (
        <main className="flex-row h-screen flex p-container">
            <CreationBar />
            {loading ? (
                <Loading />
            ) : editing ? (
                <div className={`h-full flex flex-1 flex-row py-8 px-16 gap-8 ${styles.input_template}`}>
                    <div className="flex flex-1 flex-col items-center">
                        <h1 className="w-full text-center">Upload thumbnail</h1>
                        <label htmlFor="uploadInput" className={styles.edit_image}>
                            {previewImage ? (
                                <>
                                    <img src={previewImage} alt="Preview" />
                                    <p className={styles.preview_label}>Preview</p>
                                </>
                            ) : (
                                <div className={styles.upload_box}>
                                    <Icon icon="mdi:upload" className={styles.upload_icon} />
                                </div>
                            )}
                            <input
                                type="file"
                                id="uploadInput"
                                accept="image/*"
                                className={styles.upload_input}
                                onChange={handleImageUpload}
                            />
                        </label>

                        <label className={styles.box_input} style={{ marginTop: '8px' }}>
                            <h1>Add tag</h1>
                            <input type="text" placeholder="Add tag" value={tags} onChange={handleTagChange} />
                        </label>
                    </div>

                    <div className="flex flex-[3] flex-col px-4 gap-2">
                        <label className={styles.box_input}>
                            <h1>Book Name</h1>
                            <input type="text" placeholder="Book name" value={bookName} onChange={(e) => setBookName(e.target.value)} />
                        </label>

                        <div className="flex flex-row justify-between gap-8">
                            <label className={styles.box_input}>
                                <h1>Type</h1>
                                <select value={TypeOption} onChange={(event) => setTypeOption(event.target.value)}>
                                    <option value="" disabled hidden>
                                        None
                                    </option>
                                    {TypeOptionset.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            </label>

                            <label className={styles.box_input}>
                                <h1>Genre</h1>
                                <select value={GenreOption} onChange={(event) => setGenreOption(event.target.value)}>
                                    <option value="" disabled hidden>
                                        None
                                    </option>
                                    {GenreOptionset.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            </label>

                            <label className={styles.box_input}>
                                <h1>Genre 2 (optional)</h1>
                                <select value={subGenreOption} onChange={(event) => setsubGenreOption(event.target.value)}>
                                    <option value="" disabled hidden>
                                        None
                                    </option>
                                    {GenreOptionset.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            </label>
                        </div>

                        <label className={styles.box_input}>
                            <h1>Description</h1>
                            <textarea
                                id="aboutMe"
                                placeholder="Write some description."
                                value={description}
                                className={styles.desc_input}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </label>

                        <div className='w-full flex flex-row gap-4 justify-end'>
                            <div className={`${fromStyle.confirm_btn} bg-red-500 border-red-500 `} onClick={handleDel}>
                                Delete
                            </div>

                            <div className={fromStyle.confirm_btn} onClick={handleSubmit}>
                                Submit
                            </div>
                        </div>

                    </div>
                </div>
            ) : (<p>Only the owner can upload.</p>)}
        </main>
    )
}

export default Edit_Book