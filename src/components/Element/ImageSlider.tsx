import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import  '../../Style/class.css';
import '../../Style/ImagesS.css'

const ImageSlider: React.FC = () => {
  const images = [
    'https://img.freepik.com/free-vector/abstract-yellow-black-wide-banner_1017-32326.jpg?w=1800&t=st=1695832119~exp=1695832719~hmac=a93a8034d230e5a4c491d67c322c33fae33b638f7852490feda73fe4012c4d12',
    'https://img.freepik.com/free-vector/dark-blue-banner-with-arrow-style-yellow-shapes_1017-32328.jpg?w=1380&t=st=1695832737~exp=1695833337~hmac=404bc72d3f291dde5d58becc10671abff5458d73c7b6dc3c3dedb5947d320d99',
    'https://img.freepik.com/free-vector/abstract-yellow-black-wide-banner_1017-32326.jpg?w=1800&t=st=1695832119~exp=1695832719~hmac=a93a8034d230e5a4c491d67c322c33fae33b638f7852490feda73fe4012c4d12',
  ];


  return (
    <Carousel>
      {images.map((image, index) => (
        <div className = 'object-none h-30 w-18' key={index}>
          <img src={image} alt={`Image ${index + 1}`} />
        </div>
      ))}
    </Carousel>
  );
};

export default ImageSlider;




