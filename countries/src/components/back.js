import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class BackButton extends Component {
    state = {
        redirect: false
    }

    buttonClick = () => {
        this.setState({ redirect: true });
    }

    render() {
        if (this.state.redirect) {
            return <Redirect push to="/" />;
        }

        return ( 
            <button id="back-button" onClick={this.buttonClick}type="button">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-narrow-left" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z"/>
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <line x1="5" y1="12" x2="9" y2="16" />
                    <line x1="5" y1="12" x2="9" y2="8" />
                </svg>
                <span className="back-text">Back</span>
            </button>
        );
    }
}

export default BackButton