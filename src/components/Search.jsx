// The search bar where a user can type in terms to filter results

import searchIcon from '../assets/icons/search.svg';

function Search(props) {
  const titleCase = (input) => {
    let words = input.split(' ');
    words = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1));
    return words.join(' ');
  };

  return (
    <div className="flex w-2/4 pt-10">
      <select
        name="search-type"
        className="text-gray-700 text-xs p-4 rounded-tl-xl rounded-bl-xl"
      >
        <option value="all">All</option>
        {props.filterOptions &&
          props.filterOptions.status.map((option) => (
            <option value={option} key={option}>
              {titleCase(option.replace('-', ' '))}
            </option>
          ))}
      </select>
      <div className="flex items-center justify-center pl-11 bg-white">
        <img src={searchIcon} alt="Search Icon" />
      </div>
      <input
        type="text"
        value={props.searchTerm}
        onChange={(e) => props.setSearchTerm(e.target.value)}
        placeholder="Search for properties or keywords..."
        className="flex-grow p-4 rounded-tr-xl rounded-br-xl text-xs placeholder-gray-600"
      />
    </div>
  );
}

export default Search;
