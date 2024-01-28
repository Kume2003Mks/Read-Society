// FullPostModal.tsx
import { useEffect, useState, lazy, Suspense } from 'react';
import Modal from '../Modal/Modal'; // Import the Modal component
import styles from '../../Style/Component.module.css'; // Import styling
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import { PostBox } from './PostBox';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useAuth } from '../../function/context/AuthContext';
import userDataBase from '../../function/userDataBase';
import { Comment, Profile } from '../../function/DeclareType';
import Social from '../../function/Social';
import Swal from 'sweetalert2';

const Comment_Box = lazy(() => import('./Comment_Box'));

interface FullPostModalProps {
    onClose: () => void;
    post: PostBox; // Assuming you have a PostBox type
}

const FullPostModal: React.FC<FullPostModalProps> = ({ onClose, post }) => {
    const { userData, isLoggedIn } = useAuth();
    const [userProfile, setUserProfile] = useState<Profile | null>(null)
    const [spoilerVisible, setSpoilerVisible] = useState(post.isSpoil);
    const [comment, setComment] = useState<Comment[]>([])
    const [commentText, setCommentText] = useState<string>('');
    const [reloadComponent, setReloadComponent] = useState(false);

    useEffect(() => {
        const getProfile = async (uid: string) => {
            const Uprofile = new userDataBase(uid);
            const userProfile = await Uprofile.getProfile()
            setUserProfile(userProfile)
        }
        if (userData && userData.user.uid) {
            getProfile(userData.user.uid)
        }

        async function loadComments() {
            try {
                const social = new Social();
                const comments = await social.getComments(post.id);
                setComment(comments)
            } catch (error) {
                console.error("Error loading Comment:", error);
            }
        }

        loadComments()

    }, [userData, post, reloadComponent]);

    const navigate = useNavigate();

    const formattedDate = post.timestamp
        ? new Date(post.timestamp.seconds * 1000 + post.timestamp.nanoseconds / 1000000)
        : null;

    const formatDate = (date: Date | null) => {
        if (!date) return 'No date';

        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        const hour = date.getHours().toString().padStart(2, '0');
        const minute = date.getMinutes().toString().padStart(2, '0');

        return `${day}/${month}/${year} ${hour}:${minute}`;
    };

    const formattedDateString = formatDate(formattedDate);

    const handleSendComment = async () => {
        let uid: string = ""
        if (userData && userData.user.uid) {
            uid = userData.user.uid
        }

        if (commentText.trim() !== '') {
            const social = new Social();
            const newComment: Comment = {
                text: commentText,
                uid: uid,
            }
            setComment([...comment, newComment]);

            const success = await social.addComment(commentText, uid, post.id);

            if (success) {
                console.log('Comment added successfully!');
            } else {
                console.error('Failed to add comment.');
            }

            setCommentText('');
            setReloadComponent((prev) => !prev);

        }
    };

    const copyToClipboard = () => {
        const currentUrl = window.location.href;
        const shareText = `${currentUrl}?token=${post.id}`;
      
        navigator.clipboard.writeText(shareText)
          .then(() => {
            Swal.fire({
              icon: 'success',
              title: 'Copied!',
              text: 'URL copied to clipboard!',
              timer: 1500,
              showConfirmButton: false,
            });
          })
          .catch((err) => {
            console.error('Unable to copy to clipboard', err);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Unable to copy to clipboard!',
            });
          });
      };

    return (
        <Modal isOpen={true} onClose={onClose} title={`Post by ${post.username}`}>
            <div className={styles.post_Box_modal}>
                <div className={styles.user} onClick={() => navigate(`/community/profile/${post.uid}`)}>
                    <img src={post.userprofile} alt={post.username} className={styles.profile_user} />
                    <div>
                        <h1>{post.username}</h1>
                        <p>{formattedDateString}</p>
                    </div>
                </div>

                <div className={styles.contentWrapper}>
                    {spoilerVisible && post.isSpoil && (
                        <p className={styles.spoiler_text} onClick={() => setSpoilerVisible(false)}>
                            Click to reveal spoiler
                        </p>
                    )}
                    <div className={`${spoilerVisible ? styles.spoiler : "flex flex-col gap-2"}`}>
                        <p style={{ whiteSpace: 'pre-line' }}>{post.text}</p>

                        {post.image && post.image.length > 0 && (
                            <Swiper
                                pagination={{
                                    clickable: true,
                                }}
                                navigation={post.image.length > 1 ? true : false}
                                modules={[Pagination, Navigation]}
                                className={styles.post_image}
                            >
                                {post.image.map((imageSrc, index) => (
                                    <SwiperSlide key={index}>
                                        <img src={imageSrc} alt={`Image ${index + 1}`} loading="lazy" />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        )}
                    </div>
                </div>

                <div className={styles.interact_bar_modal}>
                    <div>
                        <Icon icon="fluent:comment-20-filled" className={styles.icon_btn} />
                        <p>Comment</p>
                    </div>
                    <div onClick={copyToClipboard}>
                        <Icon icon="majesticons:share" className={styles.icon_btn} />
                        <p>Share</p>
                    </div>
                </div>
            </div>

            {isLoggedIn && (
                <div className={styles.comment_section}>
                    <div className={styles.comment_box_input}>
                        <img src={userProfile?.profile_image} alt={userProfile?.userName} className={styles.profile_user} />
                        <input
                            type="text"
                            placeholder="Write a comment..."
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                        />
                        <div onClick={handleSendComment} className={styles.sendButton}>
                            <Icon icon="mingcute:send-line" className='w-full h-full' />
                        </div>
                    </div>
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
            )}

        </Modal>
    );
};

export default FullPostModal;
