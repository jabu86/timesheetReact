import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const initailState = {};

const middleWare = [thunk];

const store = createStore(
  rootReducer,
  initailState,
  composeWithDevTools(applyMiddleware(...middleWare))
);


export default store;