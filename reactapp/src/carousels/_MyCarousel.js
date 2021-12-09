import React, { useState } from 'react';
import { Col } from 'reactstrap';

import {
  FaChevronRight,
  FaChevronLeft,
} from "react-icons/fa";

const MyCarousel = (props) => {
  
  var firstPic = null;
  if (props.picClicked) {
    console.log(props.imageData);
    const result = props.imageData.filter(image => image.src == props.picClicked);
    firstPic = result[0];
  } else {
    firstPic = props.imageData[0];
  }

  const [image, setImage] = useState(firstPic);

  var changeImage = (image, position) => {
    if (position == 'next') {
      var i = image.number + 1;
    } else {
      var i = image.number - 1;
    };
    var newImage = props.imageData.filter(image => image.number == i);
    setImage(newImage[0]);
  }

  var carouselSize;
  if (props.size == 'place-size') {
    carouselSize = {height: '14vw', width: '28vw', objectFit: 'cover'}
  } else if (props.size == 'home-size') {
    carouselSize = {height: '23vw', width: '41vw', objectFit: 'cover'}
  } else if (props.size == 'wedding-size') {
    carouselSize = { maxWidth: '90%', maxHeight: '500px', objectFit: 'cover'}
  }
  
  if (props.size != 'wedding-size') {
    return (
        <Col style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          
            {image.number == 1 ? 
            <FaChevronLeft className="carousel-chevron opacity-light"/> 
            : <FaChevronLeft onClick={() => changeImage(image, 'prev')} className="carousel-chevron"/> 
            }
          
            <img src={image.src} className="carousel-shadow" style={carouselSize}/>
        
            {image.number == props.imageData.length ?
            <FaChevronRight className="carousel-chevron opacity-light"/>
            :
            <FaChevronRight onClick={() => changeImage(image, 'next')} className="carousel-chevron"/>
            }
          
        </Col>
      
    );
  } else {
    return (
      <div style={{display: 'flex', justifyContent: 'center'}}>
          <div style={{width: '5%', display: 'flex', alignItems: 'center'}}>
            {image.number == 1 ? 
            <FaChevronLeft className="carousel-chevron opacity-light"/> 
            : <FaChevronLeft onClick={() => changeImage(image, 'prev')} className="carousel-chevron"/> 
            }
          </div>

          <div style={{width: '90%', display: 'flex', justifyContent: 'center'}}>
            <img src={image.src} className="carousel-shadow" style={carouselSize}/>
          </div>
          <div style={{width: '5%', display: 'flex', alignItems: 'center'}}>
            {image.number == props.imageData.length ?
            <FaChevronRight className="carousel-chevron opacity-light"/>
            :
            <FaChevronRight onClick={() => changeImage(image, 'next')} className="carousel-chevron"/>
            }
          </div>
      </div>
    
  );
  }
  
}

  export default MyCarousel;