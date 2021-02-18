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
    this.state = {
      dataLoaded: false,
      properties: [],
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
      this.setState({ dataLoaded: true, properties: data });
    } catch (err) {
      // Error in collecting data
      this.setState({ dataLoaded: true });
    }
  }

  render() {
    return (
      <>
        <Header />
        <Filters />
        {this.state.properties.length > 0 && (
          <Results results={this.state.properties} />
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
