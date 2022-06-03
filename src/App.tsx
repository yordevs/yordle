import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { v4 as uuidv4 } from "uuid";
import { Keyboard } from "./Keyboard";
import { GuessRenderer } from "./GuessRenderer";
import styled from "styled-components";
import "@fontsource/roboto";

import { GlobalStyle } from "./globalStyles";
import { Header } from "./Header";
import { StatsModal } from "./StatsModal";
import { HelpModal } from "./HelpModal";

/* eslint-disable  @typescript-eslint/no-non-null-assertion */

type ResponseBody = {
	valid: boolean;
	result?: Array<string>;
	answer?: string;
	description?: string;
};

export type LetterMapping = { [key: string]: string };

const Container = styled.div`
	max-width: 750px;
	margin: 0 auto;

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;

	height: 100%;
	width: 100%;
	max-height: 96vh; /* When 100vh goes of page?? */
`;

const InvalidHolder = styled.div`
	z-index: 200;
	position: absolute;
	top: 10em;
	left: 50%;
	transform: translate(-50%, -50%);
`;

const Invalid = styled.div`
	background-color: black;
	color: white;
	border-radius: 3px;
	padding: 5px;
`;

const AnswerHolder = styled.div`
	z-index: 200;
	position: absolute;
	top: 10em;
	left: 50%;
	transform: translate(-50%, -50%);
`;

const Answer = styled.div`
	background-color: black;
	color: white;
	border-radius: 3px;
	padding: 5px;
`;

function App() {
	const [letterStateHistory, setLetterStateHistory] = useState<LetterMapping>(
		{},
	);
	const [guesses, setGuesses] = useState<string[]>([]);
	const [guessNumber, setGuessNumber] = useState(0);
	const [gameOver, setGameOver] = useState(false);
	const [gameWon, setGameWon] = useState(false);
	const [cookies, setCookie] = useCookies(["uuid"]);
	const [currentGuess, setCurrentGuess] = useState("");
	const [colorHistory, setColorHistory] = useState<string[][]>([]);
	const [showInvalid, setShowInvalid] = useState(false);
	const [showStatsModal, setShowStatsModal] = useState(false);
	const [showHelpModal, setShowHelpModal] = useState(false);
	const [answer, setAnswer] = useState("");
	const [showAnswer, setShowAnswer] = useState(false);

	useEffect(() => {
		setGuesses((guesses) => [...guesses.slice(0, -1), currentGuess]);
	}, [currentGuess]);

	useEffect(() => {
		// Check if the user already has a UUID cookie on their machine, creating
		// one if not.
		if (!cookies.uuid) {
			setCookie("uuid", uuidv4(), { sameSite: "strict" });
		}

		const date = new Date();
		if (
			localStorage.getItem("lastGuess") ===
			`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
		) {
			setGuesses(JSON.parse(localStorage.getItem("guesses") || "[]"));
			setGuessNumber(parseInt(localStorage.getItem("guessNumber") || "0"));
			setGameOver(
				JSON.parse(localStorage.getItem("gameOver") || "false") == true,
			);
			setColorHistory(JSON.parse(localStorage.getItem("colorHistory") || "[]"));
			setLetterStateHistory(
				JSON.parse(localStorage.getItem("letterStates") || "{}"),
			);
		} else {
			setShowHelpModal(true);
		}
	}, []);

	function showStats() {
		setShowStatsModal(true);
		document.getElementById("main-container")!.style.filter = "blur(4px)";
	}

	function hideStats() {
		setShowStatsModal(false);
		document.getElementById("main-container")!.style.filter = "";
	}

	function showHelp() {
		setShowHelpModal(true);
		document.getElementById("main-container")!.style.filter = "blur(4px)";
	}

	function hideHelp() {
		setShowHelpModal(false);
		document.getElementById("main-container")!.style.filter = "";
	}

	function updateStats(win: boolean) {
		let distribution = JSON.parse(
			localStorage.getItem("guessDistribution") || "[]",
		);
		let played = parseInt(localStorage.getItem("played") || "0");
		let numWins = parseInt(localStorage.getItem("numWins") || "0");
		let currentStreak = parseInt(localStorage.getItem("currentStreak") || "0");
		let maxStreak = parseInt(localStorage.getItem("maxStreak") || "0");

		if (distribution.length === 0) {
			distribution = [0, 0, 0, 0, 0, 0];
		}
		distribution[guessNumber] = distribution[guessNumber] + 1;

		played = played + 1;
		if (win) {
			numWins = numWins + 1;
			currentStreak = currentStreak += 1;
			if (currentStreak > maxStreak) {
				maxStreak = currentStreak;
			}
		} else {
			currentStreak = 0;
		}

		localStorage.setItem("guessDistribution", JSON.stringify(distribution));
		localStorage.setItem("played", played.toString());
		localStorage.setItem("numWins", numWins.toString());
		localStorage.setItem("currentStreak", currentStreak.toString());
		localStorage.setItem("maxStreak", maxStreak.toString());
	}

	function storeState(id: string, value: string) {
		localStorage.setItem(id, value);
	}

	async function sendGuess() {
		if (currentGuess.length < 5) return;

		const res = await fetch("https://yordle.herokuapp.com/guess", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				guess: currentGuess,
				guessNumber: guessNumber,
				uuid: cookies.uuid,
			}),
		});

		const data: ResponseBody = await res.json();

		if (!data.valid) {
			setShowInvalid(true);
			setTimeout(() => {
				setShowInvalid(false);
			}, 2000);
			return;
		}

		const date = new Date();
		storeState(
			"lastGuess",
			`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`,
		);

		if (
			data.result?.filter(function (e) {
				return e !== "green";
			}).length === 0
		) {
			updateStats(true);
			setGameOver(true);
			storeState("gameOver", "true");
			setGameWon(true);
			setTimeout(showStats, 500);
			console.log(
				"The word was: " + currentGuess + ". Because: " + data.description,
			);
		}

		if (data.result) {
			setColorHistory([...colorHistory, data.result]);
			storeState(
				"colorHistory",
				JSON.stringify([...colorHistory, data.result]),
			);
		}

		// Map each colour from the response to its corresponding letter of the guess.
		const newLetterStates: LetterMapping = JSON.parse(
			JSON.stringify(letterStateHistory),
		);
		data.result?.forEach((colour, i) => {
			const letter = currentGuess[i];
			newLetterStates[letter] = colour;
		});

		setLetterStateHistory(newLetterStates);
		storeState("letterStates", JSON.stringify(newLetterStates));

		if (guessNumber + 1 === 6) {
			updateStats(false);
			setGameOver(true);
			storeState("gameOver", "true");
			setAnswer(data.answer || "");
			setShowAnswer(true);
			setTimeout(() => {
				setShowAnswer(false);
			}, 3000);
			showStats();
		}

		storeState("guessNumber", (guessNumber + 1).toString());
		setGuessNumber((prev) => prev + 1);

		storeState("guesses", JSON.stringify([...guesses, ""]));
		setGuesses([...guesses, currentGuess]);

		setCurrentGuess("");
	}

	function addLetterToGuess(letter: string) {
		// Ignore adding any new letters if the current guess is already 5 letters long.
		if (currentGuess.length >= 5) return;
		//takes current guess and adds on the latest added letter
		setCurrentGuess((prev) => prev + letter);
	}

	function removeLetterFromGuess() {
		// Ignore removing any letters if the current guess is already empty.
		if (currentGuess.length <= 0) return;
		// takes the current guess and removes the last letter
		setCurrentGuess((prev) => prev.slice(0, prev.length - 1));
	}

	return (
		<>
			<GlobalStyle />
			<div className="App">
				<InvalidHolder>
					{showInvalid ? <Invalid>Word not in list</Invalid> : null}
				</InvalidHolder>
				<AnswerHolder>
					{showAnswer ? <Answer>{answer}</Answer> : null}
				</AnswerHolder>
				<StatsModal
					show={showStatsModal}
					gameOver={gameOver}
					colourHistory={colorHistory}
					numGuesses={guessNumber}
					gameWon={gameWon}
					onHide={hideStats}
				/>
				<HelpModal show={showHelpModal} onHide={hideHelp} />
				<Container id="main-container">
					<Header onHelp={showHelp} onStats={showStats} />
					<GuessRenderer guesses={guesses} colorHistory={colorHistory} />
					<Keyboard
						addLetterToGuess={addLetterToGuess}
						sendGuess={sendGuess}
						removeLetterFromGuess={removeLetterFromGuess}
						letterStateHistory={letterStateHistory}
						gameOver={gameOver}
					/>
				</Container>
			</div>
		</>
	);
}

export default App;
