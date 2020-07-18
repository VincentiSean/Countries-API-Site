import React, { Component } from 'react';
import './App.css';
import Countries from './components/countries';
import Details from './components/detailPage';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

class App extends Component {

  render() {
    return (
      <Router>
        <div id="app">
          <header id="app-header">
            <h3>Where in the world?</h3>
            <button><i className="far fa-moon"></i>Dark Mode</button>
          </header>
          <section id="main-content">
            <Switch>
              <Route exact path="/" component={Countries}></Route>
              <Route exact path="/:country" component={Details}></Route>
            </Switch>
          </section>
        </div>
      </Router>
    );
  }
}

export default App;
