// The banner section of the page which displays information and an advertisement

function Banners(props) {
  return (
    <div className="flex justify-center px-20 pb-10 rounded-lg">
      <div className="w-1/3 m-5 px-9 py-12 bg-gray-100">
        <h1 className="text-4xl text-blue-600">Aktas Properties</h1>
        <h1 className="text-4xl font-medium text-blue-600">Information</h1>
        <div className="mt-4 text-gray-600 leading-10">
          <p>1234 Hacker St, San Francisco</p>
          <p>(123) 456-7890</p>
          <p>Mon — Sun: 8:00am - 6:00pm</p>
        </div>
      </div>
      <div className="w-1/3 m-5 px-9 py-12 bg-blue-600 rounded-lg">
        <h1 className="text-4xl font-medium text-white">
          Want to Sell
          <br />
          Property?
        </h1>
        <div className="text-white font-light pt-4">
          <p>
            Let us create a tailored strategic marketing plan and keep track of
            the selling process.
          </p>
          <button className="rounded-full px-9 py-3 mt-5 text-xs bg-green-500">
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
}

export default Banners;
