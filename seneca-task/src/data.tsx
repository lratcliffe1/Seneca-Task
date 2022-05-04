const questions: Question[] = [
	{
		title: "An animal cell contains:",
		rows: [
			{
				answer: "Ribosomes",
				options: ["Cell wall", "Ribosomes"],
				flipped: false,
			},
			{
				answer: "Cytoplasm",
				options: ["Cytoplasm", "Chloroplast"],
				flipped: false,
			},
			{
				answer: "Partially permeable membrane",
				options: ["Partially permeable membrane", "Impermeable membrane"],
				flipped: false,
			},
			{
				answer: "Mitochondria",
				options: ["Cellulose", "Mitochondria"],
				flipped: false,
			},
		],
		id: 1,
	},
	{
		title:
			"Question with more rows, more options per row, flipped rows and longer options:",
		rows: [
			{ answer: "option 1", options: ["option 1", "option 2"], flipped: false },
			{
				answer: "option 1",
				options: ["option 1", "option 2", "option 3"],
				flipped: false,
			},
			{
				answer: "option 1",
				options: [
					"option 1",
					"a really long option 2 with lots and lots of text to test the limits of the component",
					"option 3",
				],
				flipped: false,
			},
			{
				answer: "option 1",
				options: ["option 1", "a long option 2 with lots of text"],
				flipped: false,
			},
			{
				answer: "option 1",
				options: [
					"option 1",
					"a really long option 2 with lots and lots of text to test the limits of the component",
					"option 3",
				],
				flipped: true,
			},
			{ answer: "option 1", options: ["option 1", "option 2"], flipped: true },
			{
				answer: "option 1",
				options: [
					"option 1",
					"a really long option 2 with lots and lots of text to test the limits of the component",
					"option 3",
					"option 4",
				],
				flipped: false,
			},
		],
		id: 2,
	},
];

export default questions;
