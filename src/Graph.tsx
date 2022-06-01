import { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
	display: grid;
	grid-template-columns: 1em 1fr;
	grid-template-rows: 1em auto auto auto auto auto auto;
	gap: 5px 0px;
	grid-template-areas:
		". ."
		". ."
		". ."
		". ."
		". ."
		". ."
		". .";
	width: 100%;
	font-size: 20px;
`;

const Title = styled.div`
	grid-column-start: 1;
	grid-column-end: 3;

	display: flex;
	justify-content: center;
	align-items: center;

	margin-bottom: 10px;
`;

const Label = styled.div`
	grid-column-start: 1;

	display: flex;
	justify-content: center;
	align-items: center;
`;

const BarHolder = styled.div`
	grid-column-start: 2;
	text-align: right;
	width: 100%;
	background-color: #86888a;
	color: #fff;
`;

const BarText = styled.p`
	margin-right: 5px;
	margin-top: 0px;
	margin-bottom: 0px;
`;

const NoDataHolder = styled.div`
	grid-column-start: 1;
	grid-column-end: 3;

	display: flex;
	justify-content: center;
	align-items: center;

	font
	font-size: 18px;
`;

type Props = {
	numGuesses: number;
	guessDistribution: number[];
	gameWon: boolean;
};

export const Graph = ({ numGuesses, guessDistribution, gameWon }: Props) => {
	const [max, setMax] = useState(0);

	useEffect(() => {
		Math.max.apply(this, guessDistribution) == 0
			? setMax(1)
			: setMax(Math.max.apply(this, guessDistribution));
	}, [guessDistribution]);

	return (
		<Container>
			<Title>Guess Distribution</Title>
			{guessDistribution.length > 0 ? (
				guessDistribution.map((val, num) => {
					const width = Math.floor((val / max) * 90);
					const colour =
						num + 1 === numGuesses && gameWon ? "#6aaa64" : "#86888a";
					return (
						<>
							<Label>{num + 1}</Label>
							<BarHolder
								id={`guess-${num}`}
								style={{ width: `${10 + width}%`, backgroundColor: colour }}>
								<BarText>{val}</BarText>
							</BarHolder>
						</>
					);
				})
			) : (
				<NoDataHolder>No Data</NoDataHolder>
			)}
		</Container>
	);
};
