/// <reference types="react-scripts" />
interface Row {
	answer: string;
	options: string[];
	flipped: boolean;
}

interface Question {
	title: string;
	rows: Row[];
	id: number;
}