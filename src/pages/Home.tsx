import Book_Card from '../components/Element/Book_Card'
import Book_View from '../components/Layouts/Book_View'
import '../Style/Global.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useEffect, useState } from 'react';
import Books from '../function/Books';
import { Book } from '../function/DeclareType';

function Home(): JSX.Element {

  const [books, setBooks] = useState<Book[]>([]);
  useEffect(() => {
    async function loadBooks() {
      const book = new Books();
      const data: Book[] = await book.getBooks();
      setBooks(data);
    }
    loadBooks();
  }, []);

  const images: string[] = [
    'https://firebasestorage.googleapis.com/v0/b/webdeploytest-e935e.appspot.com/o/RB1.png?alt=media&token=526d5994-6071-416c-b69e-efed733d92c6',
    'https://firebasestorage.googleapis.com/v0/b/webdeploytest-e935e.appspot.com/o/RD2.png?alt=media&token=65929814-2b15-4ba6-bf5b-c170da049aa1',
    'https://firebasestorage.googleapis.com/v0/b/webdeploytest-e935e.appspot.com/o/SD1.png?alt=media&token=a0ea5c41-12f6-458e-9f10-df864c06eac3',
  ];

  return (
      <main className='p-container overflow-x-hidden overflow-y-auto h-full'>

        <div className="hero-container justify-center">
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            loop={true}
            pagination={{
              clickable: true,
            }}
            centeredSlides={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <img src={image} alt={`Image ${index + 1}`} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <Book_View title='Popular' className='grid-row-layout snap-both'>
          {books
            .slice(0, 15)
            .map((props: Book, index: number) => (
              <Book_Card
                key={index}
                id={props.id}
                genre={props.genre}
                title={props.title}
                thumbnail={props.thumbnail}
                user={props.profile?.userName}
              />
            ))
          }
        </Book_View>

        <Book_View title='New Arrival' className='grid-row-layout snap-both'>
          {books
            .sort((a: Book, b: Book) => b.created.seconds - a.created.seconds)
            .slice(0, 15)
            .map((props: Book, index: number) => (
              <Book_Card
                key={index}
                id={props.id}
                genre={props.genre}
                title={props.title}
                thumbnail={props.thumbnail}
                user={props.profile?.userName}
              />
            ))
          }
        </Book_View>
        <Book_View title='Other' className='grid-layout'>
          {books
            .slice(0, 20)
            .sort((a: Book, b: Book) => a.title.localeCompare(b.title))
            .map((props: Book, index: number) => (
              <Book_Card
                key={index}
                id={props.id}
                genre={props.genre}
                title={props.title}
                thumbnail={props.thumbnail}
                user={props.profile?.userName}
              />
            ))
          }
        </Book_View>
      </main>
  )
}

export default Home
