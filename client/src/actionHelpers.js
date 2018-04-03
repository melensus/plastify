export const reducers = {};

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
    actionInfo.fetch = (dispatch, args) => {
      dispatch(actionInfo.create(PENDING, { ...args }));
      return actionConfig
        .fetch(actionInfo, dispatch, args)
        .then(response =>
          dispatch(actionInfo.create(SUCCESS, { ...args, response: response }))
        )
        .catch(e => dispatch(actionInfo.create(ERROR, { ...args, error: e })));
    };
  }
}

function addURLFetch(actionConfig) {
  if (actionConfig.url) {
    const actionInfo = actions[actionConfig.type];
    actionInfo.fetch = (dispatch, args) => {
      dispatch(actionInfo.create(PENDING, { ...args }));
      return fetch(actionConfig.url)
        .then(response => response.json())
        .then(json =>
          dispatch(actionInfo.create(SUCCESS, { ...args, response: json }))
        )
        .catch(e => dispatch(actionInfo.create(ERROR, { ...args, error: e })));
    };
  }
}

function addReducers(actionConfig) {
  if (actionConfig.state) {
    const actionInfo = actions[actionConfig.type];

    for (const key in actionConfig.state) {
      const handlers = actionConfig.state[key];
      addReducer(actionInfo, handlers, key, actionConfig);
    }
  }
}

function addReducer(actionInfo, handlers, key, actionConfig) {
  const reducer = (state = handlers.default, action) => {
    return reduce(actionInfo, key, action, state, actionConfig);
  };

  const existingReducerForKey = reducers[key];
  if (existingReducerForKey) {
    reducers[key] = (state, action) => {
      state = existingReducerForKey(state, action);
      return reducer(state, action);
    };
  } else {
    reducers[key] = reducer;
  }
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
