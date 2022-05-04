import { useEffect, useRef, useState } from "react";
import "../styles/Toggle.css";

export interface ToggleProps {
	options: string[];
	answer: string;
	valueChangeCallback: (row: number, correct: boolean) => void;
	row: number;
	id: string;
	locked: boolean;
	flipped: boolean;
}

const Toggle = ({
	options,
	answer,
	valueChangeCallback,
	row,
	id,
	locked,
	flipped,
}: ToggleProps) => {
	const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
	const [transition, setTransition] = useState<string>("none");
	const [left, setLeft] = useState<number>(0);
	const [top, setTop] = useState<number>(0);
	const [readjusting, setReadjusting] = useState<boolean>(false);
	const toggleRef = useRef<HTMLHeadingElement>(null);

	const optionSelected = async (option: string, index: number) => {
		if (index !== selectedIndex) {
			valueChangeCallback(row, option === answer);
			setSelectedIndex(index);
		}
		if (transition === "none") {
			setTimeout(() => {
				setTransition("all 0.2s");
			}, 100);
		}
	};

	useEffect(() => {
		const handleResize = (disableAnimation: boolean) => {
			if (disableAnimation && transition === "all 0.2s") {
				setTimeout(() => {
					setTransition("all 0.2s");
				}, 100);
				setTransition("none");
			}
			setTimeout(() => {
				setReadjusting(false);
			}, 100);
			setReadjusting(true);
			if (toggleRef.current) {
				if (flipped) {
					setTop(
						(selectedIndex !== null &&
							toggleRef.current &&
							toggleRef.current.offsetTop +
								(selectedIndex * (toggleRef.current.clientHeight + 1)) /
									options.length) ||
							0
					);
				} else {
					setLeft(
						(selectedIndex !== null &&
							toggleRef.current &&
							toggleRef.current.offsetLeft +
								(selectedIndex * (toggleRef.current.clientWidth + 1)) /
									options.length) ||
							0
					);
				}
			}
		};

		window.addEventListener("resize", () => handleResize(true));
		handleResize(false);

		return () => window.removeEventListener("resize", () => handleResize(true));
	}, [selectedIndex, flipped, options.length, transition]);

	const animatedDivStyle = flipped
		? {
				height:
					(toggleRef.current &&
						toggleRef.current.clientHeight / options.length) ||
					0,
				width: (toggleRef.current && toggleRef.current.clientWidth) || 0,
				top,
		  }
		: {
				width:
					(toggleRef.current &&
						toggleRef.current.clientWidth / options.length) ||
					0,
				height: (toggleRef.current && toggleRef.current.clientHeight) || 0,
				left,
		  };

	const textOptionStyle = flipped
		? {
				height: "100%",
				width:
					(!readjusting &&
						toggleRef.current &&
						toggleRef.current.clientWidth) ||
					"100%",
		  }
		: {
				width: "100%",
				height:
					(!readjusting &&
						toggleRef.current &&
						toggleRef.current.clientHeight) ||
					"100%",
		  };

	return (
		<div
			data-testid="toggle"
			className={`Toggle ${flipped ? "Toggle__flipped" : ""}`}
			ref={toggleRef}
		>
			{options.map((option, index) => (
				<div
					data-testid="option"
					key={`${id}-${index}`}
					className={`Toggle__option-container${locked ? "-locked" : ""}`}
					style={textOptionStyle}
					onClick={() => (!locked ? optionSelected(option, index) : null)}
				>
					<p
						className="Toggle__option"
						style={{
							color: index === selectedIndex ? "rgb(159, 147, 139)" : "white",
						}}
					>
						{option}
					</p>
				</div>
			))}
			<div
				data-testid="optionBackground"
				className={`Toogle__background${
					left === 0 && top === 0 ? "-hide" : ""
				}`}
				style={{
					transition,
					borderRadius: flipped ? 0 : 30,
					...animatedDivStyle,
				}}
			/>
		</div>
	);
};

export default Toggle;
