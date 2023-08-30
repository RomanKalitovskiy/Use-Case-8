import { useReducer } from "react";
import { Input } from "./Input";
import { setFields } from "./store/actions";
import { useDispatch } from "react-redux";

export const preprocessState = (state) =>
  Object.fromEntries(
    Object.entries(state).map(([key, { value }]) => [key, value])
  );

export const isValid = (data, state) => {
  return data.every(({ name, validation }) => validation(state[name].value));
};

export const prepareInitialState = (data) =>
  Object.fromEntries(
    data.map(({ name }) => [name, { value: "", error: null }])
  );

export default function Form({ data }) {
  const initialState = prepareInitialState(data);

  const reducer = (state, { type, name, value, error }) => {
    switch (type) {
      case "SET_ERROR":
        return { ...state, [name]: { ...state[name], error } };
      case "SET_VALUE":
        return { ...state, [name]: { ...state[name], value, error: null } };
      default:
        return state;
    }
  };

  const [state, localDispatch] = useReducer(reducer, initialState);

  const reduxDispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();

    data.forEach(({ name, validation, error }) => {
      if (!validation(state[name].value)) {
        localDispatch({ type: "SET_ERROR", name, error });
      }
    });

    if (isValid(data, state)) {
      reduxDispatch(setFields(preprocessState(state)));
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    localDispatch({ type: "SET_VALUE", name, value });
  };

  return (
    <form onSubmit={handleSubmit}>
      {data.map(({ name, placeholder }) => (
        <Input
          key={name}
          name={name}
          placeholder={placeholder}
          {...state[name]}
          onChange={handleInputChange}
        />
      ))}
      <button type="submit">Submit</button>
    </form>
  );
}
