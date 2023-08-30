import { ActionTypes } from "./actions";

function rootReducer(state, { type, payload }) {
  if (type === ActionTypes.SET_FIELDS) {
    return {
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      message: payload.message,
    };
  }

  return state;
}

export default rootReducer;
