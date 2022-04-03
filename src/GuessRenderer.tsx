import { useEffect } from "react";
import styled from "styled-components";

type Props = {
	guesses: string[];
	colorHistory: string[][];
};

interface ICell {
	getColour: string;
}

const Container = styled.div`
	display: flex;
	gap: 10px;
	flex-direction: column;
	align-items: center;
	width: 100%;

	padding: 10px 0;
`;

const Row = styled.div`
	display: flex;
	gap: 10px;
	width: 95%;
	justify-content: center;
	padding: 0 10px;
`;

const Cell = styled.div<ICell>`
	display: flex;
	justify-content: center;
	align-items: center;

	height: 75px;
	width: 75px;

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
				<Row key={row}>
					{[0, 1, 2, 3, 4].map((char) => (
						<Cell key={char} getColour={getLetterColour(row, char)}>
							{guesses[row] && guesses[row][char] ? guesses[row][char] : null}
						</Cell>
					))}
				</Row>
			))}
		</Container>
	);
}
