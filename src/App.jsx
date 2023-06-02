import { BrowserRouter, Route, Routes, useLocation, useParams } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home/Home';
import TypeOfMovies from './pages/TypeOfMovies/TypeOfMovies';
import Detail from './pages/Detail/Detail'
import Account from './pages/SignIn/SignIn';
import WatchMovie from './pages/WatchMovie/WatchMovie';
import Dashboard from './pages/Dashboard/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />}/>
          <Route path="/:type" element={<TypeOfMovies />}/>
          <Route path="/detail/:id" element={<Detail />}/>
          <Route path="/movieWatching/:id" element={<WatchMovie />}/>
          <Route path="/dashboard/:queryDashboard" element={<Dashboard />}/>
        </Route>
        <Route path="/signIn" element={<Account />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
