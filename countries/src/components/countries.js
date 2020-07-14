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

    render() {
        return(
            <div>
                {this.state.countries.map((country) => (
                    <Link key={country.name} to={"/details?" + country.name}>
                        <div class="card">
                            <div class="card-body">
                                <img class="country-flag" src={country.flag} alt={country.name}/>
                                <h4 class="card-title">{country.name}</h4>
                                <p class="card-info"><span class="card-info-bold">Population: </span>{country.population}</p>
                                <p class="card-info"><span class="card-info-bold">Region: </span>{country.region}</p>
                                <p class="card-info"><span class="card-info-bold">Capital: </span>{country.capital}</p>
                                <p class="card-info"><span class="card-info-bold">NumericCode: </span>{country.numericCode}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>              
        )
    }
}
// = ({ countries }) => {
    
export default Countries