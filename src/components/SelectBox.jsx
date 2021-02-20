// A select box for the filters section

function SelectBox(props) {
  let options = [];
  if (props.isNumerical) {
    // Generate list of integers between max and min
    options = Array.from(new Array(props.max), (x, i) => i + props.min);
  } else {
    props.options.forEach((option) => {
      options.push(option.charAt(0).toUpperCase() + option.slice(1));
    });
  }

  return (
    <select
      name={props.name.toLowerCase().replace(' ', '')}
      defaultValue="none"
      className="border-2 border-gray-300 text-gray-600 text-xs font-medium p-4 rounded-lg mx-3 flex-grow"
    >
      <option value="none">{props.name}</option>
      {/* Generates options depending on number of baths */}
      {options.map((item, index) => (
        <option key={item.toString()} value={item.toString().toLowerCase()}>
          {item}
        </option>
      ))}
    </select>
  );
}

export default SelectBox;
