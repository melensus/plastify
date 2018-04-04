export default {
  type: 'CLOSE_TILE',
  fetch: (action, dispatch, args) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve({ $id: args.$id }), 400);
    });
  },
  state: {
    tiles: {
      default: {},
      pending: (action, state) => {
        const ret = { ...state };
        ret[action.$id] = { status: 'closing' };
        document.body.className = '';
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
