import React, { Component } from 'react';
import axios from 'axios'

class BeerDetails extends Component {
  state = {
    beerDetail: undefined,
  }

  componentDidMount = async () => {
    const { data } = await axios.get("https://api.punkapi.com/v2/beers");
    console.log(data);

    this.setState({ beerDetail: data })
  }

  // renderbeerRow = () => {
  //   const { beerDetail } = this.state;
  //   if (beerDetail) {
  //     console.log("eee", beerDetail);

  //     return (
  //       <div>
  //         <td>
  //           {
  //             beerDetail.map((beer) => {
  //               <div key={beer.id}>
  //                 <div>{beer.name}</div>
  //               </div>
  //             })
  //           }
  //         </td>
  //       </div>

  //     )
  //   }
  // }

  render() {

    return (
      <div>
        <h1>beer details</h1>
        <tr>
        <h1>beer details</h1>
        </tr>
      </div>
    )
  }
}


export default BeerDetails;