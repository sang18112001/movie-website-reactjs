import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { IMG_PATH } from '../../config';
import { useEffect, useState, useRef } from 'react';

const ShowMedias = ({ mediaRef, backdrops, posters }) => {
  const getMedias = mediaRef === 'backdrops' ? backdrops : posters;
  const settings = {
    dots: false,
    infinite: true,
    speed: 100,
    slidesToShow: mediaRef === 'backdrops' ? 2 : 5,
    slidesToScroll: 3,
  };
  const numMedias = getMedias.length < 20 ? getMedias.length : 20;
  return (
    <div>
      <Slider {...settings}>
        {getMedias.slice(0, numMedias).map((media, index) => (
          <div className="imageContainer" key={index}>
            <img src={IMG_PATH + media.file_path} width="100%" />
          </div>
        ))}
      </Slider>
    </div>
  );
};
const MovieMedia = ({ medias }) => {
  const [mediaRef, setMediaRef] = useState('backdrops');
  const backdropsRef = useRef();
  const postersRef = useRef();
  const { backdrops, posters } = medias;
  useEffect(() => {
    backdropsRef.current.addEventListener('click', () => {
      setMediaRef(backdropsRef.current.id);
      backdropsRef.current.classList.add('active-media');
      postersRef.current.classList.remove('active-media');
    });
    postersRef.current.addEventListener('click', () => {
      setMediaRef(postersRef.current.id);
      backdropsRef.current.classList.remove('active-media');
      postersRef.current.classList.add('active-media');
    });
  }, []);
  return (
    <div className="main-item movie-media">
      <ul className="media">
        <li className="media-title">
          <h4 className="content-title">Media</h4>
        </li>
        <li className="">
          <p id="backdrops" className="button-media active-media" ref={backdropsRef}>
            Backdrops
          </p>
        </li>
        <li className="">
          <p id="media" className="button-media" ref={postersRef}>
            Posters
          </p>
        </li>
      </ul>
      <div className="media-box">
        <div className="media-content">
          <div className={`sub-media ${mediaRef} active-block`}>
            <ShowMedias mediaRef={mediaRef} backdrops={backdrops} posters={posters} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieMedia;
