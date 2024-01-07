import styles from '../../Style/Component.module.css'
import { Icon } from '@iconify/react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { useState } from 'react';
import { Timestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import FullPostModal from './FullPostModal';

export type PostBox = {
  uid: string;
  image?: string[];
  text?: string;
  username?: string;
  userprofile?: string;
  isSpoil?: boolean;
  timestamp: Timestamp;
  id: string;
}

const PostBox: React.FC<PostBox> = ({ uid, image, text, username, userprofile, isSpoil, timestamp, id }) => {

  const navigate = useNavigate();

  const [spoilerVisible, setSpoilerVisible] = useState(isSpoil);
  const [showFullText, setShowFullText] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const displayText = showFullText ? text : text?.split('\n').slice(0, 3).join('\n');

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
      <div className={styles.user} onClick={() => navigate(`/community/profile/${uid}`)}>
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
          <p style={{ whiteSpace: 'pre-line' }}>{displayText}</p>
          {text && text.split('\n').length > 3 && !showFullText && (
            <p
              className={styles.read_more}
              onClick={() => setShowFullText(true)}
            >
              Read more...
            </p>
          )}
          {image && image.length > 0 && (
            <Swiper
              pagination={{
                clickable: true,
              }}
              navigation={image.length > 1 ? true : false}
              modules={[Pagination, Navigation]}
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

      {isModalOpen && (
        <FullPostModal post={{ uid, image, text, username, userprofile, isSpoil, timestamp, id }} onClose={() => setIsModalOpen(false)} />
      )}

      <div className={styles.interact_bar}>
        <div onClick={() => alert('ฟ้ารักพ่อ')}>
          <Icon icon="icon-park-solid:like" className={styles.icon_btn} />
          <p>Like</p>
        </div>
        <div onClick={() => setIsModalOpen(true)}>
          <Icon icon="fluent:comment-20-filled" className={styles.icon_btn} />
          <p>Comment</p>
        </div>
        <div onClick={() => alert('ฟ้ารักพ่อ')}>
          <Icon icon="majesticons:share" className={styles.icon_btn} />
          <p>Share</p>
        </div>
      </div>
    </div>
  )
}

export default PostBox