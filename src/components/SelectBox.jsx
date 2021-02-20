// A select box for the filters section
import React from 'react';

class SelectBox extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.setFilterValues(this.props.keyValue, e.target.value);
  }

  render() {
    let options = [];
    if (this.props.isNumerical) {
      // Generate list of integers between max and min
      options = Array.from(
        new Array(this.props.max),
        (x, i) => i + this.props.min
      );
    } else {
      this.props.options.forEach((option) => {
        options.push(option.charAt(0).toUpperCase() + option.slice(1));
      });
    }

    return (
      <select
        name={this.props.name.toLowerCase().replace(' ', '')}
        value={
          this.props.filterValues[this.props.keyValue]
            ? this.props.filterValues[this.props.keyValue]
            : 'none'
        }
        onChange={this.handleChange}
        className="border-2 border-gray-300 text-gray-600 text-xs font-medium p-4 rounded-lg mx-3 my-3 md:my-0 flex-grow"
      >
        <option value="none">{this.props.name}</option>
        {/* Generates options depending on what is in data */}
        {options.map((item, index) => (
          <option key={item.toString()} value={item.toString().toLowerCase()}>
            {item}
          </option>
        ))}
      </select>
    );
  }
}

export default SelectBox;
