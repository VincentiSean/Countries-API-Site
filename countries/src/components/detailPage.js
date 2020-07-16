import React, { Component } from 'react';
import BackButton from './back';
import Border from './border';


class Details extends Component {
    state = {
        country: [],
        changedURL: false
    }

    componentDidMount() {
        let name = this.props.location.pathname.replace("/", "");
        this.fetchCountry(name);
    }

    fetchCountry(name) {
        fetch('https://restcountries.eu/rest/v2/name/'+name+'?fullText=true') // Make GET request to API
        .then(res => res.json())  // Parse json
        .then((data) => {         // Set the value of state to the data
        this.setState({ country: data })
        })
        .catch(console.log)       // Catch any errors
    }

    render() {
        return(
            <div>
                {this.state.country.map((country) => (
                    <div className="detail-container">
                        <div className="button-holder">
                            <BackButton />
                        </div>
                        <div className="country-container">
                            <img className="country-flag-detail" src={country.flag} alt={"Flag of " + country.name}/>
                            <h4 className="card-title">{ country.name }</h4>
                            <p className="separator card-info"><span className="card-info-bold">Native Name: </span>{country.nativeName}</p>
                            <p className="card-info"><span className="card-info-bold">Population: </span>{country.population}</p>
                            <p className="card-info"><span className="card-info-bold">Region: </span>{country.region}</p>
                            <p className="card-info"><span className="card-info-bold">Sub Region: </span>{country.subregion}</p>
                            <p className="card-info"><span className="card-info-bold">Capital: </span>{country.capital}</p>
                            <p className="card-info"><span className="card-info-bold">NumericCode: </span>{country.numericCode}</p>

                            <p className="separator card-info">
                                <span className="card-info-bold">
                                    Top Level Domain: 
                                </span>
                                {country.topLevelDomain}
                            </p>
                            <span className="card-info-bold">
                                Currencies: 
                            </span>
                            
                            {country.currencies.map((currency) => {
                                return (
                                    <p key={currency.name} className="listed-value">
                                        {currency.name}
                                    </p>
                                )
                            })}
                                
                            <span className="card-info-bold">
                                Languages: 
                            </span>
                            
                            {country.languages.map((language) => {
                                return (
                                    <p key={language.name} className="listed-value">
                                        {language.name}
                                    </p>
                                )
                            })}

                            <h5 className="border">Border Countries</h5>
                            {country.borders.map((border) => {
                                return (
                                    <Border key={border}>
                                        { border }
                                    </Border>
                                )
                            })}
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}

export default Details