import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import BeerProducts from './BeerProducts/BeerProducts';
import BeerDetails from './BeerDetails/BeerDetails'

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Router>
      <ul>
        <li className={'navigation'}>
          <Link className={'linkColor'} to="/">Home</Link>
        </li>
        <li className={'navigation'}>
          <Link className={'linkColor'} to="/beerproducts">Beer Products</Link>
        </li>
        <li className={'navigation'}>
          <Link className={'linkColor'} to="/beerdetails">Beer Products</Link>
        </li>
      </ul>
      <Switch>
        <Route exact path='/' component={RedirectTo('/')} />
        <Route exact path='/beerproducts' component={BeerProducts} />
        <Route exact path='/beerdetails' component={BeerDetails} />
      </Switch>
    </Router>
      </header>
    </div>
  );
}

function RedirectTo(pathname) {
  return () => (<Redirect to={{ pathname }} />);
}


// <Route path='/shipments/:id/details' component={ShipmentDetails} />
export default App;
