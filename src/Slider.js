import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Slider.css"

const slider = ({start}) => {
    return (
      <div className='size'>
        <Carousel>
            <Carousel.Item>
            
            <img
              className="p1"
              src="https://www.shutterstock.com/image-photo/betel-nuts-over-white-background-260nw-1079387177.jpg"
              alt="First slide"
            />
           
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="p2"
              src="https://st3.depositphotos.com/1009329/19394/i/450/depositphotos_193941814-stock-photo-closeup-of-betel-nut.jpg"
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="p3"
              src="https://www.shutterstock.com/image-photo/betel-nut-over-white-background-260nw-1087965629.jpg"
              alt="First slide"
            />
          </Carousel.Item>
      </Carousel>
      </div>
     
    )
}


export default slider
// https://www.shutterstock.com/image-photo/betel-nuts-over-white-background-260nw-1079387177.jpg
// https://st3.depositphotos.com/1009329/19394/i/450/depositphotos_193941814-stock-photo-closeup-of-betel-nut.jpg
// https://www.shutterstock.com/image-photo/betel-nut-over-white-background-260nw-1087965629.jpg