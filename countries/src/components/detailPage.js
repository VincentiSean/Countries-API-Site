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
            <div id="detail-parent">
                {this.state.country.map((country) => (
                    <div className="detail-container">
                        <div className="button-holder">
                            <BackButton />
                        </div>
                        <div className="detail-container-content">
                            <img className="country-flag-detail" src={country.flag} alt={"Flag of " + country.name}/>
                            <div id="column-one-detail">
                                <h4 className="card-title-detail">{ country.name }</h4>
                                <p className="separator card-info-detail"><span className="card-info-detail-bold">Native Name: </span>{country.nativeName}</p>
                                <p className="card-info-detail"><span className="card-info-detail-bold">Population: </span>{country.population}</p>
                                <p className="card-info-detail"><span className="card-info-detail-bold">Region: </span>{country.region}</p>
                                <p className="card-info-detail"><span className="card-info-detail-bold">Sub Region: </span>{country.subregion}</p>
                                <p className="card-info-detail"><span className="card-info-detail-bold">Capital: </span>{country.capital}</p>
                            </div>
                            <div id="column-two-detail">
                                <p className="separator card-info-detail">
                                    <span className="card-info-detail-bold rmarg">
                                        Top Level Domain: 
                                    </span>
                                    {country.topLevelDomain}
                                </p>
                                <div className="dynamic-container">
                                    <span className="card-info-detail-bold">
                                        Currencies: 
                                    </span>
                                    
                                    {country.currencies.map((currency) => {
                                        return (
                                            <p key={currency.name} className="listed-value">
                                                {currency.name}
                                            </p>
                                        )
                                    })}
                                </div>
                                    
                                <div className="bottom dynamic-container">
                                    <span className="card-info-detail-bold">
                                        Languages: 
                                    </span>
                                    
                                    {country.languages.map((language) => {
                                        return (
                                            <p key={language.name} className="listed-value">
                                                {language.name}
                                            </p>
                                        )
                                    })}
                                </div>
                            </div>
                            

                            <h5 className="border">Border Countries:</h5>
                            <div id="border-grid">
                                {country.borders.map((border) => {
                                        return (
                                            <Border key={border}>
                                                { border }
                                            </Border>
                                        )
                                })}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}

export default Details