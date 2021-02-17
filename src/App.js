import './App.css';
import Header from './components/Header';
import Filters from './components/Filters';
import Results from './components/Results';
import Banners from './components/Banners';
import FeaturedResult from './components/FeaturedResult';

function App() {
  return (
    <>
      <Header />
      <Filters />
      <Results />
      <Banners />
      <FeaturedResult />
    </>
  );
}

export default App;
