import './App.scss';
import Header from './components/Header';
import Filters from './components/Filters';
import Results from './components/Results';
import Banners from './components/Banners';
import FeaturedResult from './components/FeaturedResult';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Header />
      <Filters />
      <Results />
      <Banners />
      <FeaturedResult />
      <Footer />
    </>
  );
}

export default App;
