import { useState, useEffect } from "react";
import { Key } from "./Key";
import type { LetterMapping } from "./App";

type Props = {
	sendGuess: () => void;
	addLetterToGuess: (letter: string) => void;
	removeLetterFromGuess: () => void;
	letterStateHistory: LetterMapping[];
};

export const Keyboard = ({
	sendGuess,
	addLetterToGuess,
	removeLetterFromGuess,
	letterStateHistory,
}: Props) => {
	useEffect(() => {
		// handle what happens on key press
		const handleKeyPress = (event: KeyboardEvent) => {
			handleLetter(event.key.toUpperCase());
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
		handleLetter(value.toUpperCase());
	};

	function handleLetter(letter: string) {
		// handle the different key types: Backspace, Enter, Letter, Other
		if (letter === "🠔" || letter === "BACKSPACE") {
			removeLetterFromGuess();
		} else if (letter == "↵" || letter == "ENTER") {
			sendGuess();
		} else if (checkIfLetter(letter)) {
			console.log(letter);
			addLetterToGuess(letter);
		} else {
			console.log("Not a valid character"); //TODO Do we just continue on and ignore it? or should be alert the user that that is not a valid key
		}
	}

	function updateKeyboardColour(letter: string) {
		letterStateHistory.map((element) => {
			if (element[letter] !== null) {
				return element[letter];
			}
		});
		return "";
	}

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
			}}>
			<div>
				{["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"].map((key) => (
					<Key
						value={key}
						key={key}
						onClick={onClick}
						colour={updateKeyboardColour(key)}
					/>
				))}
			</div>
			<div>
				{["A", "S", "D", "F", "G", "H", "J", "K", "L"].map((key) => (
					<Key
						value={key}
						key={key}
						onClick={onClick}
						colour={updateKeyboardColour(key)}
					/>
				))}
			</div>
			<div>
				{["↵", "Z", "X", "C", "V", "B", "N", "M", "🠔"].map((key) => (
					<Key
						value={key}
						key={key}
						onClick={onClick}
						colour={updateKeyboardColour(key)}
					/>
				))}
			</div>
		</div>
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
