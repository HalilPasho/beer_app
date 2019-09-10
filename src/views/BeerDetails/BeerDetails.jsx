import React, { Component } from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';
import './BeerDetails.css';


class BeerDetails extends Component {
  constructor() {
    super();

    this.state = {
      beer: undefined,
    };
  }

  componentDidMount = async () => {
    const { match: { params: { id } } } = this.props;
    const { data: [beer] } = await Axios.get(`https://api.punkapi.com/v2/beers/${id}`);
    this.setState({ beer });
  }

  render() {
    const { beer } = this.state;

    if (beer) {
      return (
        <div>
          <h1>Beer Details</h1>
          <hr />
          <p>
            Description:&nbsp;
            <span className="valText">{beer.description}</span>
          </p>
          <p>
            Abv:&nbsp;
            <span className="valText">{beer.abv}</span>
          </p>
          <p>
            Volume (celsius):&nbsp;
            <span className="valText">{beer.volume.value}</span>
          </p>
          <p>
            Food Pairing:&nbsp;
            <span className="valText">{beer.food_pairing}</span>
          </p>
        </div>
      );
    }
    return (<div />);
  }
}

BeerDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default BeerDetails;
