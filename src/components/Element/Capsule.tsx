import styles from '../../Style/Component_Gobal.module.css'

const Capsule = ({label, color}:any) => {
  
  return (
    <div className='p-1 flex flex-row items-center gap-1 rounded-full border-2 cursor-pointer' style={{borderColor: color}}>
      <div className={styles.circle} style={{ backgroundColor: color}}/>
      <p className='text-sm'>{label}</p>
    </div>
  )
}

export default Capsule