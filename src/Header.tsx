import styled from "styled-components";
import { BiHelpCircle, BiBarChartAlt2, BiBug } from "react-icons/bi";
import { HiOutlineLightBulb } from "react-icons/hi";

const Container = styled.div`
	height: 5em;
	width: 100vw;
	border-bottom: 2px solid #939b9f;
	left: 0px;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const Title = styled.div`
	font-weight: 700;
	font-size: 37px;
	line-height: 100%;
	letter-spacing: 0.01em;
	text-align: center;
	left: 0;
	right: 0;
	pointer-events: none;
`;

const Holder = styled.div`
	display: flex;
	align-items: centre;
	justify-content: space-between;
`;

const HelpHolder = styled.div`
	margin-left: 1.5em;
	font-size: 30px;

	&:hover {
		cursor: pointer;
	}
`;

const StatsHolder = styled.div`
	margin-right: 1.5em;
	font-size: 30px;

	&:hover {
		cursor: pointer;
	}
`;

type Props = {
	onHelp: () => void;
	onStats: () => void;
};

export const Header = ({ onHelp, onStats }: Props) => {
	function onHelpClick() {
		onHelp();
	}

	function onStatsClick() {
		onStats();
	}

	function onBugClick() {
		window.open("https://forms.gle/DfPqjBr1uXyW3Etb6");
	}

	function onIdeaClick() {
		window.open("https://forms.gle/cSsuVwrnzuqDmp3q7");
	}

	return (
		<div>
			<Container>
				<Holder>
					<HelpHolder onClick={onHelpClick}>
						<BiHelpCircle />
					</HelpHolder>
					<HelpHolder>
						<HiOutlineLightBulb onClick={onIdeaClick} />
					</HelpHolder>
				</Holder>
				<Title>Yordle</Title>
				<Holder>
					<StatsHolder>
						<BiBug onClick={onBugClick} />
					</StatsHolder>
					<StatsHolder onClick={onStatsClick}>
						<BiBarChartAlt2 />
					</StatsHolder>
				</Holder>
			</Container>
		</div>
	);
};
