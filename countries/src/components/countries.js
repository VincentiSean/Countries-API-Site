import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Countries extends Component {
    constructor() {
        super();

        this.state = {
            countries: [],
            showMenu: false,
        }
    
        this.showMenu = this.showMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
    }
    

    showMenu(event) {
        event.preventDefault();

        this.setState({ showMenu: true }, () => {
            document.addEventListener('click', this.closeMenu);
        });
    }

    closeMenu(event) {
        if (this.africa.contains(event.target)) {
            this.selectFilter("africa");
        } else if (this.america.contains(event.target)) {
            this.selectFilter("americas");
        } else if (this.asia.contains(event.target)) {
            this.selectFilter("asia");
        } else if (this.europe.contains(event.target)) {
            this.selectFilter("europe");
        } else if (this.oceania.contains(event.target)) {
            this.selectFilter("oceania");
        }

        this.setState({ showMenu: false }, () => {
            document.removeEventListener('click', this.closeMenu);
        });
    }
    
    componentDidMount() {
        fetch('https://restcountries.eu/rest/v2/all') // Make GET request to API
        .then(res => res.json())  // Parse json
        .then((data) => {         // Set the value of state to the data
          this.setState({ countries: data })
        })
        .catch(console.log)       // Catch any errors
    }

    shouldComponentUpdate() {
        return true;
    }

    selectFilter(region) {
        let url = "https://restcountries.eu/rest/v2/region/"+region
        this.getCountries(url)
    }

    handleChange(input) {
        if (input.target.value !== '') {
            let url = "https://restcountries.eu/rest/v2/name/"+input.target.value
            this.getCountries(url)
        } else {
            let url = "https://restcountries.eu/rest/v2/all"
            this.getCountries(url)
        }
    }

    getCountries(url) {
        fetch(url)
        .then(res => res.json())
        .then((data) => {
            this.setState({ countries: data})
        })
    }

    render() {
        if (Array.isArray(this.state.countries)) {
            return(
                <div id="countries-container">
                    <section id="search-section">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-search" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z"/>
                        <circle cx="10" cy="10" r="7" />
                        <line x1="21" y1="21" x2="15" y2="15" />
                    </svg>
                        <input
                            id="search-box" 
                            type="text" 
                            name="countrySearch" 
                            placeholder="Search for a country..."
                            onChange={(e) => this.handleChange(e)} />
                        <div id="filter-container">
                            <button className="filterButton" onClick={this.showMenu}>
                                Filter by region
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-down" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z"/>
                                    <polyline points="6 9 12 15 18 9" />
                                </svg>
                            </button>
                            {
                                this.state.showMenu ? (
                                <div 
                                    className="menu"
                                    ref={(element) => {
                                        this.dropdownMenu = element;
                                    }}>
                                    <button ref={(element) => {
                                        this.africa = element;
                                    }}>
                                        Africa
                                    </button>
                                    <button ref={(element) => {
                                        this.america = element;
                                    }}>
                                        Americas
                                    </button>
                                    <button ref={(element) => {
                                        this.asia = element;
                                    }}>
                                        Asia
                                    </button>
                                    <button ref={(element) => {
                                        this.europe = element;
                                    }}>
                                        Europe
                                    </button>
                                    <button ref={(element) => {
                                        this.oceania = element;
                                    }}>
                                        Oceania
                                    </button>
                                </div>
                                )
                                : (
                                    null
                                )
                            }
                        </div>
                    </section>
                    <div id="grid-container">
                        {this.state.countries.map((country) => (
                            <Link 
                                key={country.name} 
                                to={{
                                    pathname: `${country.name}`,
                                    state: { countryToSearch: country.name }
                            }}>
                                <div className="card">
                                    <div className="card-body">
                                        <img className="country-flag" src={country.flag} alt={country.name}/>
                                        <h4 className="card-title">
                                            {country.name.replace(/ *\([^)]*\) */g, "")}
                                        </h4>
                                        <p className="card-info">
                                            <span className="card-info-bold">
                                                Population: 
                                            </span>
                                            {country.population}
                                        </p>
                                        <p className="card-info">
                                            <span className="card-info-bold">
                                                Region: 
                                            </span>
                                            {country.region}
                                        </p>
                                        <p className="card-info">
                                            <span className="card-info-bold">
                                                Capital: 
                                            </span>
                                            {country.capital}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                    
                </div>              
            )
        } else {
            return(
                <div>
                    <section id="search-section">
                        <input 
                            type="text" 
                            name="countrySearch" 
                            placeholder="Search for a country..."
                            onChange={(e) => this.handleChange(e)} />
                        <div id="filter-container">
                            <button className="filterButton" onClick={this.showMenu}>Filter by region</button>
                            {
                                this.state.showMenu ? (
                                <div 
                                    className="menu"
                                    ref={(element) => {
                                        this.dropdownMenu = element;
                                    }}>
                                    <button ref={(element) => {
                                        this.africa = element;
                                    }}>
                                        Africa
                                    </button>
                                    <button ref={(element) => {
                                        this.america = element;
                                    }}>
                                        Americas
                                    </button>
                                    <button ref={(element) => {
                                        this.asia = element;
                                    }}>
                                        Asia
                                    </button>
                                    <button ref={(element) => {
                                        this.europe = element;
                                    }}>
                                        Europe
                                    </button>
                                    <button ref={(element) => {
                                        this.oceania = element;
                                    }}>
                                        Oceania
                                    </button>
                                </div>
                                )
                                : (
                                    null
                                )
                            }
                        </div>
                    </section>
                    <h3>No countries match the search.</h3>
                </div>              
            )
        }
        
    }
}
    
export default Countries