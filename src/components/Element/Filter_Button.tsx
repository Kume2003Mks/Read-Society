import { Icon } from '@iconify/react'
import Style from '../../Style/Component.module.css'

type Filter_Button = {
  icon: string;
  label: string;
  onClick?: () => void;
}

const Filter_Button: React.FC<Filter_Button> = ({ icon, label, onClick}) => {
  return (
    <div className={Style.filter_list} onClick={onClick}>
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