import { Link } from 'react-router-dom';
import styles from '../../Style/Component.module.css'

type BookCardProps = {
  genre: string;
  title: string;
  thumbnail: string;
  user?: string;
  id: string;
}

const Book_Card: React.FC<BookCardProps>  = ({ genre, title, thumbnail, user, id }) => {

  const genreColors: { [genre: string]: string } = {
    Horror: "#FF5733", // Red-Orange
    Science: "#33A6FF", // Sky Blue
    Mystery: "#663399", // Dark Purple
    Comics: "#FFD700", // Gold
    Nonfiction: "#228B22", // Forest Green
    Fantasy: "#9932CC", // Dark Orchid
    Humor: "#FF6347", // Tomato
    Romance: "#FF69B4", // Hot Pink
    Action: "#FF4500", // Orange-Red
    Physics: "#8A2BE2", // Blue-Violet
    Contemporary: "#2E8B57", // Sea Green
    SciFi: "#00CED1", // Dark Turquoise
    History: "#B8860B", // Dark Goldenrod
    GraphicNovels: "#1E90FF", // Dodger Blue
    Adult: "#8B008B", // Dark Magenta
    Biography: "#FFE4C4", // Bisque
    FantasyRomance: "#FF69B4", // Hot Pink
    HistoricalFiction: "#CD853F", // Peru
    SelfHelp: "#20B2AA", // Light Sea Green
    Thriller: "#8B0000", // Dark Red
    Adventure: "#FFD700", // Gold
    Poetry: "#FF1493", // Deep Pink
  };

  const genreColor = genreColors[genre] || 'red';

  return (
    <div className='px-2 pb-2 h-fit justify-center rounded-lg cursor-pointer flex flex-col flex-1 snap-start hover:bg-slate-300'>
      {/**category label*/}
      <h1 className='text-xs text-black text-right w-fit self-end px-1 pt-1 rounded-t-lg' style={{ backgroundColor: genreColor }}>{genre}</h1>
      {/**card */}
      <Link to={`/book-detail/${id}`}>
        <div className={`h-fill w-fill justify-center cursor-pointer `}>
          <div>
            <img src={thumbnail} alt={`${title} - ${genre} book cover`} className={`w-full h-auto rounded-lg object-cover ${styles.A4_Size}`} />
            <div className='mt-1'>
              <p className='text-sm truncate'>{title}</p>
              <p className='text-xs text-slate-500'>{user}</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default Book_Card