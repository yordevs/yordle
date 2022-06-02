import { useEffect } from "react";
import styled from "styled-components";

/* eslint-disable  @typescript-eslint/no-non-null-assertion */

type Props = {
	show: boolean;
	onHide: () => void;
};

const Container = styled.div`
	position: absolute;
	top: 45%;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: 100;

	width: 400px;
	border-radius: 5px;

	background-color: white;
	box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.3), 0 6px 20px 0 rgba(0, 0, 0, 0.28);
	padding: 5px;

	display: grid;
	grid-template-columns: 2.5em 1fr 2.5em;
	grid-template-rows: 0.5em auto auto auto auto;
	gap: 1em 0px;
	grid-template-areas:
		". . ."
		". . ."
		". . ."
		". . ."
		". . .";
`;

const CloseButton = styled.div`
	grid-column-start: 3;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 10px;

	font-size: 30px;

	&:hover {
		cursor: pointer;
	}
`;

const Title = styled.div`
	grid-column-start: 2;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 25px;
`;

const TextHolder = styled.div`
	grid-column-start: 2;
	display: flex;
	flex-direction: column;
	align-items: stretch;
`;

const Text = styled.p`
	margin-top: 0px;
	margin-bottom: 8px;
`;

const ExampleHolder = styled.div`
	grid-column-start: 2;
	padding: 10px;
	display: grid;
	grid-template-columns: 4em 1fr;
	grid-template-rows: 1.2em 4em 4em 4em;
	gap: 0.5em 0px;
	grid-template-areas:
		". ."
		". ."
		". ."
		". .";

	border-top: 1px solid black;
	border-bottom: 1px solid black;
`;

const ExampleTitle = styled.div`
	grid-column-start: 1;
	font-size: 18px;
`;

const Cell = styled.div`
	grid-column-start: 1;
	display: flex;
	justify-content: center;
	align-items: center;

	height: 80%;
	width: 80%;
	border-radius: 8px;

	color: white;
	font-size: 24px;
	font-weight: bold;
`;

const ExampleDescription = styled.div`
	grid-column-start: 2;
	display: flex;
	justify-conent: center;
	align-items: center;
`;

const Link = styled.a`
	color: #000;
	text-decoration: none;
	font-weight: bold;
`;

export const HelpModal = ({ show, onHide }: Props) => {
	function click(e: MouseEvent) {
		try {
			if (
				!document
					.getElementById("help-modal")!
					.contains(e.target as HTMLElement)
			) {
				onHide();
				window.removeEventListener("click", click);
			}
		} catch {
			console.error("Event listener was not removed");
			window.removeEventListener("click", click);
		}
	}

	useEffect(() => {
		if (show) {
			window.addEventListener("click", click);
		}
	}, [show]);

	if (show) {
		return (
			<Container id="help-modal">
				<CloseButton onClick={onHide}>&times;</CloseButton>
				<Title>How To Play</Title>
				<TextHolder>
					<Text>
						Guess the <b>YORDLE</b> in six tries.
					</Text>
					<Text>Every answer is a five letter word related to York.</Text>
					<Text>
						A guess can be any valid five-letter word. Hit the enter button to
						submit.
					</Text>
					<Text>
						After each guess, the color of the tiles will change to show how
						close your guess was to the word.
					</Text>
				</TextHolder>
				<ExampleHolder>
					<ExampleTitle>Examples</ExampleTitle>
					<Cell style={{ backgroundColor: "#66A060" }}>Y</Cell>
					<ExampleDescription>
						The letter Y is in the word and in the correct spot
					</ExampleDescription>
					<Cell style={{ backgroundColor: "#CEB02C" }}>O</Cell>
					<ExampleDescription>
						The letter O is in the word but in the wrong spot
					</ExampleDescription>
					<Cell style={{ backgroundColor: "#939B9F" }}>R</Cell>
					<ExampleDescription>
						The letter R is not in the word in any spot
					</ExampleDescription>
				</ExampleHolder>
				<TextHolder>
					<Text>A new Yordle will be available each day!</Text>
					<Text>
						<i>
							Made by <Link href="https://yordevs.com">Yordevs</Link>
						</i>
					</Text>
				</TextHolder>
			</Container>
		);
	} else {
		return null;
	}
};
