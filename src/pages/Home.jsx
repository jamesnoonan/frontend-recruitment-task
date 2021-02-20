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
      });
    } catch (err) {
      // Error in collecting data
      this.setState({ dataLoaded: true });
    }
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
          searchTerm={this.state.searchTerm}
          setSearchTerm={this.setSearchTerm}
        />
        <Filters />
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
