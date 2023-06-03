import '../../components/base.css'
import './Home.css';
import HomeToprated from './HomeToprated';
import HomePopularity from './HomePopularity';
import HomeNowPlaying from './HomeNowPlaying';
import HomeUpComing from './HomeUpComing';
import HomeGenres from './HomeGenres';

const Home = () => {
  return (
    <div id="web-homePage-body">
      <HomePopularity />
      <HomeToprated />
      <HomeNowPlaying />
      <HomeUpComing />
      <HomeGenres />  
    </div>
  );
};

export default Home;
