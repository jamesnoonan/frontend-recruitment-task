// The filters section of the page which changes which results are displayed

import SelectBox from './SelectBox';
import Slider from './Slider';

function Filters(props) {
  return (
    <div className="pt-16 px-48">
      <h3 className="text-gray-700 text-xl font-bold">Filters</h3>
      <div className="flex justify-between py-5 -mx-3">
        <SelectBox
          name="Baths"
          max={props.filterOptions.baths.max}
          min={props.filterOptions.baths.min}
          isNumerical={true}
        />
        <SelectBox
          name="Beds"
          max={props.filterOptions.beds.max}
          min={props.filterOptions.beds.min}
          isNumerical={true}
        />
        <SelectBox name="Type of estate" options={props.filterOptions.type} />
        <SelectBox name="Order by" options={props.filterOptions.orderBy} />
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col w-1/2 pr-4">
          <h4 className="font-bold text-gray-700">Price range</h4>
          <Slider
            className="w-full py-4"
            min={props.filterOptions.price.min}
            max={props.filterOptions.price.max}
            isPrice={true}
            step={Math.pow(
              10,
              Math.floor(Math.log10(props.filterOptions.price.min))
            )}
          />
        </div>
        <div className="flex flex-col w-1/2 pl-4">
          <h4 className="font-bold text-gray-700">Square Footage</h4>
          <Slider
            className="w-full py-4"
            min={props.filterOptions.size.min}
            max={props.filterOptions.size.max}
            isPrice={false}
            step={Math.pow(
              10,
              Math.floor(Math.log10(props.filterOptions.size.min))
            )}
          />
        </div>
      </div>
    </div>
  );
}

export default Filters;
