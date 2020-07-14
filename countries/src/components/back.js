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

        return <button onClick={this.buttonClick}type="button">Back</button>;
    }
}

export default BackButton