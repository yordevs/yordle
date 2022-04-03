import { useEffect } from "react";

import type { LetterMapping } from "./App";

type Props = {
	guesses: string[];
	colorHistory: string[][];
};

export function GuessRenderer({ guesses, colorHistory }: Props) {
	useEffect(() => {
		console.log(colorHistory);
	}, [colorHistory]);

	function getLetterColour(guessNumber: number, letterIndex: number) {
		if (!colorHistory[guessNumber]) return "#efefef";

		return colorHistory[guessNumber][letterIndex];
	}

	return (
		<>
			<p>Guess Renderer words below here</p>
			<div>
				{[0, 1, 2, 3, 4, 5].map((row) => (
					<div
						key={row}
						style={{
							display: "flex",
							flexDirection: "row",
							gap: 5,
						}}>
						{[0, 1, 2, 3, 4].map((char) => (
							<div
								key={char}
								style={{
									padding: 15,
									border: "2px solid #1d1d1d",
									backgroundColor: getLetterColour(row, char),
								}}>
								{guesses[row] && guesses[row][char] ? (
									<span style={{}}>{guesses[row][char]}</span>
								) : null}
							</div>
						))}
					</div>
				))}
			</div>
		</>
	);
}
