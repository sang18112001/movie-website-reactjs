import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
const HomeBanner = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 100,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const slideImages = [
    { id: '616037', url: 'https://image.tmdb.org/t/p/w1280/6eFDnvpsgPMrxcVnLCM12rBv8Fk.jpg' },
    { id: '299536', url: 'https://image.tmdb.org/t/p/w1280/icUSGFn22cP2BQ0tXCIsykWVCQ.jpg' },
    { id: '299534', url: 'https://image.tmdb.org/t/p/w1280/yaRps1bMQLyz54M8ib5YdA2a2RZ.jpg' },
  ];
  return (
    <Fragment>
      <div className="slide-container">
        <Slider {...settings}>
          {slideImages.map((slideImage, index) => (
            <div key={index} className="bannerContainer">
              <div className="bannerImage">
                <img src={slideImage.url} />
              </div>
              <Link to={`detail/${slideImage.id}`} className="bannerPlay">
                <i className="fa-solid fa-play"></i>
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </Fragment>
  );
};

export default HomeBanner;
