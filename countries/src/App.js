import React from 'react';
import './App.css';

function App() {
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
            
      </section>
    </div>
  );
}

export default App;
