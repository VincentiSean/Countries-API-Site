import React from 'react';

const Countries = ({ countries }) => {
    return(
        <div>
            {countries.map((country) => (
                <div class="card">
                    <div class="card-body">
                        <img src={country.flag} alt="Flag of  {country.name}"/>
                        <h4 class="card-title">{country.name}</h4>
                        <p class="card-info"><span class="card-info-bold">Population: </span>{country.population}</p>
                        <p class="card-info"><span class="card-info-bold">Region: </span>{country.region}</p>
                        <p class="card-info"><span class="card-info-bold">Capital: </span>{country.capital}</p>
                        <p class="card-info"><span class="card-info-bold">NumericCode: </span>{country.numericCode}</p>
                    </div>
                </div>
            ))}
        </div>
    )
};

export default Countries