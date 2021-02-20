// The header of the page with the hero section and navbar

import Navbar from './Navbar';
import Search from './Search';

function Header(props) {
  return (
    <div className="flex flex-col w-full">
      <Navbar />
      <div
        id="header-main"
        className="pt-32 pb-16 flex-grow flex flex-col justify-center shadow-inner bg-blue-600"
      >
        <h1 className="font-medium text-4xl text-white">
          Let us Guide You Home
        </h1>
        <p className="text-lg pt-3 text-white">
          Find the house of your dreams.
        </p>
        <Search
          filterOptions={props.filterOptions}
          searchTerm={props.searchTerm}
          setSearchTerm={props.setSearchTerm}
        />
      </div>
    </div>
  );
}

export default Header;
