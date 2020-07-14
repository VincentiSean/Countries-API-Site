import React, { Component } from 'react';
import BackButton from './back';


class Details extends Component {
    state = {
        country: []
    }

    componentDidMount() {
        let name = this.props.location.search.replace("?", "")
        console.log(name)
        fetch('https://restcountries.eu/rest/v2/name/'+name+'?fullText=true') // Make GET request to API
        .then(res => res.json())  // Parse json
        .then((data) => {         // Set the value of state to the data
          this.setState({ country: data })
          console.log(this.state)
        })
        .catch(console.log)       // Catch any errors
      }

    render() {
        return(
            <div>
                {this.state.country.map((country) => (
                    <div class="detail-container">
                        <div class="button-holder">
                            <BackButton />
                        </div>
                        <div class="country-container">
                            <img class="country-flag-detail" src={country.flag} alt={country.name}/>
                            <h4 class="card-title">{ country.name }</h4>
                            <p class="separator card-info"><span class="card-info-bold">Native Name: </span>{country.nativeName}</p>
                            <p class="card-info"><span class="card-info-bold">Population: </span>{country.population}</p>
                            <p class="card-info"><span class="card-info-bold">Region: </span>{country.region}</p>
                            <p class="card-info"><span class="card-info-bold">Sub Region: </span>{country.subregion}</p>
                            <p class="card-info"><span class="card-info-bold">Capital: </span>{country.capital}</p>
                            <p class="card-info"><span class="card-info-bold">NumericCode: </span>{country.numericCode}</p>

                            <p class="separator card-info"><span class="card-info-bold">Top Level Domain: </span>{country.topLevelDomain}</p>
                            <p class="card-info">
                                <span class="card-info-bold">
                                    Currencies: 
                                </span>
                                {country.currencies.map((currency) => {
                                    return <p class="listed-value">{currency.name}</p>
                                })}
                            </p>
                            <p class="card-info">
                                <span class="card-info-bold">
                                    Languages: 
                                </span>
                                {country.languages.map((language) => {
                                    return <p class="listed-value">
                                        {language.name}
                                    </p>
                                })}
                            </p>

                            <h5 class="boder">Border Countries</h5>
                            {/* add loop with  request to get country full name */}
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}

export default Details