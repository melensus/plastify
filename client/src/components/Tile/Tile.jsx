import React from 'react';
import PropTypes from 'prop-types';
import { Action } from '../../actions';
import { connect } from 'react-redux';
import { InputGroup, InputGroupAddon, Input, Button } from 'reactstrap';
import './Tile.css';
import uuid from 'uuid/v4';

class Tile extends React.Component {
  constructor() {
    super();
    this.state = { $id: uuid() };
  }

  componentDidMount = () => {
    //this.state = {$id : uuid()};
  };

  open = () => {
    const { $id } = this.state;
    const { tiles } = this.props;
    const { status } = tiles[$id] || { status: 'closed' };
    this.props.open($id, status);
  };

  close = () => {
    const { $id } = this.state;
    const { tiles } = this.props;
    const { status } = tiles[$id] || { status: 'closed' };
    this.props.close($id, status);
  };

  render() {
    const { $id } = this.state;
    const { backgroundImage, tiles } = this.props;
    const { status } = tiles[$id] || { status: 'closed' };
    console.log('status', status);
    const divStyle = {
      backgroundImage: `url('${backgroundImage ||
        'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs='}')`
    };
    return (
      <div id={$id} className={`Tile ${status}`} onMouseDown={this.open}>
        <div className="Tile-content closed" style={divStyle}>
          <span className="Tile-label">+</span>
        </div>
        <div className="Tile-content open">
          <div className="Tile-header">
            <div className="Tile-title">REGISTER</div>
            <span onMouseDown={this.close}>X</span>
          </div>
          <div className="Tile-body">
            <InputGroup>
              <InputGroupAddon addonType="prepend">@</InputGroupAddon>
              <Input placeholder="username" />
            </InputGroup>
            <br />
            <InputGroup>
              <InputGroupAddon addonType="prepend">?</InputGroupAddon>
              <Input placeholder="password" />
            </InputGroup>
            <br />
            <InputGroup>
              <InputGroupAddon addonType="prepend">#</InputGroupAddon>
              <Input placeholder="phone" />
            </InputGroup>
            <br />
            <InputGroup>
              <InputGroupAddon addonType="prepend">&gt;</InputGroupAddon>
              <Button>Register</Button>
            </InputGroup>
          </div>
        </div>
      </div>
    );
  }
}

Tile.propTypes = {
  $id: PropTypes.string,
  backgroundImage: PropTypes.string,
  status: PropTypes.string
};

const mapStateToProps = (state, ownProps) => {
  return {
    tiles: state.tiles
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    open: ($id, status) => {
      if (status === 'closed') {
        console.log('open', $id);
        return Action.OPEN_TILE.fetch(dispatch, { $id });
      }
    },
    close: ($id, status) => {
      if (status === 'open') {
        return Action.CLOSE_TILE.fetch(dispatch, { $id });
      }
    }
  };
};

Tile = connect(mapStateToProps, mapDispatchToProps)(Tile);

export default Tile;
