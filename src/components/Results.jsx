// The results section of the page which displays a list of results

import React from 'react';

import ResultCard from './ResultCard';

class Results extends React.PureComponent {
  constructor(props) {
    super(props);
    this.showMoreResults = this.showMoreResults.bind(this);

    // Check if all results have been displayed, to show or hide the "Show More" button
    const allDisplayed = props.results.length <= 6;
    this.state = { resultsDisplayed: 6, moreResults: !allDisplayed };
  }

  showMoreResults(e) {
    // Show 6 more results, ending once all results are shown
    const newResultsDisplayed = Math.min(
      this.state.resultsDisplayed + 6,
      this.props.results.length
    );
    const allDisplayed = this.props.results.length <= newResultsDisplayed;
    this.setState({
      resultsDisplayed: newResultsDisplayed,
      moreResults: !allDisplayed,
    });
  }

  render() {
    return (
      <div className="pt-12 px-48 flex flex-col">
        <div className="flex justify-between flex-wrap -mx-4">
          {this.props.results
            .slice(0, this.state.resultsDisplayed)
            .map((item) => (
              <ResultCard key={item.id} result={item} />
            ))}
        </div>
        <div className="text-center py-7">
          {this.state.moreResults && (
            <button
              onClick={this.showMoreResults}
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
