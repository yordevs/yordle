import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { v4 as uuidv4 } from "uuid";

function App() {
	const [letterStateHistory, setLetterStateHistory] = useState<
		{ letter: string; colour: string }[][]
	>([]);
	const [guesses, setGuesses] = useState<string[]>(["hello", "there", "world"]);
	const [cookies, setCookie] = useCookies(["uuid"]);

	// Check if the user already has a UUID cookie on their machine, creating
	// one if not.
	useEffect(() => {
		if (!cookies.uuid) {
			setCookie("uuid", uuidv4(), { sameSite: "strict" });
		}
	}, []);

	async function sendGuess(guess: string, guessNumber: number) {
		const res = await fetch("URL/guess", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				guess: guess,
				guessNumber: guessNumber,
				uuid: cookies.uuid,
			}),
		});

		const data: string[] = await res.json();

		// Map each colour from the response to its corresponding letter of the guess.
		const letterMappings = data.map((colour, i) => {
			return { letter: guess[i], colour };
		});

		// Retrieve the most recent version of the letter mappings.
		const prevMapping = letterStateHistory[letterStateHistory.length - 1];

		// Create an updated version of the letter mapping with this new information.
		const newMapping = { ...prevMapping, ...letterMappings };

		setLetterStateHistory([...letterStateHistory, newMapping]);

		// Add new (empty) entry for the next guess.
		setGuesses([...guesses, ""]);
	}

	function addLetterToGuess(letter: string) {
		const currentGuess = guesses[guesses.length - 1];

		// Ignore adding any new letters if the current guess is already 5 letters long.
		if (currentGuess.length >= 5) return;

		// Otherwise, append the letter to the current guess.
		setGuesses([...guesses.slice(-2), currentGuess + letter]);
	}

	return (
		<div className="App">
			<h1>Hello, world!</h1>
		</div>
	);
}

export default App;
