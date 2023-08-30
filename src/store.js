import { legacy_createStore as createStore } from "redux";
import rootReducer from "./reducer";

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // This is for enabling Redux DevTools. If you don't have it installed, omit this.
);

export default store;
