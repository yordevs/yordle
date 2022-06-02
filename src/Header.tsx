import styled from "styled-components";
import { BiHelpCircle, BiBarChartAlt2 } from "react-icons/bi";

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

	return (
		<div>
			<Container>
				<HelpHolder onClick={onHelpClick}>
					<BiHelpCircle />
				</HelpHolder>
				<Title>Yordle</Title>
				<StatsHolder onClick={onStatsClick}>
					<BiBarChartAlt2 />
				</StatsHolder>
			</Container>
		</div>
	);
};
