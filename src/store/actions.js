export const ActionTypes = {
  SET_FIELDS: "SET_FIELDS",
};

export function setFields(payload) {
  return {
    type: ActionTypes.SET_FIELDS,
    payload,
  };
}
