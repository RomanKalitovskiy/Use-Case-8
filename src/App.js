import { useEffect } from "react";
import { useStore } from "react-redux";
import validator from "validator";
import Form from "./Form";

export const data = [
  {
    name: "first_name",
    placeholder: "First Name",
    validation: (value) => value,
    error: "First Name is required!",
  },
  {
    name: "last_name",
    placeholder: "Last Name",
    validation: (value) => value,
    error: "Last Name is required!",
  },
  {
    name: "email",
    placeholder: "Email",
    validation: validator.isEmail,
    error: "Invalid Email!",
  },
  {
    name: "message",
    placeholder: "Message",
    validation: (value) => value.length >= 10,
    error: "Message should be at least 10 characters!",
  },
];

const logStore = (store) => {
  console.log("Store contains following values:");
  console.table(store);
};

function App() {
  const { subscribe, getState } = useStore();

  useEffect(() => {
    return subscribe(() => logStore(getState()));
  }, [getState, subscribe]);

  return <Form data={data} />;
}

export default App;
