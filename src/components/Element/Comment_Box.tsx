import { useNavigate } from 'react-router-dom';
import Styles from '../../Style/Comment.module.css'

interface Comment_Prop {
    text?: string;
    image?: string;
    user_name?: string;
    uid?: string;
}

const Comment_Box :React.FC<Comment_Prop> = ({text, image, user_name, uid}) => {

    const navigate = useNavigate();

    return (
        <div className={Styles.comment_container}>
            {/* profile img */}
            <div className={Styles.profile} onClick={() => navigate(`/community/profile/${uid}`)}>
                <img src={image} alt={user_name} />
            </div>
            {/* text box */}
            <div className={Styles.comment_content}>
                <div className={Styles.user_name} onClick={() => navigate(`/community/profile/${uid}`)}>
                    <h1>@{user_name}</h1>
                </div>
                <div >
                    <p>{text}</p>
                </div>
            </div>
        </div>
    )
}

export default Comment_Box