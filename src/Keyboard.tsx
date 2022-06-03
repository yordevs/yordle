import { useEffect } from "react";
import { Key } from "./Key";
import type { LetterMapping } from "./App";
import styled from "styled-components";

type Props = {
	sendGuess: () => void;
	addLetterToGuess: (letter: string) => void;
	removeLetterFromGuess: () => void;
	letterStateHistory: LetterMapping;
	gameOver: boolean;
};

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;

	width: 80vw;
	max-width: 400px;
`;

const Row = styled.div`
	display: flex;
	width: 100%;
	justify-content: center;
`;

export const Keyboard = ({
	sendGuess,
	addLetterToGuess,
	removeLetterFromGuess,
	letterStateHistory,
	gameOver,
}: Props) => {
	useEffect(() => {
		// handle what happens on key press
		const handleKeyPress = (event: KeyboardEvent) => {
			if (!gameOver) {
				handleLetter(event.key.toUpperCase());
			}
		};

		// attach the event listener
		document.addEventListener("keydown", handleKeyPress);

		// remove the event listener
		return () => {
			document.removeEventListener("keydown", handleKeyPress);
		};
	});

	const onClick = (value: string) => {
		// call back to handle what happens on button press
		if (!gameOver) {
			handleLetter(value.toUpperCase());
		}
	};

	function handleLetter(letter: string) {
		// handle the different key types: Backspace, Enter, Letter, Other
		if (letter === "🠔" || letter === "BACKSPACE") {
			removeLetterFromGuess();
		} else if (letter == "↵" || letter == "ENTER") {
			sendGuess();
		} else if (checkIfLetter(letter)) {
			addLetterToGuess(letter);
		} else {
			console.log("Not a valid character"); //TODO Do we just continue on and ignore it? or should be alert the user that that is not a valid key
		}
	}

	function updateKeyboardColour(letter: string) {
		const colors: { [key: string]: string } = {
			yellow: "#CEB02C",
			green: "#66A060",
			grey: "#939B9F",
		};

		if (letter in letterStateHistory) {
			return colors[letterStateHistory[letter]];
		}
		return "#efefef";
	}

	return (
		<Container>
			<Row>
				{["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"].map((key) => (
					<Key
						value={key}
						key={key}
						onClick={onClick}
						colour={updateKeyboardColour(key)}
					/>
				))}
			</Row>
			<Row>
				{["A", "S", "D", "F", "G", "H", "J", "K", "L"].map((key) => (
					<Key
						value={key}
						key={key}
						onClick={onClick}
						colour={updateKeyboardColour(key)}
					/>
				))}
			</Row>
			<Row>
				{["↵", "Z", "X", "C", "V", "B", "N", "M", "🠔"].map((key) => (
					<Key
						value={key}
						key={key}
						onClick={onClick}
						colour={updateKeyboardColour(key)}
					/>
				))}
			</Row>
		</Container>
	);
};

function checkIfLetter(letter: string) {
	const letters = [
		"A",
		"B",
		"C",
		"D",
		"E",
		"F",
		"G",
		"H",
		"I",
		"J",
		"K",
		"L",
		"M",
		"N",
		"O",
		"P",
		"Q",
		"R",
		"S",
		"T",
		"U",
		"V",
		"W",
		"X",
		"Y",
		"Z",
	];
	return letters.indexOf(letter) >= 0 ? true : false;
}
