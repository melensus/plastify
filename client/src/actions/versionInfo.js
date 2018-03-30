export default {
  type: 'GET_VERSION_INFO',
  url: '/version',
  state: {
    versionInfo: {
      default: '-1',
      success: (action, state) => action.response.version,
      error: (action, state) => {
        console.log('Error', action.error);
        return { ...state };
      }
    }
  }
};
