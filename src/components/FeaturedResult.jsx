// A result which is specially featured to bring attention to it

import bathIcon from '../assets/icons/bath-icon.svg';
import bedIcon from '../assets/icons/bed-icon.svg';
import sizeIcon from '../assets/icons/size-icon.svg';

function FeaturedResult(props) {
  const testUrl =
    'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib%3Drb-1.2.1%26ixid%3DeyJhcHBfaWQiOjEyMDd9%26auto%3Dformat%26fit%3Dcrop%26w%3D1934%26q%3D80&sa=D&source=editors&ust=1613534287175000&usg=AFQjCNHRxsaB4l-BH1iuqQfl739WsNzGpA';
  return (
    <div
      className="w-full h-screen flex items-center bg-cover bg-no-repeat bg-center"
      style={{ backgroundImage: `url(${testUrl})` }}
    >
      <div className="ml-32 bg-white p-11 pr-32 rounded-md">
        <div className="w-max">
          <div className="bg-orange-600 px-2.5 py-1.5 mb-6 w-max rounded-md">
            <p className="text-white text-xs tracking-wide">FOR SALE</p>
          </div>
          <h4 className="text-3xl font-medium tracking-tight text-gray-800">
            Villa With Pool For Sale
          </h4>
          <h3 className="text-2xl font-bold text-blue-600 leading-10">
            <span className="font-normal">$</span>500,000
          </h3>
          <p className="text-lg text-gray-600 leading-8">
            9046 Edgefield Ave. Palmetto, FL 34221
          </p>
          <div className="flex py-4 justify-between text-xs text-gray-500">
            <img src={bedIcon} alt="Beds" />
            <p className="mr-2">4 Beds</p>
            <img src={bathIcon} alt="Baths" />
            <p className="mr-2">2 Baths</p>
            <img src={sizeIcon} alt="Size" />
            <p>980 SqFt</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeaturedResult;
