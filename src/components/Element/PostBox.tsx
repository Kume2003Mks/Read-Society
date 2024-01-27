import styles from '../../Style/Component.module.css'
import { Icon } from '@iconify/react';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

import { Pagination } from 'swiper/modules';
import { useState } from 'react';
import { Timestamp } from 'firebase/firestore';

type PostBox = {
  image?: string[];
  text?: string;
  username?: string;
  userprofile?: string;
  isSpoil?: boolean;
  timestamp: Timestamp;
}

const PostBox: React.FC<PostBox> = ({ image, text, username, userprofile, isSpoil, timestamp }) => {

  const [spoilerVisible, setSpoilerVisible] = useState(isSpoil);

  const formattedDate = timestamp
  ? new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000)
  : null;

const formatDate = (date: Date | null) => {
  if (!date) return 'No date';

  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  const hour = date.getHours().toString().padStart(2, '0');
  const minute = date.getMinutes().toString().padStart(2, '0');

  return `${day}/${month}/${year} ${hour}:${minute}`;
};

const formattedDateString = formatDate(formattedDate);


  return (
    <div className={styles.post_Box}>
      <div className={styles.user}>
        <img src={userprofile} alt={username} className={styles.profile_user} />
        <div>
          <h1>{username}</h1>
          <p>{formattedDateString}</p>
        </div>
      </div>

      <div className={styles.contentWrapper}>
        {spoilerVisible && isSpoil && (
          <p className={styles.spoiler_text} onClick={() => setSpoilerVisible(false)}>
            Click to reveal spoiler
          </p>
        )}
        <div className={`${spoilerVisible ? styles.spoiler : "flex flex-col gap-2"}`}>
          <p>{text}</p>
          {image && image.length > 0 && (
            <Swiper
              pagination={true}
              modules={[Pagination]}
              className={styles.post_image}
            >
              {image.map((imageSrc, index) => (
                <SwiperSlide key={index}>
                  <img src={imageSrc} alt={`Image ${index + 1}`} loading="lazy" />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>

      </div>

      <div className='flex gap-2'>
        <div className='flex gap-1'>
          <Icon icon="icon-park-solid:like" className={styles.icon_btn} />
          <p>Like</p>
        </div>
        <div className='flex gap-1'>
          <Icon icon="fluent:comment-20-filled" className={styles.icon_btn} />
          <p>Comment</p>
        </div>
        <div className='flex gap-1'>
          <Icon icon="majesticons:share" className={styles.icon_btn} />
          <p>Share</p>
        </div>
      </div>

    </div>
  )
}

export default PostBox
