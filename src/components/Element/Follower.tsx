import { useNavigate } from 'react-router-dom';
import styles from '../../Style/Component.module.css'

type Follower = {
    uid: string;
    image: string;
    name: string;
}

const Follower: React.FC<Follower> = ({ uid,image, name }) => {

    const navigate = useNavigate();

    return (
        <div className='flex flex-row gap-2 cursor-pointer' onClick={() => navigate(`/community/profile/${uid}`)}>
            <img src={image} alt={name}
                className={styles.profile_user} />
            <h1 className='self-center'>{name}</h1>
        </div>
    )
}

export default Follower