import styles from '../../Style/Component.module.css'
import { Icon } from '@iconify/react';
const Capsule = ({label, color,icon}:any) => {
  
  return (
    <div className='p-1 flex flex-row items-center gap-1 rounded-full border-2 cursor-pointer' style={{borderColor: color}}>
      { icon ? 
      (<><Icon icon={icon} className={styles.circle} style={{color:color}}/></>):
      (<><div className={styles.circle} style={{ backgroundColor: color}}/></>)}
      
      <p className={styles.header}>{label}</p>
    </div>
  )
}

export default Capsule