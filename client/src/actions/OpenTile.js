export default {
  type: 'OPEN_TILE',
  fetch: (action, dispatch, args) => {
    return new Promise((resolve, reject) => {
      console.log('pending', args.$id);
      setTimeout(() => resolve({ $id: args.$id }), 100);
    });
  },
  state: {
    tiles: {
      default: {},
      pending: (action, state) => {
        const ret = { ...state };
        console.log('pending');
        for (const tileId in state) {
          const tileState = state[tileId];
          ret[tileId] = { ...tileState, status: 'closed' };
        }
        ret[action.$id] = { status: 'opening' };
        return ret;
      },
      success: (action, state) => {
        const ret = { ...state };
        ret[action.$id] = { status: 'open' };
        return ret;
      }
    }
  }
};
