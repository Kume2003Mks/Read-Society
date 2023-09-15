import styles from '../../Style/Component_Gobal.module.css'
import React from 'react'

const Sbar = ({More}:any) => {
  return (
    <div className='px-[8px] py-[10px]'>
        <div className='flex h-[50px] py-[2px] border-2 rounded-[13px] border-[#818487]'>
            <div className='flex pl-[9px] '>
                <div className='bg-[#818487] h-[42px] w-[42px] rounded-full'/>
                <div className='py-[10px] pl-[10px] w-[154px] items-center'>
                    <p className={styles.header}>{More}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Sbar