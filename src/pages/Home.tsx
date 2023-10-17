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

function Home(): JSX.Element {

  const [books, setBooks] = useState<any>([]);
  useEffect(() => {
    async function loadBooks() {
      const book = new Books();
      const data: any = await book.getBooks();
      setBooks(data);
    }
    loadBooks();
  }, []);

  const images = [
    'https://img.freepik.com/free-vector/abstract-yellow-black-wide-banner_1017-32326.jpg?w=1800&t=st=1695832119~exp=1695832719~hmac=a93a8034d230e5a4c491d67c322c33fae33b638f7852490feda73fe4012c4d12',
    'https://img.freepik.com/free-vector/dark-blue-banner-with-arrow-style-yellow-shapes_1017-32328.jpg?w=1380&t=st=1695832737~exp=1695833337~hmac=404bc72d3f291dde5d58becc10671abff5458d73c7b6dc3c3dedb5947d320d99',
    'https://img.freepik.com/free-vector/flat-background-halloween-season-celebration_23-2150753020.jpg?w=1060&t=st=1697388015~exp=1697388615~hmac=454a6b3150eced436522e1e67e893231a3003d03b424d60421097d5d1ae92376',
  ];

  return (
    <>
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
            .map((props: any, index: any) => (
              <Book_Card
                key={index}
                genre={props.genre}
                title={props.title}
                thumbnail={props.thumbnail}
                user={props.owner.userName}
              />
            ))
          }
        </Book_View>

        <Book_View title='New Arrival' className='grid-row-layout snap-both'>
          {books
            .sort((a: any, b: any) => b.created.seconds - a.created.seconds)
            .slice(0, 15)
            .map((props: any, index: any) => (
              <Book_Card
                key={index}
                genre={props.genre}
                title={props.title}
                thumbnail={props.thumbnail}
                user={props.owner.userName}
              />
            ))
          }
        </Book_View>
        <Book_View title='Other' className='grid-layout'>
          {books
            .slice(0, 20)
            .sort((a: any, b: any) => a.title.localeCompare(b.title))
            .map((props: any, index: any) => (
              <Book_Card
                key={index}
                genre={props.genre}
                title={props.title}
                thumbnail={props.thumbnail}
                user={props.owner.userName}
              />
            ))
          }
        </Book_View>
      </main>
    </>
  )
}

export default Home
