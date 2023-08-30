import Form from "./Form";
import validator from "validator";

const data = [
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

function App() {
  return <Form data={data} />;
}

export default App;
