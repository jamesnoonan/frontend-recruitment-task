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
        value={props.filterValues.status ? props.filterValues.status : 'none'}
        onChange={(e) => props.setFilterValues('status', e.target.value)}
        className="text-gray-700 text-xs p-4 rounded-tl-xl rounded-bl-xl"
      >
        {/* None gives no restrictions on results */}
        <option value="none">All</option>
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
      {/* In the future with a real back-end, this input field should be throttled to reduce unecessary requests*/}
      <input
        type="text"
        value={
          props.filterValues.searchTerm ? props.filterValues.searchTerm : ''
        }
        onChange={(e) => props.setFilterValues('searchTerm', e.target.value)}
        placeholder="Search for properties or keywords..."
        className="flex-grow p-4 rounded-tr-xl rounded-br-xl text-xs placeholder-gray-600"
      />
    </div>
  );
}

export default Search;
