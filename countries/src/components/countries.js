import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
// import styled from 'styled-components';

// const DropDownContainer = styled("div")`
//     background: var(--white);
//     box-sizing: border-box;
//     font-family: 'Nunito Sans', sans-serif;
//     margin-top: 20px;
//     margin-left: 5vw;
//     width: 50vw;
// `;

// const DropDownHeader = styled("div")`
//     background-color: var(--white);
//     border-radius: 5px;
//     box-shadow: 0 2px 3px rgba(0, 0, 0, 0.15);
//     color: var(----dark-blue-lmt);
//     font-size: 14px;
//     font-weight: 400;
//     padding: 10px;
// `;

// const DropDownListContainer = styled("div")``;

// const DropDownList = styled("ul")`
//     background-color: var(--white);
//     border-radius: 5px;
//     box-sizing: border-box;
//     color: var(--dark-blue-lmt);
//     font-size: 14px;
//     font-weight: 400;
//     margin: 0;
//     padding: 0;
// `;

// const ListItem = styled("li")`
//     list-style: none;
//     margin-bottom: 10px;
// `;

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
                        <input 
                            type="text" 
                            name="countrySearch" 
                            placeholder="Search for a country..."
                            onChange={(e) => this.handleChange(e)} />
                        <button onClick={this.showMenu}>Filter by region</button>
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
                        
                        {/* <DropDownContainer>
                            <DropDownHeader onClick={toggling}>Filter by Region</DropDownHeader>
                            {isOpen && (
                                <DropDownListContainer>
                                    <DropDownList>
                                        <ListItem>Africa</ListItem>
                                        <ListItem>Americas</ListItem>
                                        <ListItem>Asia</ListItem>
                                        <ListItem>Europe</ListItem>
                                        <ListItem>Oceania</ListItem>
                                    </DropDownList>
                                </DropDownListContainer>
                            )}
                        </DropDownContainer> */}
                        {/* <div id="custom-select">
                            <select name="regionFilter" onChange={(e) => this.selectFilter(e)}>
                                <option value="" disabled selected hidden>Filter by Region</option>
                                <option value="Africa">Africa</option>
                                <option value="Americas">Americas</option>
                                <option value="Asia">Asia</option>
                                <option value="Europe">Europe</option>
                                <option value="Oceania">Oceania</option>
                            </select>
                        </div> */}
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