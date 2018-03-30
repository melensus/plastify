import React from 'react';
import PropTypes from 'prop-types';
import { Action } from '../../actions';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';

class VersionInfo extends React.Component {
  componentDidMount() {
    const { getVersionInfo } = this.props;
    getVersionInfo();
  }

  render() {
    const { dispatch, versionInfo } = this.props;
    console.log('render', versionInfo);
    return (
      <div>
        VersionInfo : {versionInfo} <Button color="danger">Danger!</Button>
      </div>
    );
  }
}

VersionInfo.propTypes = {
  versionInfo: PropTypes.string
};

const mapStateToProps = (state, ownProps) => {
  console.log('mapProps', state);
  return {
    versionInfo: state.versionInfo
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getVersionInfo: () => Action.GET_VERSION_INFO.fetch(dispatch)
  };
};

VersionInfo = connect(mapStateToProps, mapDispatchToProps)(VersionInfo);

export default VersionInfo;