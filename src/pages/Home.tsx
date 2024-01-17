import { useMemo, Suspense, lazy, } from 'react';
import '../Style/Global.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Book } from '../function/DeclareType';
import Book_View from '../components/Layouts/Book_View';
import Loading from '../components/loading/Loading';
import { useBook } from '../function/context/BooksContext';

const Book_Card = lazy(() => import('../components/Element/Book_Card'));

function Home(): JSX.Element {

  const { books, loading } = useBook();

  const images: string[] = [
    'https://firebasestorage.googleapis.com/v0/b/webdeploytest-e935e.appspot.com/o/RB1.png?alt=media&token=526d5994-6071-416c-b69e-efed733d92c6',
    'https://firebasestorage.googleapis.com/v0/b/webdeploytest-e935e.appspot.com/o/RD2.png?alt=media&token=65929814-2b15-4ba6-bf5b-c170da049aa1',
    'https://firebasestorage.googleapis.com/v0/b/webdeploytest-e935e.appspot.com/o/SD1.png?alt=media&token=a0ea5c41-12f6-458e-9f10-df864c06eac3',
  ];

  const memoizedBooks = useMemo(() => books, [books]);

  return (
    <main className='p-container overflow-x-hidden h-screen'>

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
              <img src={image} alt={`Image ${index + 1}`} loading="lazy" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <Book_View title='Popular' className='grid-row-layout snap-both'>
        {loading ? (<Loading />) : (
          <Suspense fallback={<div>Loading...</div>}>
            {memoizedBooks
              .slice(0, 15)
              .sort((a: Book, b: Book) => b.like - a.like)
              .map((props: Book, index: number) => (
                <Book_Card key={index} {...props} user={props.profile?.userName} />
              ))}
          </Suspense>
        )}
      </Book_View>

      <Book_View title='New Arrival' className='grid-row-layout snap-both'>
        {loading ? (<Loading />) : (

          <Suspense fallback={<div>Loading...</div>}>
            {memoizedBooks
              .slice(0, 15)
              .sort((a: Book, b: Book) => b.created.seconds - a.created.seconds)
              .map((props: Book, index: number) => (
                <Book_Card key={index} {...props} user={props.profile?.userName} />
              ))}
          </Suspense>
        )}
      </Book_View>

      <Book_View title='Other' className='grid-layout'>
        {loading ? (<Loading />) : (
          <Suspense fallback={<div>Loading...</div>}>
            {memoizedBooks
              .slice(0, 20)
              .sort((a: Book, b: Book) => a.title.localeCompare(b.title))
              .map((props: Book, index: number) => (
                <Book_Card key={index} {...props} user={props.profile?.userName} />
              ))}
          </Suspense>
        )}
      </Book_View>

    </main>
  )
}

export default Home
