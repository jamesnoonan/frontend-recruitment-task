// The navbar which links to different sections of the website

import logo from '../assets/logo.png';
import heart from '../assets/icons/heart.svg';
import compare from '../assets/icons/compare.svg';

function Navbar(props) {
  return (
    <nav className="w-full h-28 px-20 bg-blue-600">
      <div className="h-full flex justify-between">
        <ul className="h-full w-3/4 flex justify-around items-center text-white text-xs font-light">
          <li>
            <img src={logo} alt="Reality Properties Logo" />
          </li>
          <li>Homepage</li>
          <li>About Us</li>
          <li>For Rent</li>
          <li>For Sale</li>
          <li>Our Agents</li>
          <li>Contact Us</li>
        </ul>
        <ul className="flex items-center">
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
