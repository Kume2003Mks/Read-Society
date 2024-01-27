import styles from '../../Style/Component.module.css'
import { Icon } from '@iconify/react';

interface Capsule {
  label:string;
  color?:string;
  icon?:string;
}
const Capsule:React.FC<Capsule> = ({label, color,icon}) => {
  
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