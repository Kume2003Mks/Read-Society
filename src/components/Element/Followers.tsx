import styles from '../../Style/Component_Gobal.module.css'

const Followers: JSX.ElementType = ({ image, name }:any) => {
    return (
        <div className='flex flex-row gap-2 cursor-pointer'>
            <img src={image} alt={name}
            className={styles.profile_user} />
            <h1 className=' self-center'>{name}</h1>
        </div>
    )
}

export default Followers