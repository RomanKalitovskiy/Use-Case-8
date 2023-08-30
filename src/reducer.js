import { ActionTypes } from "./actions";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  message: "",
};

function rootReducer(state = initialState, { type, payload }) {
  switch (type) {
    case ActionTypes.SET_FIELDS:
      return {
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        message: payload.message,
      };
    default:
      return state;
  }
}

export default rootReducer;
