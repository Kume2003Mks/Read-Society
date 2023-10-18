import { Icon } from '@iconify/react'
import Style from '../../Style/Component.module.css'

const Filter_Button = ({icon, label}:any) => {
  return (
    <div className={Style.filter_list}>
      <div className={`${Style.circle} w-6 h-6`} style={{ backgroundColor: 'gray' }}>
        <Icon icon={icon} className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white' />
      </div>
      <p>
        {label}
      </p>
    </div>
  )
}

export default Filter_Button