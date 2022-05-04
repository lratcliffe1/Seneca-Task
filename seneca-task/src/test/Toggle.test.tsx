import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import Toggle, { ToggleProps } from "../components/Toggle";
import questions from "../data";

const valueChangeCallback = jest.fn();
const rowIndex = 0;

const props = {
	options: questions[0].rows[rowIndex].options,
	answer: questions[0].rows[rowIndex].answer,
	valueChangeCallback,
	row: rowIndex,
	id: "1",
	locked: false,
	flipped: false,
};

const renderComponent = (newProps: ToggleProps | null) => {
	cleanup();
	render(<Toggle {...props} {...newProps} />);
};

test("Renders the toggle component with the correct options", () => {
	renderComponent(null);

	const options = screen.queryAllByTestId("option");
	expect(options.length).toEqual(questions[0].rows[rowIndex].options.length);
});

test("Calls the valueChangeCallback when an option is clicked, passing the selected row index and if the answer is correct", () => {
	renderComponent(null);

	const options = screen.queryAllByTestId("option");

	fireEvent.click(options[0]);
	expect(valueChangeCallback).toHaveBeenCalledTimes(1);
	expect(valueChangeCallback).toHaveBeenCalledWith(rowIndex, false);

	fireEvent.click(options[1]);
	expect(valueChangeCallback).toHaveBeenCalledTimes(2);
	expect(valueChangeCallback).toHaveBeenCalledWith(rowIndex, true);
});

test("Renders the animated option background when an option is selected", () => {
	renderComponent(null);

	const options = screen.queryAllByTestId("option");

	fireEvent.click(options[0]);
	expect(screen.getByTestId("optionBackground")).toBeInTheDocument();
});

test("Flips the component if specified by the props", () => {
	renderComponent(null);

	const toggle = screen.queryByTestId("toggle");
	expect(toggle?.className).toBe("Toggle ");

	renderComponent({ ...props, flipped: true });

	const toggleFlipped = screen.queryByTestId("toggle");
	expect(toggleFlipped?.className).toBe("Toggle Toggle__flipped");
});
