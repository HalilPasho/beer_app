import React from 'react';
import './Pagination.css';
import './Pagination.css'


export default class Pagination extends React.Component {

  state = {
    pages: 0,
    length: 0,
    limit: 0,
  }

  gotoPrevious = () => {
    if (this.props.page > 1) {
      this.props.gotoPage(this.props.page - 1);
    }
  }

  gotoNext = () => {
    if (this.props.page < this.state.pages) {
      this.props.gotoPage(this.props.page + 1);
    }
  }


  static getDerivedStateFromProps = (props, state) => {
    if (props.limit !== state.limit || props.length !== state.length) {
      return {
        pages: Math.ceil(props.length / props.limit),
      };
    }
  }

  render() {
    const { gotoNext, gotoPrevious, props: { page }, state: { pages } } = this;
    return (
      <div className={'bottom'}>
        <button className={'buttons'} onClick={gotoPrevious}>Previous</button>
        {page} / {pages}
        <button className={'buttons'} onClick={gotoNext}>Next</button>
      </div>
    );
  }
};
