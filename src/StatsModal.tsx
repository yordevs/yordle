import { useEffect, useState } from "react";
import styled from "styled-components";
import { BiShareAlt } from "react-icons/bi";

import { Graph } from "./Graph";

/* eslint-disable  @typescript-eslint/no-non-null-assertion */

const Container = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: 100;

	width: 400px;
	max-width: 90vw;
	border-radius: 5px;

	background-color: white;
	box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.3), 0 6px 20px 0 rgba(0, 0, 0, 0.28);
	padding: 5px;

	display: grid;
	grid-template-columns: 2.5em 1fr 1fr 1fr 1fr 2.5em;
	grid-template-rows: 0.5em 2.5em auto auto auto;
	gap: 1em 0px;
	grid-template-areas:
		". . . . . ."
		". . . . . ."
		". . . . . ."
		". . . . . ."
		". . . . . .";
`;

const Header = styled.div`
	grid-column-start: 6;
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
	grid-column-end: 6;

	display: flex;
	justify-content: center;
	align-items: center;

	font-size: 25px;
`;

const StatHolder = styled.div`
	display: grid;
	grid-template-columns: auto;
	grid-template-rows: auto 2em;
	gap: 0px 0px;
	grid-template-areas:
		"."
		".";
	margin-bottom: 10px;
`;

const StatValue = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 40px;
`;

const StatName = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
`;

const Graphs = styled.div`
	grid-column-start: 2;
	grid-column-end: 6;

	display: flex;
	justify-content: center;
	align-items: center;

	font-size: 25px;
`;

const Countdown = styled.div`
	grid-column-start: 2;
	grid-column-end: 4;

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const CountdownText = styled.b`
	font-size: 25px;
`;

const ShareHolder = styled.div`
	grid-column-start: 4;
	grid-column-end: 6;

	display: flex;
	justify-content: center;
	align-items: center;
`;

const Share = styled.div`
	padding: 10px;
	border-radius: 5px;
	background-color: #6aaa64;
	color: #fff;

	display: flex;
	justify-content: space-between;
	align-items: center;

	&:hover {
		cursor: pointer;
	}
`;

type Props = {
	show: boolean;
	gameOver: boolean;
	colourHistory: string[][];
	numGuesses: number;
	gameWon: boolean;
	onHide: () => void;
};

export const StatsModal = ({
	show,
	gameOver,
	colourHistory,
	numGuesses,
	gameWon,
	onHide,
}: Props) => {
	const [seconds, setSeconds] = useState("");
	const [minutes, setMinutes] = useState("");
	const [hours, setHours] = useState("");
	const [distribution, setDistribution] = useState<number[]>();
	const [played, setPlayed] = useState(0);
	const [numWins, setNumWins] = useState(0);
	const [currentStreak, setCurrentStreak] = useState(0);
	const [maxStreak, setMaxStreak] = useState(0);

	function click(e: MouseEvent) {
		try {
			if (
				!document
					.getElementById("stats-modal")!
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

	function updateCounts() {
		const now = new Date();
		const night = new Date(
			now.getFullYear(),
			now.getMonth(),
			now.getDate() + 1,
			0,
			0,
			0,
		);
		const msTillMidnight = night.getTime() - now.getTime();
		const secTillMidnight = msTillMidnight / 1000;
		const secs = Math.floor(secTillMidnight % 60);
		const mins = Math.floor(secTillMidnight / 60) % 60;
		const hrs = Math.floor(secTillMidnight / (60 * 60));
		secs < 10 ? setSeconds(`0${secs.toString()}`) : setSeconds(secs.toString());
		mins < 10 ? setMinutes(`0${mins.toString()}`) : setMinutes(mins.toString());
		hrs < 10 ? setHours(`0${hrs.toString()}`) : setHours(hrs.toString());
	}

	async function share() {
		const now = new Date();
		const date = now.getDate() < 10 ? `0${now.getDate()}` : now.getDate();
		const month =
			now.getMonth() + 1 < 10 ? `0${now.getMonth() + 1}` : now.getMonth() + 1;
		const attemptString = gameWon ? `${numGuesses}/6` : "X/6";
		const guessStrings = colourHistory
			.map((guess) => {
				return guess
					.map((colour) => {
						if (colour === "green") {
							return "🦆";
						} else if (colour === "yellow") {
							return "🐤";
						} else {
							return "⬜";
						}
					})
					.join("");
			})
			.join("\n");
		const shareString =
			`Yordle ${date}/${month}  ${attemptString}\n\n` + guessStrings;
		+"\n\nhttps://yordle.co.uk";

		if (
			/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
				navigator.userAgent,
			)
		) {
			const shareData = {
				tile: "Yordle",
				text: shareString,
			};
			try {
				await navigator.share(shareData);
			} catch (err) {
				console.error(err);
			}
		} else {
			navigator.clipboard.writeText(shareString);
			alert("Text copied to clipboard");
		}
	}

	useEffect(() => {
		if (show) {
			window.addEventListener("click", click);
		}

		setDistribution(
			JSON.parse(localStorage.getItem("guessDistribution") || "[]"),
		);
		setPlayed(parseInt(localStorage.getItem("played") || "0"));
		setNumWins(parseInt(localStorage.getItem("numWins") || "0"));
		setCurrentStreak(parseInt(localStorage.getItem("currentStreak") || "0"));
		setMaxStreak(parseInt(localStorage.getItem("maxStreak") || "0"));
	}, [show]);

	useEffect(() => {
		setInterval(updateCounts, 1000);
	}, []);

	if (show) {
		return (
			<Container id="stats-modal">
				<Header
					onClick={() => {
						onHide();
						window.removeEventListener("click", click);
					}}>
					&times;
				</Header>
				<Title>Statistics</Title>
				<StatHolder style={{ gridColumnStart: 2 }}>
					<StatValue>{played}</StatValue>
					<StatName>Played</StatName>
				</StatHolder>
				<StatHolder>
					<StatValue>
						{played > 0 ? Math.floor((numWins / played) * 100) : 0}
					</StatValue>
					<StatName>Win %</StatName>
				</StatHolder>
				<StatHolder>
					<StatValue>{currentStreak}</StatValue>
					<StatName>Current Streak</StatName>
				</StatHolder>
				<StatHolder>
					<StatValue>{maxStreak}</StatValue>
					<StatName>Max Streak</StatName>
				</StatHolder>
				<Graphs>
					<Graph
						numGuesses={numGuesses}
						guessDistribution={distribution || []}
						gameWon={gameWon}
					/>
				</Graphs>
				{gameOver ? (
					<Countdown>
						Next Yordle <br />
						<CountdownText>
							{hours}:{minutes}:{seconds}
						</CountdownText>
					</Countdown>
				) : null}
				{gameOver ? (
					<ShareHolder>
						<Share onClick={share}>
							Share <BiShareAlt style={{ margin: "5px" }} />
						</Share>
					</ShareHolder>
				) : null}
			</Container>
		);
	} else {
		return null;
	}
};
