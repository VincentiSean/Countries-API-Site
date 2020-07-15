import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Border extends Component {
    state = {
        country: null
    }

    componentDidMount() {
        this.fetchCountry()
    }

    shouldComponentUpdate() {
        return true;
    }

    fetchCountry() {
        let name = this.props.children;
        fetch('https://restcountries.eu/rest/v2/alpha/'+name) // Make GET request to API
        .then(res => res.json())  // Parse json
        .then((data) => {
            this.setState({ country: data })
        })
        .catch(console.error)
    }

    render () {
        if (this.state.country != null) {
            return (
                <div>
                    <Link 
                        key={this.state.country.name} 
                        to={
                            "/details"+this.state.country.name
                        }>
                        <p>{ this.state.country.name }</p>
                    </Link>
                </div>
            )
        } else {
            return (
                <div>
                    <p>Something is wrong...</p>
                </div>  
            )
        }
    }
}

export default Border