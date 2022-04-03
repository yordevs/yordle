import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { v4 as uuidv4 } from "uuid";

function App() {
	const [letterStateHistory, setLetterStateHistory] = useState<
		{ letter: string; colour: string }[][]
	>([]);
	const [guesses, setGuesses] = useState<string[]>(["hello", "there", "world"]);

	const [cookies, setCookie] = useCookies(["uuid"]);

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

		const letterMappings = data.map((colour, i) => {
			return { letter: guess[i], colour };
		});

		const prevMapping = letterStateHistory[letterStateHistory.length - 1];

		setLetterStateHistory([
			...letterStateHistory,
			{
				...prevMapping,
				...letterMappings,
			},
		]);
	}

	function addLetterToGuess(letter: string) {
		const currentGuess = guesses[guesses.length - 1];

		if (currentGuess.length >= 5) return;

		setGuesses([...guesses.slice(-2), currentGuess + letter]);
	}

	return (
		<div className="App">
			<h1>Hello, world!</h1>
		</div>
	);
}

export default App;
