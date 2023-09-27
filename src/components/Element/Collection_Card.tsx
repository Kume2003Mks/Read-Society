import styles from '../../Style/Component_Gobal.module.css'

const Collection_Card: JSX.ElementType = ({ props }: any) => {
    return (
        <div className={`h-fit p-2 justify-center rounded-lg cursor-pointer hover:bg-slate-300`}>
            <div>
                <img src={props.image_url} alt={props.authors} className={`w-full rounded-lg ${styles.A4_Size}`} />
                <div className='mt-1'>
                    <p className='text-sm truncate'>{props.title}</p>
                    <p className='text-xs text-slate-500'>{props.authors}</p>
                </div>
            </div>
        </div>
    )
}

export default Collection_Card