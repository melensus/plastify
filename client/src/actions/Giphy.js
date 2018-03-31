import GphApiClient from 'giphy-js-sdk-core';

const giphy = GphApiClient(process.env.REACT_APP_GIPHY_API_KEY);

function rand() {
  const min = 0;
  const max = 99;
  return Math.floor(Math.random() * (max - min) + min);
}

export default {
  type: 'GET_GIPHY',
  fetch: (action, dispatch) => giphy.trending('gifs', { limit: 100 }),
  state: {
    giphy: {
      default: { test: '' },
      success: (action, state) => {
        const ret = {};
        for (let i = 0; i < 30; i++) {
          ret[i] =
            action.response.data[
              rand()
            ].images.fixed_height_downsampled.gif_url;
        }
        return ret;
      }
    }
  }
};
