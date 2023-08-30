import { ActionTypes } from "./actions";

function rootReducer(state, { type, payload }) {
  if (type === ActionTypes.SET_FIELDS) {
    return payload;
  }

  return state;
}

export default rootReducer;
