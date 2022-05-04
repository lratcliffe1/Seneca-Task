import { render, screen, fireEvent } from "@testing-library/react";
import Question, { QuestionProps } from "../components/Question";
import questions from "../data";

const correctAnswerCallback = jest.fn();

const props = {
	question: questions[0],
	correctAnswerCallback,
	locked: false,
};

const renderComponent = (newProps: QuestionProps | null) => {
	render(<Question {...props} {...newProps} />);
};

test("Renders the question component", () => {
	renderComponent(props);

	const title = screen.queryByTestId("title");
	const rows = screen.queryAllByTestId("row");
	expect(title?.textContent).toEqual(questions[0].title);
	expect(rows.length).toEqual(questions[0].rows.length);
});

test("Calls the correctAnswerCallback once all rows are correct", () => {
	renderComponent({ ...props, question: questions[1] });
	const buttons = screen.queryAllByTestId("option");

	expect(correctAnswerCallback).not.toHaveBeenCalled();

	buttons.forEach((button) =>
		button.textContent === "option 1" ? fireEvent.click(button) : null
	);

	expect(correctAnswerCallback).toHaveBeenCalledTimes(1);
});
