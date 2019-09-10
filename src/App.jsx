import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import Beers from './views/Beers/Beers';
import BeerDetails from './views/BeerDetails/BeerDetails';
import './App.css';


function RedirectTo(pathname) {
  return () => (<Redirect to={{ pathname }} />);
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <ul>
            <li className="navigation">
              <Link className="linkColor" to="/beers">Beers</Link>
            </li>
          </ul>
          <Switch>
            <Route exact path="/" component={RedirectTo('/beers')} />
            <Route exact path="/beers" component={Beers} />
            <Route exact path="/beers/:id/details" component={BeerDetails} />
          </Switch>
        </Router>
      </header>
    </div>
  );
}

export default App;
