import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import App from "../App";
import { legacy_createStore as createStore } from "redux";
import rootReducer from "../store/reducer";

jest.mock("../Form", () => (data) => (
  <div data-testid="mock-form">{JSON.stringify(data)}</div>
));

describe("App Component", () => {
  let store;
  let originalConsoleLog;
  let originalConsoleTable;

  beforeEach(() => {
    store = createStore(rootReducer);

    originalConsoleLog = console.log;
    originalConsoleTable = console.table;
    console.log = jest.fn();
    console.table = jest.fn();
  });

  afterEach(() => {
    console.log = originalConsoleLog;
    console.table = originalConsoleTable;
  });

  it("logs the store state when it changes", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    store.dispatch({ type: "SET_FIELDS", payload: "mockedPayload" });

    expect(console.log).toHaveBeenCalledWith(
      "Store contains following values:"
    );
    expect(console.table).toHaveBeenCalledWith("mockedPayload");
  });
});
