import React, { Component } from 'react';
import axios from 'axios';
import Pagination from '../../components/Pagination/Pagination';


class Beers extends Component {
  constructor() {
    super();

    this.state = {
      beers: [],
      brewDate: '',
      brewDateFilterType: '',
      searchText: '',
      limit: 10,
      page: 1,
    };
  }

  gotoPage = (page) => {
    this.setState({ page });
  }

  onSearchTextChange = (event) => {
    this.setState({ searchText: event.target.value });
  }

  onBrewDateFilterTypeChange = (event) => {
    this.setState({ brewDateFilterType: event.target.value });
  }

  onBrewDateChange = (event) => {
    const isValidInput = event.target.value.length === 7 && /\d{2}\/\d{4}/.test(event.target.value);
    this.setState({ brewDate: isValidInput ? event.target.value : '' });
  }

  componentDidMount = async () => {
    const { data: beers } = await axios.get('https://api.punkapi.com/v2/beers');
    this.setState({ beers });
  }

  filterByName = (beers, name) => {
    if (name) {
      return beers.filter((beer) => beer.name.toLowerCase().search(name.toLowerCase()) !== -1);
    }
    return beers;
  }

  compareDates = (date1, date2) => {
    const [date1Month, date1Year] = date1.split('/').map((numeric) => parseInt(numeric, 10));
    const [date2Month, date2Year] = date2.split('/').map((numeric) => parseInt(numeric, 10));
    if (date1Year === date2Year) {
      return date1Month - date2Month;
    }
    return date1Year - date2Year;
  }

  filterByBrewDate = (beers, brewDateFilterType, brewDate) => {
    if (brewDateFilterType && brewDate) {
      return beers.filter((beer) => {
        const comparison = this.compareDates(beer.first_brewed, brewDate);
        if (brewDateFilterType === 'before') {
          return comparison < 0;
        }
        return comparison > 0;
      });
    }
    return beers;
  }

  filterByPage = (beers, page, limit) => {
    const startFrom = (page - 1) * limit;
    return beers.slice(startFrom, startFrom + limit);
  }

  renderBeer = (beer) => (
    <div key={beer.id}>
      <table cellPadding={20}>
        <thead>
          <tr>
            <th>Photo</th>
            <th>Name</th>
            <th>First Brew Date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <img src={beer.image_url} style={{ width: '20%' }} alt="" />
            </td>
            <td>
              <a className="linkColor" href={`/beers/${beer.id}/details`}>
                {beer.name}
              </a>
            </td>
            <td>{beer.first_brewed}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )

  render() {
    const { beers, brewDate, brewDateFilterType, searchText, page, limit } = this.state;
    let filteredBeers = this.filterByName(beers, searchText);
    filteredBeers = this.filterByBrewDate(filteredBeers, brewDateFilterType, brewDate);
    const pageBeers = this.filterByPage(filteredBeers, page, limit);

    return (
      <div>
        <input className="filters" type="text" placeholder="Search" value={searchText} onChange={this.onSearchTextChange} />
        <select className="filters" onChange={this.onBrewDateFilterTypeChange}>
          <option value="">Choose Brew Date Filter Type</option>
          <option value="before">Before</option>
          <option value="after">After</option>
        </select>
        <input className="filters" type="text" placeholder="Brew Date (mm-yyyy)" onChange={this.onBrewDateChange} />
        <h1>
          Beers (
          {filteredBeers.length}
          )
        </h1>
        {pageBeers.map(this.renderBeer)}

        <Pagination
          limit={limit}
          length={filteredBeers.length}
          page={page}
          gotoPage={this.gotoPage}
        />
      </div>
    );
  }
}


export default Beers;
