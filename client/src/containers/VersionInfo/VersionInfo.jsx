import React from 'react';
import PropTypes from 'prop-types';
import { Action } from '../../actions';
import { connect } from 'react-redux';
import './VersionInfo.css';

class VersionInfo extends React.Component {
  componentDidMount() {
    const { getVersionInfo } = this.props;
    getVersionInfo();
  }

  render() {
    const { versionInfo } = this.props;
    return <div className="VersionInfo">v.{versionInfo}</div>;
  }
}

VersionInfo.propTypes = {
  versionInfo: PropTypes.string
};

const mapStateToProps = (state, ownProps) => {
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
