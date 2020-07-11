import React, { Component } from 'react';
import './App.css';
import Countries from './components/countries';

class App extends Component {

  state = {
    countries: []
  }

  componentDidMount() {
    fetch('https://restcountries.eu/rest/v2/all') // Make GET request to API
    .then(res => res.json())  // Parse json
    .then((data) => {         // Set the value of state to the data
      this.setState({ countries: data })
    })
    .catch(console.log)       // Catch any errors
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h3>Where in the world?</h3>
          <button><i class="far fa-moon"></i>Dark Mode</button>
        </header>
        <section id="search-section">
          <form id="search-form">
            <input type="text" name="countrySearch" placeholder="Search for a country..." />
            <select name="regionFilter">
              <option value="" disabled selected hidden>Filter by Region</option>
              <option value="Africa">Africa</option>
              <option value="America">America</option>
              <option value="Asia">Asia</option>
              <option value="Europe">Europe</option>
              <option value="Oceania">Oceania</option>
            </select>
          </form>
        </section>
        <section id="main-content">
              <Countries countries={this.state.countries} />
        </section>
      </div>
    );
  }
}

export default App;
