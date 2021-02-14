function Filters(props) {
    // TODO: Get max numbers of beds and baths to create lists
    let maxBed = 6;
    let maxBath = 4;

    new Array(maxBath).forEach((item, index) => console.log(index));

    return (
        <div className="py-16 px-48">
            <h3 className="text-gray-700 text-2xl font-bold">Filters</h3>
            <div className="flex justify-between py-5">
                {/* TODO: Reduce repeditiveness of select boxes */}
                <select name="baths" defaultValue="" className="border-2 border-gray-300 text-gray-600 p-4 rounded-xl w-1/5">
                    <option value="" disabled>Baths</option>
                    {/* Generates options depending on number of baths */}
                    { Array.from(Array(maxBath).keys()).map((item, index) => <option key={(index + 1).toString()} value={(index + 1).toString()}>{index + 1}</option>) }
                </select>
                <select name="beds" defaultValue="" className="border-2 border-gray-300 text-gray-600 p-4 rounded-xl w-1/5">
                    <option value="" disabled>Beds</option>
                    {/* Generates options depending on number of baths */}
                    { Array.from(Array(maxBed).keys()).map((item, index) => <option key={(index + 1).toString()} value={(index + 1).toString()}>{index + 1}</option>) }
                </select>
                <select name="type" defaultValue="" className="border-2 border-gray-300 text-gray-600 p-4 rounded-xl w-1/5">
                    <option value="" disabled>Type of estate</option>
                    {/* Generates options depending on number of baths */}
                    { Array.from(Array(maxBath).keys()).map((item, index) => <option key={(index + 1).toString()} value={(index + 1).toString()}>{index + 1}</option>) }
                </select>
                <select name="order" defaultValue="" className="border-2 border-gray-300 text-gray-600 p-4 rounded-xl w-1/5">
                    <option value="" disabled>Order by</option>
                    {/* Generates options depending on number of baths */}
                    { Array.from(Array(maxBath).keys()).map((item, index) => <option key={(index + 1).toString()} value={(index + 1).toString()}>{index + 1}</option>) }
                </select>
            </div>
            <div className="flex justify-between">
                <div className="flex flex-col w-2/5">
                    <h4 className="font-medium text-gray-800">Price range</h4>
                    <input type="range" name="price" className="w-full" />
                </div>
                <div className="flex flex-col w-2/5">
                    <h4 className="font-medium text-gray-800">Square Footage</h4>
                    <input type="range" name="squarefootage" className="w-full" />
                </div>
            </div>
        </div>
    );
}

export default Filters;