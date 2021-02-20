// The main page where users can search for results

import React from 'react';
import { readString } from 'react-papaparse';

import Property from '../models/Property';

import Header from '../components/Header';
import Filters from '../components/Filters';
import Results from '../components/Results';
import Banners from '../components/Banners';
import FeaturedResult from '../components/FeaturedResult';
import Footer from '../components/Footer';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.setSearchTerm = this.setSearchTerm.bind(this);
    this.showMoreResults = this.showMoreResults.bind(this);

    this.state = {
      dataLoaded: false,
      searchTerm: '',
      properties: [],
      filteredProperties: [],
    };
  }

  async componentDidMount() {
    try {
      //   Fetch CSV data from Google Sheet
      const response = await fetch(
        'https://docs.google.com/spreadsheets/d/e/2PACX-1vRAeVzfe5Xd7y_Ojzl5BxYSTDezszUfCj5PyV_lEYDPsRCX3Ze6F_YTNteG14X_Lf7FqEtHrI7m29nt/pub?output=csv'
      );
      // Convert CSV String to JSON Object
      const csvData = await response.text();
      const objectData = readString(csvData).data;
      // Remove title row
      const items = objectData.slice(1);
      // Convert arrays to Property objects
      const data = items.map((item) => new Property(...item));
      this.setState({
        dataLoaded: true,
        properties: data,
        filteredProperties: data,
        resultsDisplayed: 6,
        moreResults: data.length > 6,
        filterOptions: this.generateFilterOptions(data),
      });
    } catch (err) {
      // Error in collecting data
      this.setState({ dataLoaded: true });
    }
  }

  generateFilterOptions(data) {
    // Get properties of the results
    const keys = Object.keys(data[0]);
    // Remove id and image
    keys.splice(keys.indexOf('id'), 1);
    keys.splice(keys.indexOf('image'), 1);

    const filterOptions = { orderBy: keys };
    keys.forEach((key) => {
      const options = [];
      data.forEach((item) => {
        options.push(item[key]);
      });
      filterOptions[key] = this.getFilterOptions(
        options,
        typeof options[0] === 'number',
        1
      );
    });
    return filterOptions;
  }

  getFilterOptions(allOptions, isNumerical) {
    if (isNumerical) {
      let min = Math.min.apply(0, allOptions);
      let max = Math.max.apply(0, allOptions);

      // Round to nearest power of 10
      const roundTo = Math.pow(10, Math.floor(Math.log10(min)));

      min = Math.floor(min / roundTo) * roundTo;
      max = Math.ceil(max / roundTo) * roundTo;
      return { min, max };
    }
    // For large datasets this could become inefficient since it takes O(x^2) time
    // To improve this, the options could be updated on the server when new listings are added
    const uniqueOptions = allOptions.filter((option, index, self) => {
      return self.indexOf(option) == index;
    });
    return uniqueOptions;
  }

  showMoreResults(e) {
    // Show 6 more results
    this.setState((state, props) => ({
      // Doesn't need to be capped since slice method deals with indexes larger than array length
      resultsDisplayed: state.resultsDisplayed + 6,
      moreResults: state.filteredProperties.length > state.resultsDisplayed + 6,
    }));
  }

  filterResults() {
    // Get all properties
    const initial = [...this.state.properties];
    // Filter the properties that match the requirements
    const filtered = initial.filter(
      (property) =>
        property.title
          .toLowerCase()
          .includes(this.state.searchTerm.toLowerCase()) ||
        property.address
          .toLowerCase()
          .includes(this.state.searchTerm.toLowerCase())
    );
    this.setState((state, props) => ({
      filteredProperties: filtered,
      // If the filtered results have more than 6, show the "Show More" button
      moreResults: filtered.length > 6,
    }));
  }

  setSearchTerm(term) {
    this.setState(
      // Update the search term and limit the results to 6 again
      { searchTerm: term, resultsDisplayed: 6 },
      this.filterResults
    );
  }

  render() {
    return (
      <>
        <Header
          filterOptions={this.state.filterOptions}
          searchTerm={this.state.searchTerm}
          setSearchTerm={this.setSearchTerm}
        />
        {this.state.filterOptions && (
          <Filters filterOptions={this.state.filterOptions} />
        )}
        {this.state.properties.length > 0 ? (
          <Results
            moreResults={this.state.moreResults}
            showMoreResults={this.showMoreResults}
            results={this.state.filteredProperties.slice(
              0,
              this.state.resultsDisplayed
            )}
          />
        ) : (
          <h3 className="text-3xl text-gray-600 text-center pt-20 pb-10 ">
            Loading results...
          </h3>
        )}
        <Banners />
        {this.state.properties.length > 0 && (
          <FeaturedResult result={this.state.properties[0]} />
        )}
        <Footer />
      </>
    );
  }
}

export default Home;
