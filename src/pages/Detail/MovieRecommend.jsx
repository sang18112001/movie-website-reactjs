import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { IMG_PATH } from '../../config';
import { Link } from 'react-router-dom';
const MovieRecommend = ({ recommendation }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 100,
    slidesToShow: 3,
    slidesToScroll: 3,
  };
  return (
    <div className="main-item movie-recommendations">
      <h4 className="content-title">Recommendations</h4>
      <div className="recommend-main">
        <Slider {...settings}>
          {recommendation.map((item, index) => {
            const newImagePath =
              item.backdrop_path !== null
                ? IMG_PATH + item.backdrop_path
                : 'https://archive.org/download/no-photo-available/no-photo-available.png';
            return (
              <div className="recommend-item" key={index}>
                <Link to={`/detail/${item.id}`}>
                  <img src={newImagePath} alt="" width="100%" />
                </Link>
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
};

export default MovieRecommend;
