import React from 'react';
import PropTypes from 'prop-types';
import './Pagination.css';


export default class Pagination extends React.Component {
  constructor() {
    super();

    this.state = {
      pages: 0,
    };
  }

  static getDerivedStateFromProps = (props, state) => {
    if (props.limit !== state.limit || props.length !== state.length) {
      return {
        pages: Math.ceil(props.length / props.limit),
      };
    }
    return {};
  }

  gotoPrevious = () => {
    const { page, gotoPage } = this.props;
    if (page > 1) {
      gotoPage(page - 1);
    }
  }

  gotoNext = () => {
    const { page, gotoPage } = this.props;
    const { pages } = this.state;
    if (page < pages) {
      gotoPage(page + 1);
    }
  }

  render() {
    const { gotoNext, gotoPrevious, props: { page }, state: { pages } } = this;
    return (
      <div className="bottom">
        <button className="buttons" onClick={gotoPrevious} type="button">Previous</button>
        {page}
        /
        {pages}
        <button className="buttons" onClick={gotoNext} type="button">Next</button>
      </div>
    );
  }
}

Pagination.propTypes = {
  limit: PropTypes.number.isRequired,
  length: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  gotoPage: PropTypes.func.isRequired,
};
