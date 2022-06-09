import { combineReducers } from "redux";

import audioReducer from "./audio.reducer.js";

const rootReducer = combineReducers({
  audio: audioReducer,
});

export default rootReducer;
