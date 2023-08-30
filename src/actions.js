export const ActionTypes = {
  SET_FIELDS: "SET_FIELDS",
};

export function setFields({ firstName, lastName, email, message }) {
  return {
    type: ActionTypes.SET_FIELDS,
    payload: { firstName, lastName, email, message },
  };
}
