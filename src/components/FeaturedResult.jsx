// A result which is specially featured to bring attention to it

import React from 'react';
import addCommaPrice from '../util/addCommaPrice';

import bathIcon from '../assets/icons/bath-icon.svg';
import bedIcon from '../assets/icons/bed-icon.svg';
import sizeIcon from '../assets/icons/size-icon.svg';

class FeaturedResult extends React.PureComponent {
  render() {
    return (
      <div
        className="w-full h-screen flex items-center bg-cover bg-no-repeat bg-center"
        style={{ backgroundImage: `url(${this.props.result.image})` }}
      >
        <div className="ml-32 bg-white p-11 pr-32 rounded-md">
          <div className="w-max">
            <div className="bg-orange-600 px-2.5 py-1.5 mb-6 w-max rounded-md">
              <p className="text-white text-xs tracking-wide">
                {this.props.result.status.replace('-', ' ').toUpperCase()}
              </p>
            </div>
            <h4 className="text-3xl font-medium tracking-tight text-gray-800">
              {this.props.result.title}
            </h4>
            <h3 className="text-2xl font-bold text-blue-600 leading-10">
              <span className="font-normal">$</span>
              {addCommaPrice(this.props.result.price)}
            </h3>
            <p className="text-lg text-gray-600 leading-8">
              {this.props.result.address}
            </p>
            <div className="flex py-4 justify-between text-xs text-gray-500">
              <img src={bedIcon} alt="Beds" />
              <p className="mr-2">{this.props.result.beds} Beds</p>
              <img src={bathIcon} alt="Baths" />
              <p className="mr-2">{this.props.result.baths} Baths</p>
              <img src={sizeIcon} alt="Size" />
              <p>{this.props.result.size} SqFt</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FeaturedResult;
