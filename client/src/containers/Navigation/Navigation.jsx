import React from 'react';
import PropTypes from 'prop-types';
import { Action } from '../../actions';
import { connect } from 'react-redux';
import Tile from '../../components/Tile/Tile';

class Navigation extends React.Component {
  componentDidMount() {
    const { getGiphy } = this.props;
    getGiphy();
  }

  render() {
    const { giphy } = this.props;
    const tiles = [];
    for (let i = 0; i < 30; i++) {
      tiles.push(<Tile backgroundImage={giphy[i]} key={i} />);
    }
    const ret = <div className="Navigation">{tiles}</div>;

    return ret;
  }
}

Navigation.propTypes = {
  giphy: PropTypes.object
};

const mapStateToProps = (state, ownProps) => {
  return {
    giphy: state.giphy
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getGiphy: () => Action.GET_GIPHY.fetch(dispatch)
  };
};

Navigation = connect(mapStateToProps, mapDispatchToProps)(Navigation);

export default Navigation;
