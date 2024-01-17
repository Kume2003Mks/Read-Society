import { Link } from 'react-router-dom';
import styles from '../../Style/Component.module.css'
import { Icon } from "@iconify/react";

type BookCardProps = {
  genre: string;
  title: string;
  thumbnail: string;
  user?: string;
  id: string;
  like: number;
}

const Book_Card: React.FC<BookCardProps> = ({ genre, title, thumbnail, user, id, like }) => {

  const genreColors: { [genre: string]: string } = {
    Horror: "#FF5733",      // Red-Orange
    Mystery: "#663399",     // DarkSlateBlue
    Drama: "#800000",       // Maroon
    Comedy: "#FFD700",      // Gold
    Science: "#008080",     // Teal
    Adventure: "#006400",   // DarkGreen
    Fantasy: "#9932CC",     // DarkOrchid
    Romance: "#FF1493",     // DeepPink
    Action: "#FF4500",      // OrangeRed
    Physics: "#4682B4",     // SteelBlue
    SciFi: "#00CED1",       // DarkTurquoise
    History: "#8B4513",     // SaddleBrown
    Dystopian: "#696969",   // DimGray
    Adult: "#800080",       // Purple
    Biography: "#2E8B57",   // SeaGreen
    Poetry: "#800080"       // Purple
  };

  const genreColor = genreColors[genre] || 'red';

  return (
    <div className='px-2 pb-2 h-fit justify-center rounded-lg cursor-pointer flex flex-col flex-1 snap-start hover:bg-slate-300'>
      {/**category label*/}
      <h1 className='text-xs text-black text-right w-fit self-end px-1 pt-1 rounded-t-lg' style={{ backgroundColor: genreColor }}>{genre}</h1>
      {/**card */}
      <Link to={`/book-detail/${id}`}>
        <div className={`cursor-pointer `}>
          <div>
            <img src={thumbnail} alt={`${title} - ${genre} book cover`} className={`w-full h-auto rounded-lg object-cover ${styles.A4_Size}`} />
            <div className='mt-1 relative'>
              <div className=' flex flex-col pr-6'>
                <p className='text-sm truncate'>{title}</p>
                <p className='text-xs text-slate-500'>{user}</p>
              </div>
              <div className='absolute flex flex-col right-1 bottom-[-4px]'>
                <Icon icon="mdi:heart" className={`w-6 h-6`} />
                <p className='text-xs text-center'>{like}</p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default Book_Card