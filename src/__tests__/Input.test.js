import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Input } from "../Input";

describe("Input", () => {
  it("renders without crashing", () => {
    render(<Input name="test" />);
  });

  it("displays the error message when error prop is provided", () => {
    render(<Input name="test" error="Test Error" />);
    expect(screen.getByText("Test Error")).toBeInTheDocument();
  });

  it("does not display an error div when error prop is not provided", () => {
    render(<Input name="test" />);
    expect(screen.queryByText("Test Error")).not.toBeInTheDocument();
  });

  it("calls onChange when input value changes", () => {
    const handleChange = jest.fn();
    render(
      <Input
        name="test"
        placeholder="Test Placeholder"
        onChange={handleChange}
      />
    );

    const input = screen.getByPlaceholderText("Test Placeholder");
    fireEvent.change(input, { target: { value: "Hello" } });
    expect(handleChange).toHaveBeenCalled();
  });
});
