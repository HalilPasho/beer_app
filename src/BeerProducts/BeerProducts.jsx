import React, { Component } from 'react'
import Pagination from '../Pagination/Pagination'
// import { Link } from 'react-router-dom';
// import axios from 'axios'

class BeerProducts extends Component {
  state = {
    showContent: [],
    beer:[],
    limit: 10,
    page: 1,
    sortField: '',
    searchText:''
  }

  filterBeers = (beers, searchText) => {
    if (!searchText) {
      return  beers;
    }
    return beers.filter((beers) => {
      return beers.key.toLowerCase().search(searchText.toLowerCase()) !== -1;
    });
  }

  ontouchcancel = ()=>{
    console.log(111);
  }

  gotoPage = (page) => {
    this.setState({ page });
  }

  onSearchTextChange = (event) => {
    this.setState({ searchText: event.target.value });
  }



    getPageBeer = (beer, page, limit) => {
      const startFrom = (page - 1) * limit;
      return beer.toString().slice(startFrom, startFrom + limit);
    }


  componentDidMount() {
    fetch("https://api.punkapi.com/v2/beers")
      .then(res => {
        return res.json();
      }).then(dta => {
        let beer = dta.map(beerRes => {
          return (
            <div key={beerRes.name}>
              <div onClick = {this.ontouchcancel}>
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
                      <td><img src={beerRes.image_url} style={{ "width": "20%" }} /></td>
                      <td>{beerRes.name}</td>
                      <td>{beerRes.first_brewed}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

            </div>
          )
        })
        this.setState({ showContent: beer });
      })

  }


  render() {
    const {page,limit,beer,showContent,searchText} = this.state;
    const filterBeer = this.filterBeers(showContent,searchText);
    const pageBeer = this.getPageBeer( page, limit);
    
    return (
      <div>
      <input className={'filters'} type="text" placeholder="Search" value={searchText} onChange={this.onSearchTextChange}/>
        <h1>Beers</h1>
        {this.state.showContent}
        <Pagination limit = {limit} length={filterBeer.length} page = {page} gotoPage={this.gotoPage}/>
      </div>
    )
  }
}


export default BeerProducts;