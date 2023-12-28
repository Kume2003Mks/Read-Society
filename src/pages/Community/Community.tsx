import SideBar from '../../components/Layouts/SideBar'
import { Icon } from '@iconify/react'
import '../../Style/Global.css'
import poststyle from '../../Style/post.module.css'
import PostBox from '../../components/Element/PostBox'
import Followers from '../../components/Element/Followers'
import Social from '../../function/Social'
import { useEffect, useState } from 'react'
import { useAuth } from '../../function/context/AuthContext'
import userDataBase from '../../function/userDataBase'
import { Post, Profile } from '../../function/DeclareType'
import Modal from '../../components/Modal/Modal'
import Loading from '../../components/loading/Loading'
import Swal from 'sweetalert2'

const Community: JSX.ElementType = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [postText, setPostText] = useState<string>('');
    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    const [userProfile, setUserProfile] = useState<Profile | null>(null)
    const [post, Setpost] = useState<Post[]>([])

    const [isSpoil, setIsSpoil] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [isprocessed, setProcessed] = useState<boolean>(false);
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

        const getPost = async () => {
            const social = new Social();
            const post = await social.getPosts();
            Setpost(post)
        }
        getPost()
    }, [userData]);

    console.log(error)

    const handlePost = async () => {
        let uid: string = "";
        if (userData && userData.user.uid) {
            uid = (userData.user.uid)
        }

        const social = new Social();

        if (!postText.trim() && selectedImages.length === 0) {
            setError('Please enter text or select an image.');
            return;
        }

        setProcessed(true);
        try {
            setProcessed(await social.addPost(uid, isSpoil, postText, convertToFilesList(selectedImages)));
            setPostText('')
            setSelectedImages([])
            setIsSpoil(false)
            setIsOpen(false)
            Swal.fire("Post Complete")
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    const convertToFilesList = (files: File[]): FileList => {
        const dataTransfer = new DataTransfer();
        files.forEach(file => dataTransfer.items.add(file));
        return dataTransfer.files;
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = e.target.files;
        if (!selectedFiles) {
            return;
        }
        const selectedFilesArray = Array.from(selectedFiles);
        selectedFilesArray.forEach((file) => {
            const source = file.name
            const check = selectedImages.some((image) => image.name === source);

            if (check) {
                const updatedImages = selectedImages.filter((image) => image.name !== source);
                setSelectedImages(updatedImages);
            } else {
                setSelectedImages((prevImages) => [...prevImages, file]);
            }
        });
    };

    const removeImage = (index: number) => {
        const updatedImages = [...selectedImages];
        updatedImages.splice(index, 1);
        setSelectedImages(updatedImages);
    };

    return (
        <main className="flex-row h-screen justify-between flex p-container">
            <SideBar className='p-1'>
                <h1 className='text-xl font-bold text-left px-3 mb-2'>Explore</h1>
                <ul className='nav-list mx-2'>
                    <li>
                        <a href='#' className={Link_Btn}>
                            <p className='text-left flex flex-row'>
                                <Icon icon="basil:explore-solid" className="icon-size" />
                                Explore
                            </p>
                        </a>
                    </li>
                    <li>
                        <a href='#' className={Link_Btn}>
                            <p className='text-left flex flex-row'>
                                <Icon icon="fa6-solid:fire" className="icon-size" />
                                Popular
                            </p>
                        </a>
                    </li>
                    <li>
                        <a href='#' className={Link_Btn}>
                            <p className='text-left flex flex-row'>
                                <Icon icon="fluent:megaphone-loud-32-filled" className="icon-size" />
                                New
                            </p>
                        </a>
                    </li>
                </ul>
                <div className='m-4 border-t-2 border-black' />

                <h1 className='text-xl font-bold text-left px-3 my-2'>Topic</h1>
                <ul className='nav-list mx-2'>
                    <li>
                        <a href='#' className={Link_Btn}>
                            <p className='text-left flex flex-row'>
                                <Icon icon="fa-solid:book" className="icon-size" />
                                Novel
                            </p>
                        </a>
                    </li>
                    <li>
                        <a href='#' className={Link_Btn}>
                            <p className='text-left flex flex-row'>
                                <Icon icon="material-symbols:manga-rounded" className="icon-size" />
                                Cartoon
                            </p>
                        </a>
                    </li>
                    <li>
                        <a href='#' className={Link_Btn}>
                            <p className='text-left flex flex-row'>
                                <Icon icon="icon-park-solid:all-application" className="icon-size" />
                                General
                            </p>
                        </a>
                    </li>

                </ul>


            </SideBar>
            <div className='flex flex-col flex-1 gap-8 py-8 px-[10%] container overflow-y-auto'>

                {isLoggedIn ? (
                    <>
                        <div onClick={() => setIsOpen(true)} className={poststyle.post_box}>
                            <img src={userProfile?.profile_image} alt={userProfile?.userName} className={poststyle.profile_image} />
                            <div className={poststyle.fake_textinput}>
                                <h1>Share Someting...</h1>
                            </div>
                        </div>

                        <Modal title="Post" isOpen={isOpen} onClose={() => setIsOpen(false)}>
                            {isprocessed ? (
                                <div className="flex h-80 items-center">
                                    <Loading />
                                </div>
                            ) : (
                                <div className='flex flex-col gap-2 p-4'>
                                    <div className={poststyle.postwrapper}>
                                        <textarea
                                            placeholder="Share your ideas"
                                            value={postText}
                                            onChange={(e) => setPostText(e.target.value)}
                                            className={poststyle.text_input}
                                        />
                                        {/* preview img*/}
                                        <div className="flex flex-wrap gap-4">
                                            {selectedImages.map((file, index) => (
                                                <div className='relative w-full'>
                                                    <div
                                                        onClick={() => removeImage(index)}
                                                        className={poststyle.remove_img}>
                                                        <Icon icon="mdi:bin" className="h-full w-full" />
                                                    </div>
                                                    <img
                                                        key={index}
                                                        src={URL.createObjectURL(file)}
                                                        alt={`Preview ${index + 1}`}
                                                        className={poststyle.preview_img}
                                                    />
                                                </div>

                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <label htmlFor="uploadIMG">
                                            <div className='w-12 h-12 cursor-pointer'>
                                                <Icon icon="bx:image-add" className="h-full w-full" />
                                            </div>

                                        </label>
                                        {/* Input for selecting images */}
                                        <input
                                            className="hidden"
                                            type="file"
                                            accept="image/*"
                                            id="uploadIMG"
                                            multiple
                                            onChange={handleFileChange}
                                        />

                                        {/* Checkbox for spoil */}
                                        <label>
                                            <input
                                                type="checkbox"
                                                checked={isSpoil}
                                                onChange={() => setIsSpoil(!isSpoil)}
                                            />
                                            Spoil
                                        </label>
                                    </div>
                                    <div >
                                        <h1 className="text-center text-red-700">{error}</h1>
                                    </div>
                                    {/* Button to submit the post */}
                                    <div onClick={handlePost} className="cursor-pointer bg-blue-500 text-white p-2 rounded-lg">
                                        <h1 className="text-center">Post</h1>
                                    </div>
                                </div>
                            )}

                        </Modal>
                    </>
                ) : (<></>)}

                {post?.map((props: Post, index: number) => (
                    <PostBox
                        key={index}
                        {...props}
                        isSpoil={props?.spoil}
                        username={props.profile?.userName}
                        userprofile={props.profile?.profile_image}
                    />
                ))}

            </div>
            {isLoggedIn ? (
                <SideBar className='p-2 flex gap-2'>
                    <h1 className='text-xl font-bold text-left px-3 mb-2 '>Following</h1>
                    <Followers name='Oakza007' image='https://play-lh.googleusercontent.com/cJokjWYV_EhTZJvJG0zbV6CowN5V8EoyjzF4LssGyjhTo6rAVntx3XjD7AkBQ2IdFKw' />
                    <Followers name='Tammy' image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT71xmspkWvWl83N6iCRNHZcok0SMJfrE9SZw&usqp=CAU' />
                    <Followers name='Mookrata' image='https://today.tamu.edu/wp-content/uploads/2019/06/image-220.png' />
                </SideBar>
            ) : (
                <SideBar className='p-2 flex gap-2'>
                    <h1 className='text-xl font-bold text-left px-3 mb-2 '>Following</h1>
                </SideBar>
            )}
        </main>
    )
}

const Link_Btn: string = 'text-base text-center flex flex-row flex-wrap justify-between p-2 '

export default Community