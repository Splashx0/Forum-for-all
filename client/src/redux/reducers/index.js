import messageReducer from "./messageReducer";
import roomReducer from "./roomReducer";
import topicReducer from "./topicReducer";
import userReducer from "./userReducer";

import { combineReducers } from "redux";

const Reducers = combineReducers({
  messageReducer,
  roomReducer,
  topicReducer,
  userReducer,
});

export default Reducers;
