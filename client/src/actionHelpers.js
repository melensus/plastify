export const reducers = [];

const PENDING = 'PENDING';
const SUCCESS = 'SUCCESS';
const ERROR = 'ERROR';

export const actions = {};

export function registerActions(actions) {
  actions.map(registerAction);
}

function registerAction(actionConfig) {
  actions[actionConfig.type] = {
    type: actionConfig.type,
    create: (status, args) => {
      return { type: actionConfig.type, status, ...args };
    }
  };

  addURLFetch(actionConfig);
  addFuncFetch(actionConfig);
  addReducers(actionConfig);
}

function addFuncFetch(actionConfig) {
  if (actionConfig.fetch) {
    const actionInfo = actions[actionConfig.type];
    actionInfo.fetch = dispatch => {
      dispatch(actionInfo.create(PENDING));
      return actionConfig
        .fetch(actionInfo, dispatch)
        .then(response =>
          dispatch(actionInfo.create(SUCCESS, { response: response }))
        )
        .catch(e => dispatch(actionInfo.create(ERROR, { error: e })));
    };
  }
}

function addURLFetch(actionConfig) {
  if (actionConfig.url) {
    const actionInfo = actions[actionConfig.type];
    actionInfo.fetch = dispatch => {
      dispatch(actionInfo.create(PENDING));
      return fetch(actionConfig.url)
        .then(response => response.json())
        .then(json => dispatch(actionInfo.create(SUCCESS, { response: json })))
        .catch(e => dispatch(actionInfo.create(ERROR, { error: e })));
    };
  }
}

function addReducers(actionConfig) {
  if (actionConfig.state) {
    const actionInfo = actions[actionConfig.type];
    actionInfo.reducers = {};
    for (const key in actionConfig.state) {
      const handlers = actionConfig.state[key];
      addReducer(actionInfo, handlers, key, actionConfig);
    }
    reducers.push(actionInfo.reducers);
  }
}

function addReducer(actionInfo, handlers, key, actionConfig) {
  actionInfo.reducers[key] = (state = handlers.default, action) => {
    return reduce(actionInfo, key, action, state, actionConfig);
  };
}

function reduce(actionInfo, key, action, state, actionConfig) {
  if (actionInfo.type === action.type && action.status) {
    const handler = actionConfig.state[key][action.status.toLowerCase()];
    if (state === 'error') {
      console.error('Error', action.error);
    }
    if (handler) {
      return handler(action, state) || state;
    }
  }
  return state;
}
