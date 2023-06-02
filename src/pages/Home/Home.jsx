import '../../components/base.css'
import './Home.css';
import HomeBanner from './HomeBanner';
import HomeToprated from './HomeToprated';
import HomePopularity from './HomePopularity';
import HomeNowPlaying from './HomeNowPlaying';
import HomeUpComing from './HomeUpComing';
import HomeGenres from './HomeGenres';
import { useSelector } from 'react-redux';


const Home = () => {
  return (
    <div id="web-homePage-body">
      <HomeBanner />
      <HomeToprated />
      <HomePopularity />
      <HomeNowPlaying />
      <HomeUpComing />
      <HomeGenres />  
    </div>
  );
};

export default Home;
