// The results section of the page which displays a list of results

import React from 'react';

import ResultCard from './ResultCard';

class Results extends React.PureComponent {
  render() {
    return (
      <div className="pt-12 px-48 flex flex-col">
        <div className="flex justify-around flex-wrap -mx-4">
          {this.props.results.map((item) => (
            <ResultCard key={item.id} result={item} />
          ))}
        </div>
        <div className="text-center py-7">
          {this.props.moreResults && (
            <button
              onClick={this.props.showMoreResults}
              className="bg-blue-600 text-white font-light text-xs rounded-full py-4 px-10"
            >
              Show More
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default Results;
