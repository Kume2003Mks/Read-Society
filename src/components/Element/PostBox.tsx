import styles from '../../Style/Component_Gobal.module.css'
import { Icon } from '@iconify/react';

const PostBox: JSX.ElementType = ({ img_link, content }: any) => {

  return (
    <div className={styles.post_Box}>
      <div className='flex'>

        <img src="https://i.pinimg.com/564x/a2/0c/7d/a20c7d2976558fb38392403c51cc5cb1.jpg" alt='RS' className='w-12 h-12 rounded-full' />

        <div className='ml-2 text-xl'>TOM<br/>
          <div className='text-sm'>10 days</div>
        </div>
      </div>
      <p className=''>{content}</p>

      {img_link ?
        (<> <img src={img_link} className={styles.post_image} /></>)
        :
        (<></>)}

      <div className='flex gap-2 mt-4'>
        <div className='flex gap-1'>
          <Icon icon="icon-park-solid:like" width="25" height="25" />
          <p>Like</p>
        </div>
        <div className='flex gap-1'>
          <Icon icon="fluent:comment-20-filled" width="25" height="25" />
          <p>Comment</p>
        </div>
        <div className='flex gap-1'>
          <Icon icon="majesticons:share" width="25" height="25" />
          <p>Share</p>
        </div>
      </div>

    </div>
  )
}

export default PostBox
