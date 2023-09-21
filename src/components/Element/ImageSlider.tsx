import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import  '../../Style/class.css';

const ImageSlider: React.FC = () => {
  const images = [
    'https://images.wallpaperscraft.com/image/single/cat_heterochromia_black_cat_128354_1920x1080.jpg',
    'https://images.wallpaperscraft.com/image/single/cat_drawing_art_94604_1920x1080.jpg',
    'https://images.wallpaperscraft.com/image/single/cat_winter_fluffy_99366_1920x1080.jpg',
  ];

  const imageSize = {
    width: 'fix', // Set your desired width here
    height: '450px', // Set your desired height here
  };

  return (
    <Carousel>
      {images.map((image, index) => (
        <div key={index}>
          <img src={image} alt={`Image ${index + 1}`} style={imageSize}/>
        </div>
      ))}
    </Carousel>
  );
};

export default ImageSlider;




