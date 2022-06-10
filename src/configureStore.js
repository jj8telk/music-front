import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";

import reducers from "./store/reducers";

import { persistedState, saveState } from "./persisted.store.js";

const loggerMiddleware = createLogger();

export default function configureStore() {
  const store = createStore(
    reducers,
    persistedState, // second argument overrides the initial state
    applyMiddleware(thunkMiddleware, loggerMiddleware)
  );

  // add a listener that will be invoked on any state change
  store.subscribe(() => {
    saveState(store.getState());
  });

  return store;
}
