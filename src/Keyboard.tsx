import { useState, useEffect } from "react";
import { Key } from "./Key";

export default function Keyboard() {
	useEffect(() => {
		// handle what happens on key press
		const handleKeyPress = (event: KeyboardEvent) => {
			console.log("Keyboard Press");
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
		console.log("Button Click");
		handleLetter(value.toUpperCase());
	};

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
			}}>
			<div
				style={{
					display: "flex",
					justifyContent: "center",
				}}>
				{["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"].map((key) => (
					<Key value={key} key={key} onClick={onClick} />
				))}
			</div>
			<div
				style={{
					display: "flex",
					justifyContent: "center",
				}}>
				{["A", "S", "D", "F", "G", "H", "J", "K", "L"].map((key) => (
					<Key value={key} key={key} onClick={onClick} />
				))}
			</div>
			<div
				style={{
					display: "flex",
					justifyContent: "center",
				}}>
				{["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BACKSPACE"].map(
					(key) => (
						<Key value={key} key={key} onClick={onClick} />
					),
				)}
			</div>
		</div>
	);
}

function removeLetterFromCurrentGuess() {
	throw new Error("Function not implemented.");
}
function sendGuess() {
	throw new Error("Function not implemented.");
}

function handleLetter(letter: string) {
	if (letter == "BACKSPACE") {
		removeLetterFromCurrentGuess();
	} else if (letter == "ENTER") {
		sendGuess();
	} else if (checkIfLetter(letter)) {
		console.log(letter);
	} else {
		console.log("Not a valid character");
	}
}

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
