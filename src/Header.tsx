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

const IconHolder = styled.div`
	margin: 0.5em;
	font-size: 30px;

	&:hover {
		cursor: pointer;
	}
`;

const IconLinkHolder = styled.a`
	margin: 0.5em;
	font-size: 30px;
	color: #000;

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
				<Holder>
					<IconHolder onClick={onHelpClick}>
						<BiHelpCircle />
					</IconHolder>
					<IconLinkHolder
						href="https://forms.gle/cSsuVwrnzuqDmp3q7"
						target="_blank">
						<HiOutlineLightBulb />
					</IconLinkHolder>
				</Holder>
				<Title>Yordle</Title>
				<Holder>
					<IconLinkHolder
						href="https://forms.gle/DfPqjBr1uXyW3Etb6"
						target="_blank">
						<BiBug />
					</IconLinkHolder>
					<IconHolder onClick={onStatsClick}>
						<BiBarChartAlt2 />
					</IconHolder>
				</Holder>
			</Container>
		</div>
	);
};
