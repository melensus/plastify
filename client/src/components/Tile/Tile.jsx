import React from 'react';
import PropTypes from 'prop-types';
import './Tile.css';

class Tile extends React.Component {
  render() {
    const { backgroundImage } = this.props;
    const divStyle = {
      backgroundImage: `url('${backgroundImage}')`
    };
    return <div className="Tile" style={divStyle} />;
  }
}

Tile.propTypes = {
  backgroundImage: PropTypes.string
};

export default Tile;
