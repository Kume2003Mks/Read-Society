import styles from '../../Style/Component_Gobal.module.css'
import React from 'react'


const Sbar = ({Hot,color}:any) => {
  return (
    <div className='p-1 flex flex-row items-center gap-1 rounded-full border-2 cursor-pointer' style={{borderColor: color}}>
      <div style={{ backgroundColor: color}}/>
      <p className={styles.header}>{Hot}</p>
    </div>
  )
}

export default Sbar