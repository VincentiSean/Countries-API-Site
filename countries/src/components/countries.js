import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Countries extends Component {
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

    shouldComponentUpdate() {
        return true;
    }

    selectFilter(region) {
        console.log(region.target.value)
        let url = "https://restcountries.eu/rest/v2/region/"+region.target.value
        this.getCountries(url)
        console.log(url)
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
                <div>
                    <section id="search-section">
                        <input 
                            type="text" 
                            name="countrySearch" 
                            placeholder="Search for a country..."
                            onChange={(e) => this.handleChange(e)} />
                        <select name="regionFilter" onChange={(e) => this.selectFilter(e)}>
                            <option value="" disabled selected hidden>Filter by Region</option>
                            <option value="Africa">Africa</option>
                            <option value="Americas">Americas</option>
                            <option value="Asia">Asia</option>
                            <option value="Europe">Europe</option>
                            <option value="Oceania">Oceania</option>
                        </select>
                    </section>
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
                                    <h4 className="card-title">{country.name}</h4>
                                    <p className="card-info"><span className="card-info-bold">Population: </span>{country.population}</p>
                                    <p className="card-info"><span className="card-info-bold">Region: </span>{country.region}</p>
                                    <p className="card-info"><span className="card-info-bold">Capital: </span>{country.capital}</p>
                                    <p className="card-info"><span className="card-info-bold">NumericCode: </span>{country.numericCode}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>              
            )
        } else {
            return(
                <div>
                    <section id="search-section">
                        <form id="search-form">
                        <input 
                            type="text" 
                            name="countrySearch" 
                            placeholder="Search for a country..."
                            onChange={(e) => this.handleChange(e)} />
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
                    <h3>No countries match the search.</h3>
                </div>              
            )
        }
        
    }
}
    
export default Countries