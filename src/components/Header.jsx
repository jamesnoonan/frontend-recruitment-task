// The header of the page with the hero section and navbar

import search from '../assets/icons/search.svg';
import Navbar from './Navbar';

function Header(props) {
  return (
    <div className="flex flex-col w-full">
      <Navbar />
      <div
        id="header-main"
        className="pt-32 pb-16 flex-grow flex flex-col justify-center shadow-inner bg-blue-600"
      >
        <h1 className="font-medium text-5xl text-white">
          Let us Guide You Home
        </h1>
        <p className="font-light text-xl pt-3 text-white">
          Find the house of your dreams.
        </p>
        <div className="flex w-2/4 pt-10">
          <select
            name="search-type"
            className="text-gray-700 p-4 rounded-tl-xl rounded-bl-xl"
          >
            <option value="all">All</option>
            <option value="sale">For Sale</option>
            <option value="rent">For Rent</option>
            <option value="reserved">Reserved</option>
          </select>
          <div className="flex items-center justify-center pl-11 bg-white">
            <img src={search} alt="Search Icon" />
          </div>
          <input
            type="text"
            placeholder="Search for properties or keywords..."
            className="flex-grow p-4 rounded-tr-xl rounded-br-xl placeholder-gray-600"
          />
        </div>
      </div>
    </div>
  );
}

export default Header;
