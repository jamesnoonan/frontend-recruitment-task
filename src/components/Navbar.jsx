// The navbar which links to different sections of the website

import logo from '../assets/logo.png';
import heart from '../assets/icons/heart.svg';
import compare from '../assets/icons/compare.svg';

function Navbar(props) {
  return (
    <nav className="w-full h-28 px-5 lg:px-20 bg-blue-600">
      <div className="h-full flex justify-between items-center">
        <div className="pr-2">
          <img src={logo} alt="Reality Properties Logo" />
        </div>
        <ul className="h-full w-4/5 lg:w-1/2 mr-auto hidden md:flex justify-around items-center text-white text-xs font-light">
          <li>Homepage</li>
          <li>About Us</li>
          <li>For Rent</li>
          <li>For Sale</li>
          <li>Our Agents</li>
          <li>Contact Us</li>
        </ul>
        <ul className="hidden md:flex items-center">
          <li>
            <img className="p-3" src={compare} alt="Compare" />
          </li>
          <li>
            <img className="p-3" src={heart} alt="Loved" />
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
