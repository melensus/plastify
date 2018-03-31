import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import configureStore from './store/configureStore';
import App from './containers/App/App';
import registerServiceWorker from './registerServiceWorker';
import dotenv from 'dotenv';

dotenv.config();

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
