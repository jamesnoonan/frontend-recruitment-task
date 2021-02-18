// The filters section of the page which changes which results are displayed

function Filters(props) {
  // TODO: Get max numbers of beds and baths to create lists
  const maxBed = 6;
  const maxBath = 4;

  return (
    <div className="pt-16 px-48">
      <h3 className="text-gray-700 text-xl font-bold">Filters</h3>
      <div className="flex justify-between py-5 -mx-3">
        {/* TODO: Reduce repeditiveness of select boxes */}
        <select
          name="baths"
          defaultValue=""
          className="border-2 border-gray-300 text-gray-600 text-xs font-medium p-4 rounded-lg mx-3 flex-grow"
        >
          <option value="" disabled>
            Baths
          </option>
          {/* Generates options depending on number of baths */}
          {Array.from(Array(maxBath).keys()).map((item, index) => (
            <option key={(index + 1).toString()} value={(index + 1).toString()}>
              {index + 1}
            </option>
          ))}
        </select>
        <select
          name="beds"
          defaultValue=""
          className="border-2 border-gray-300 text-gray-600 text-xs font-medium p-4 rounded-lg mx-3 flex-grow"
        >
          <option value="" disabled>
            Beds
          </option>
          {/* Generates options depending on number of baths */}
          {Array.from(Array(maxBed).keys()).map((item, index) => (
            <option key={(index + 1).toString()} value={(index + 1).toString()}>
              {index + 1}
            </option>
          ))}
        </select>
        <select
          name="type"
          defaultValue=""
          className="border-2 border-gray-300 text-gray-600 text-xs font-medium p-4 rounded-lg mx-3 flex-grow"
        >
          <option value="" disabled>
            Type of estate
          </option>
          {/* Generates options depending on number of baths */}
          {Array.from(Array(maxBath).keys()).map((item, index) => (
            <option key={(index + 1).toString()} value={(index + 1).toString()}>
              {index + 1}
            </option>
          ))}
        </select>
        <select
          name="order"
          defaultValue=""
          className="border-2 border-gray-300 text-gray-600 text-xs font-medium p-4 rounded-lg mx-3 flex-grow"
        >
          <option value="" disabled>
            Order by
          </option>
          {/* Generates options depending on number of baths */}
          {Array.from(Array(maxBath).keys()).map((item, index) => (
            <option key={(index + 1).toString()} value={(index + 1).toString()}>
              {index + 1}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col w-2/5">
          <h4 className="font-bold text-gray-700">Price range</h4>
          <input type="range" name="price" className="w-full py-4" />
        </div>
        <div className="flex flex-col w-2/5">
          <h4 className="font-bold text-gray-700">Square Footage</h4>
          <input type="range" name="squarefootage" className="w-full py-4" />
        </div>
      </div>
    </div>
  );
}

export default Filters;
