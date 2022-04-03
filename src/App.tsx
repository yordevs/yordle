import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { v4 as uuidv4 } from "uuid";
import { Keyboard } from "./Keyboard";
import { GuessRenderer } from "./GuessRenderer";
import styled from "styled-components";

type ResponseBody = {
	valid: boolean;
	result?: Array<string>;
	answer?: string;
	description?: string;
};

export type LetterMapping = { [key: string]: string };

const Container = styled.div`
	max-width: 960px;
	margin: 0 auto;
`;

function App() {
	const [letterStateHistory, setLetterStateHistory] = useState<LetterMapping[]>(
		[],
	);
	const [guesses, setGuesses] = useState<string[]>([]);
	const [guessNumber, setGuessNumber] = useState(0);
	const [cookies, setCookie] = useCookies(["uuid"]);
	const [currentGuess, setCurrentGuess] = useState("");
	const [colorHistory, setColorHistory] = useState<string[][]>([]);

	// Check if the user already has a UUID cookie on their machine, creating
	// one if not.
	useEffect(() => {
		if (!cookies.uuid) {
			setCookie("uuid", uuidv4(), { sameSite: "strict" });
		}
	}, []);

	useEffect(() => {
		setGuesses((guesses) => [...guesses.slice(0, -1), currentGuess]);
	}, [currentGuess]);

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
			console.log("This word is invalid");
			return;
		}

		if (data.answer) {
			console.log(
				"The word was: " + data.answer + ". Because: " + data.description,
			);
		}

		if (data.result) {
			setColorHistory([...colorHistory, data.result]);
		}

		const newMapping: LetterMapping = {};

		// Map each colour from the response to its corresponding letter of the guess.
		data.result?.forEach((colour, i) => {
			console.log(colour);

			const letter = currentGuess[i];

			newMapping[letter] = colour;
		});

		setLetterStateHistory([...letterStateHistory, newMapping]);

		setGuessNumber((prev) => prev + 1);
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
		<div className="App">
			<Container>
				<GuessRenderer guesses={guesses} colorHistory={colorHistory} />
				<Keyboard
					addLetterToGuess={addLetterToGuess}
					sendGuess={sendGuess}
					removeLetterFromGuess={removeLetterFromGuess}
					letterStateHistory={letterStateHistory}
				/>
			</Container>
		</div>
	);
}

export default App;
