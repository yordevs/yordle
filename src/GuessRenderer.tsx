import styled from "styled-components";

type Props = {
	guesses: string[];
	colorHistory: string[][];
};

interface ICell {
	getColour: string;
	getColumn: string;
}

const Container = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
	grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr;
	gap: 2vw 1vw;
	grid-template-areas:
		". . . . ."
		". . . . ."
		". . . . ."
		". . . . ."
		". . . . ."
		". . . . .";

	width: 80vw;
	max-width: 500px;
`;

const Cell = styled.div<ICell>`
	z-index: 10;
	display: flex;
	justify-content: center;
	align-items: center;

	aspect-ratio: 1;

	background-color: #efefef;
	background-color: ${(props) => props.getColour};
	border-radius: 8px;

	color: white;
	font-size: 24px;
	font-weight: bold;
`;

export function GuessRenderer({ guesses, colorHistory }: Props) {
	function getLetterColour(guessNumber: number, letterIndex: number) {
		if (!colorHistory[guessNumber]) return "#939B9F70";

		const colors: { [key: string]: string } = {
			yellow: "#CEB02C",
			green: "#66A060",
			grey: "#939B9F",
		};

		return colors[colorHistory[guessNumber][letterIndex]];
	}

	return (
		<Container>
			{[0, 1, 2, 3, 4, 5].map((row) => (
				<>
					{[0, 1, 2, 3, 4].map((char) => {
						//console.log(guesses);
						return (
							<Cell
								key={char}
								getColour={getLetterColour(row, char)}
								getColumn={char.toString()}>
								{guesses[row] && guesses[row][char] ? guesses[row][char] : null}
							</Cell>
						);
					})}
				</>
			))}
		</Container>
	);
}
