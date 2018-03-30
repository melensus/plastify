import { createStore, applyMiddleware, combineReducers } from 'redux';
import { reducers } from '../actionHelpers';

export default function configureStore() {
  const rootReducer = combineReducers(...reducers);
  return createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
}
