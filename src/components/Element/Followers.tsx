import styles from '../../Style/Component.module.css'

type Followers = {
    image: string;
    name: string;
}

const Followers: React.FC<Followers> = ({ image, name }) => {
    return (
        <div className='flex flex-row gap-2 cursor-pointer'>
            <img src={image} alt={name}
                className={styles.profile_user} />
            <h1 className='self-center'>{name}</h1>
        </div>
    )
}

export default Followers