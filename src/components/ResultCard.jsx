// The card to display a single result

import bathIcon from '../assets/icons/bath-icon.svg';
import bedIcon from '../assets/icons/bed-icon.svg';
import sizeIcon from '../assets/icons/size-icon.svg';

function ResultCard(props) {
  const testUrl =
    'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib%3Drb-1.2.1%26ixid%3DeyJhcHBfaWQiOjEyMDd9%26auto%3Dformat%26fit%3Dcrop%26w%3D1934%26q%3D80&sa=D&source=editors&ust=1613534287175000&usg=AFQjCNHRxsaB4l-BH1iuqQfl739WsNzGpA';

  return (
    <div className="flex flex-col w-1/3 p-4">
      <div
        style={{ backgroundImage: `url(${testUrl})` }}
        className="h-64 bg-cover bg-no-repeat bg-center"
      ></div>
      <div className="px-4 pt-3">
        <h4 className="text-lg text-gray-700">Villa With Pool For Sale</h4>
        <h3 className="text-lg font-bold text-blue-600">
          <span className="font-normal">$</span>500,000
        </h3>
        <p className="text-sm text-gray-600">
          9046 Edgefield Ave. Palmetto, FL 34221
        </p>
        <div className="pt-2 flex justify-around text-sm text-gray-500">
          <img src={bedIcon} alt="Beds" />
          <p className="mr-2">4 Beds</p>
          <img src={bathIcon} alt="Baths" />
          <p className="mr-2">2 Baths</p>
          <img src={sizeIcon} alt="Size" />
          <p className="mr-2">980 SqFt</p>
        </div>
      </div>
    </div>
  );
}

export default ResultCard;
