import { useCallback, useMemo, useState } from "react";
import "./App.css";
import Question from "./components/Question";
import questions from "./data";

const randomisedQuestions = questions.sort(() => Math.random() - 0.5);

function App() {
	const [questionNumber, setQuestionNumber] = useState<number>(0);
	const [lockQuestion, setLockQuestion] = useState<boolean>(false);
	const randomisedQuestion = useMemo<Question>(
		() => ({
			...randomisedQuestions[questionNumber],
			rows: randomisedQuestions[questionNumber].rows.sort(
				() => Math.random() - 0.5
			),
		}),
		[questionNumber]
	);

	const toNextQuestion = () => {
		questionNumber === randomisedQuestions.length - 1
			? setQuestionNumber(0)
			: setQuestionNumber(questionNumber + 1);
		setLockQuestion(false);
	};

	const handleCorrectAnswer = useCallback(() => setLockQuestion(true), []);

	return (
		<div className="App" data-testid="questionWrapper">
			<Question
				question={randomisedQuestion}
				correctAnswerCallback={handleCorrectAnswer}
				locked={lockQuestion}
			/>
			{lockQuestion && (
				<button data-testid="nextQuestionButton" onClick={toNextQuestion}>
					To Next Question
				</button>
			)}
		</div>
	);
}

export default App;
