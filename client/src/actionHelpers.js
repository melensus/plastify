import { combineReducers } from 'redux';

export const reducers = [];

const PENDING = 'PENDING';
const SUCCESS = 'SUCCESS';
const ERROR = 'ERROR';

export const actions = {};

export function registerActions() {
  for (const action of arguments) {
    registerAction(action);
  }
  console.log('actions', actions);
  console.log('reducers', reducers);
}

function registerAction(action) {
  console.log('action', action);
  const actionInfo = {
    type: action.type,
    create: (status, args) => {
      return Object.assign({ type: action.type, status }, args);
    }
  };

  if (action.url) {
    actionInfo.fetch = dispatch => {
      dispatch(actionInfo.create(PENDING));
      return fetch(action.url)
        .then(response => response.json())
        .then(json => {
          console.log('json', json);
          return json;
        })
        .then(json => dispatch(actionInfo.create(SUCCESS, { response: json })))
        .catch(e => dispatch(actionInfo.create(ERROR, { error: e })));
    };
  }

  if (action.state) {
    actionInfo.reducer = {};
    for (const key in action.state) {
      const reducerInfo = action.state[key];
      actionInfo.reducer[key] = (state = reducerInfo.default, action) => {
        return reduce(action.type, state, action, reducerInfo);
      };
    }
    reducers.push(actionInfo.reducer);
  }

  actions[action.type] = actionInfo;
}

function reduce(type, state, action, handlers) {
  console.log(action);
  if (type === action.type && action.status) {
    const handler = handlers[action.status.toLowerCase()];
    if (handler) {
      console.log('handled', action);
      return handler(action, state);
    }
  }
  return state;
}
