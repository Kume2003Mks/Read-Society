import styles from '../../Style/Component_Gobal.module.css'
import { Icon } from '@iconify/react';

const Capsule = ({}:any) => {
  
  return (
    <div className='py-[20px]'>
        <div className=' w-[950px] h-[500px] border-2 rounded-[13px] border-[#000000]'>
            <div className='pl-[18px] pt-[15px] flex'>
              {/* */}
              <img src="https://i.pinimg.com/564x/a2/0c/7d/a20c7d2976558fb38392403c51cc5cb1.jpg" className='w-[50px] h-[50px] rounded-full'/>
                <div className='pl-[10px] text-[20px]'>TOM<br/>
                <div className='text-[15px]'>sOs</div>
                </div>
            </div>
            <p className='pl-[24px] pt-[14px]'>OKOKO</p>
            <div className='px-[14px] py-[6px]'>
                <div className='w-[920px] h-[330px] rounded-[10px] bg-black'>
                  <img src="https://i.pinimg.com/564x/fd/2d/de/fd2ddebfeab9f0c46248c8f866ab33d2.jpg" className='w-full h-full object-cover aspect-video '/>
                </div>
            </div>
            <div className='flex py-[9px]'>
              <div className='flex pl-[20px]'>
              <Icon icon="icon-park-solid:like" width="25" height="25" />
              <p className='pl-[5px]'>Like</p>
              </div>
              <div className='flex pl-[25px]'>
              <Icon icon="fluent:comment-20-filled" width="25" height="25" />
              <p className='pl-[5px]'>Comment</p>
              </div>
              <div className='flex pl-[25px]'>
              <Icon icon="majesticons:share" width="25" height="25" />
              <p className='pl-[5px]'>Share</p>
              </div>
            </div>
            
        </div>
    </div>
  )
}

export default Capsule