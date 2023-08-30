import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import Form, { preprocessState, isValid, prepareInitialState } from "../Form";
import { legacy_createStore as createStore } from "redux";
import rootReducer from "../store/reducer";
import { data } from "../App";
import { setFields } from "../store/actions";

describe("Utility functions", () => {
  it("preprocessState returns the expected output", () => {
    const input = {
      first_name: { value: "testuser", error: "some error" },
      last_name: { value: "last", error: null },
    };
    const output = preprocessState(input);
    expect(output).toEqual({ first_name: "testuser", last_name: "last" });
  });

  describe("validation", () => {
    it("If all the fields is valid, returns true", () => {
      const state = {
        first_name: { value: "testuser" },
        last_name: { value: "something" },
        email: { value: "somevalid@email.com" },
        message: { value: "more than ten characters" },
      };
      expect(isValid(data, state)).toBe(true);
    });

    it("if first_name is empty, returns false", () => {
      const state = {
        first_name: { value: "" },
        last_name: { value: "something" },
        email: { value: "somevalid@email.com" },
        message: { value: "more than ten characters" },
      };
      expect(isValid(data, state)).toBe(false);
    });

    it("if last_name is empty, returns false", () => {
      const state = {
        first_name: { value: "something" },
        last_name: { value: "" },
        email: { value: "somevalid@email.com" },
        message: { value: "more than ten characters" },
      };
      expect(isValid(data, state)).toBe(false);
    });

    it("if email is not valid, returns false", () => {
      const state = {
        first_name: { value: "something" },
        last_name: { value: "last" },
        email: { value: "invalid.com" },
        message: { value: "more than ten characters" },
      };
      expect(isValid(data, state)).toBe(false);
    });

    it("If message is shorter than 10 characters the, returns false", () => {
      const state = {
        first_name: { value: "testuser" },
        last_name: { value: "something" },
        email: { value: "somevalid@email.com" },
        message: { value: "too short" },
      };
      expect(isValid(data, state)).toBe(false);
    });
  });

  it("prepareInitialState prepares the state correctly", () => {
    const data = [{ name: "username" }];
    expect(prepareInitialState(data)).toEqual({
      username: { value: "", error: null },
    });
  });
});

describe("Form Component", () => {
  const mockStore = createStore(rootReducer);
  const data = [
    {
      name: "username",
      placeholder: "Username",
      validation: (value) => value !== "",
      error: "Required",
    },
  ];

  it("renders input fields based on data prop", () => {
    render(
      <Provider store={mockStore}>
        <Form data={data} />
      </Provider>
    );
    expect(screen.getByTestId("input-username")).toBeInTheDocument();
  });

  it("updates input value on change", () => {
    render(
      <Provider store={mockStore}>
        <Form data={data} />
      </Provider>
    );
    const input = screen.getByTestId("input-username");
    fireEvent.change(input, { target: { value: "testuser" } });
    expect(input.value).toBe("testuser");
  });
});

describe("Form Component - Submit behavior", () => {
  const mockStore = createStore(rootReducer);
  const mockDispatch = jest.fn();

  const data = [
    {
      name: "username",
      placeholder: "Username",
      validation: (value) => value !== "",
      error: "Username is required",
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("displays the error message when validation fails", () => {
    render(
      <Provider store={mockStore}>
        <Form data={data} />
      </Provider>
    );

    const submitButton = screen.getByRole("button", { name: /submit/i });
    fireEvent.click(submitButton);

    expect(screen.getByText("Username is required")).toBeInTheDocument();
  });

  it("does not dispatch to the store if there are validation errors", () => {
    mockStore.dispatch = mockDispatch;

    render(
      <Provider store={mockStore}>
        <Form data={data} />
      </Provider>
    );

    const submitButton = screen.getByRole("button", { name: /submit/i });
    fireEvent.click(submitButton);

    expect(mockDispatch).not.toHaveBeenCalled();
  });

  it("dispatches to the store when all fields are valid", () => {
    mockStore.dispatch = mockDispatch;
    window.alert = jest.fn();

    render(
      <Provider store={mockStore}>
        <Form data={data} />
      </Provider>
    );

    const input = screen.getByTestId("input-username");
    fireEvent.change(input, { target: { value: "testuser" } });

    const submitButton = screen.getByRole("button", { name: /submit/i });
    fireEvent.click(submitButton);

    expect(mockDispatch).toHaveBeenCalled();
    expect(mockDispatch).toHaveBeenCalledWith(
      setFields({ username: "testuser" })
    );
    expect(window.alert).toHaveBeenCalled();
  });
});
