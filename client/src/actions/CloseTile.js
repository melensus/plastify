export default {
  type: 'CLOSE_TILE',
  fetch: (action, dispatch, args) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve({ $id: args.$id }), 1000);
    });
  },
  state: {
    tiles: {
      default: {},
      pending: (action, state) => {
        const ret = { ...state };
        ret[action.$id] = { status: 'closing' };
        return ret;
      },
      success: (action, state) => {
        const ret = { ...state };
        ret[action.$id] = { status: 'closed' };
        return ret;
      }
    }
  }
};