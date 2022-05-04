import { useEffect, useState } from "react";
import Toggle from "./Toggle";
import "../styles/Question.css";

export interface QuestionProps {
	question: Question;
	correctAnswerCallback: () => void;
	locked: boolean;
}

const Question = ({
	question,
	correctAnswerCallback,
	locked,
}: QuestionProps) => {
	const [correctAnswers, setCorrectAnswers] = useState<number[]>([]);
	const [percentageCorrect, setPercentageCorrect] = useState<number>(0);

	const updatePercentageCorrect = (row: number, correct: boolean) => {
		const newCorrectAnswers = correct
			? [...correctAnswers, row]
			: correctAnswers.filter((answer) => answer !== row);

		setCorrectAnswers(newCorrectAnswers);
		setPercentageCorrect(
			(newCorrectAnswers.length / question.rows.length) * 100
		);
	};

	useEffect(() => {
		if (percentageCorrect === 100) {
			correctAnswerCallback();
		}
	}, [percentageCorrect, correctAnswerCallback]);

	useEffect(() => {
		setPercentageCorrect(0);
		setCorrectAnswers([]);
	}, [question.title]);

	return (
		<div
			data-testid="question"
			className="Question"
			style={{
				background:
					percentageCorrect === 100
						? "linear-gradient(rgb(118, 224, 194), rgb(89, 202, 218))"
						: `linear-gradient(
							rgb(246, ${percentageCorrect + 164}, 104),
							rgb(238, ${percentageCorrect + 87}, 45))`,
			}}
		>
			<h1 data-testid="title">{question.title}</h1>
			{question.rows.map((row, index) => (
				<div
					className="Question__toggle-container"
					key={`${question.id}-${index}`}
					data-testid="row"
				>
					<Toggle
						id={`${question.id}-${index}`}
						answer={row.answer}
						options={row.options}
						valueChangeCallback={updatePercentageCorrect}
						row={index}
						locked={locked}
						flipped={row.flipped}
					/>
				</div>
			))}
			<h4>
				The answer is {percentageCorrect === 100 ? "correct" : "incorrect"}
			</h4>
		</div>
	);
};

export default Question;
