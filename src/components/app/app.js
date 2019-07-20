import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorBoundry from '../error-boundry';
import SwapiService from "../../services/swapi-service";

import {
  PeoplePage,
  PlanetsPage,
  StarshipsPage} from '../pages';

import { SwapiServiceProvider } from '../swapi-service-context';

import './app.css';

//React-Router
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { StarshipDetails } from '../sw-components';

export default class App extends Component {

  swapiService = new SwapiService();

  render() {

    return (
      <ErrorBoundry>
        <SwapiServiceProvider value={this.swapiService} >
  
          <Router>
            <div className="stardb-app">

              <Header />
              <RandomPlanet updateInterval={4000} />

              <Switch>
                <Route path="/"
                      render={() => (
                        <div className="jumbotron text-center">
                          <h2>Welcome to StarDB</h2>
                        </div>
                      )}
                      exact/>
                <Route path="/planets" component={PlanetsPage} />
                <Route path="/people" component={PeoplePage} exact />
                <Route path="/people/:id" component={PeoplePage} />
                <Route path="/starships" component={StarshipsPage} exact />
                <Route path="/starships/:id"
                //Объект match содержит в себе блок params, который содержит id
                      render={({ match }) => {
                          const { id } = match.params;
                          return <StarshipDetails itemId={id} />
                      }} /> 
                <Route render={() => (
                  <div className="jumbotron text-center">
                    <h2>404<br/>Page not found</h2>
                  </div>
                )} />
              </Switch>
              
            </div>
          </Router>

        </SwapiServiceProvider>
      </ErrorBoundry>
    );
  }
}