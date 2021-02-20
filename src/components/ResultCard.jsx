// The card to display a single result

import React from 'react';
import addCommaPrice from '../util/addCommaPrice';

import bathIcon from '../assets/icons/bath-icon.svg';
import bedIcon from '../assets/icons/bed-icon.svg';
import sizeIcon from '../assets/icons/size-icon.svg';

class ResultCard extends React.PureComponent {
  convertImgUrl(url) {
    // Lower the requested image quality to reduce file size
    const requestedWidth = 500;
    // Assumes that images are stored on unsplash, may have to be changed for real back-end
    const strippedUrl = url.slice(0, url.indexOf('?'));
    const newUrl = strippedUrl + '?w=' + requestedWidth.toString();
    return newUrl;
  }

  render() {
    return (
      <div className="flex flex-col w-1/3 p-4 mb-6">
        <div
          style={{
            backgroundImage: `url(${this.convertImgUrl(
              this.props.result.image
            )})`,
          }}
          className="h-72 bg-cover bg-no-repeat bg-center"
        ></div>
        <div className="px-4 pt-3">
          <h4 className="text-lg text-gray-700">{this.props.result.title}</h4>
          <h3 className="text-lg font-bold text-blue-600">
            <span className="font-normal">$</span>
            {addCommaPrice(this.props.result.price)}
          </h3>
          <p className="text-xs leading-6 text-gray-600">
            {this.props.result.address}
          </p>
          <div className="flex pt-2 justify-around text-xs text-gray-500">
            <img src={bedIcon} alt="Beds" />
            <p className="mr-2">{this.props.result.beds} Beds</p>
            <img src={bathIcon} alt="Baths" />
            <p className="mr-2">{this.props.result.baths} Baths</p>
            <img src={sizeIcon} alt="Size" />
            <p className="mr-2">{this.props.result.size} SqFt</p>
          </div>
        </div>
      </div>
    );
  }
}

export default ResultCard;
