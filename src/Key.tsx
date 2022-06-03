import styled from "styled-components";
import { FiDelete } from "react-icons/fi";
import { AiOutlineEnter } from "react-icons/ai";

const Letters = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;

	width: 5vw;
	max-width: 40px;
	height: 9vw;
	max-height: 58px;

	border-radius: 4px;
	border: 1px solid black;
	margin: 3px;

	font-weight: bold;
	font-size: 24px;
	font-family: inherit;
	color: black;

	&:hover {
		cursor: pointer;
	}
`;

const Action = styled.div`
	display: flex;
	color: black;
	justify-content: center;
	align-items: center;

	width: 11vw;
	height: 9vw;
	max-width: 60px;
	max-height: 58px;

	border-radius: 4px;
	border: 1px solid black;
	margin: 3px;

	font-weight: bold;
	font-size: 24px;
	font-family: inherit;
	color: black;

	&:hover {
		cursor: pointer;
	}
`;

type Props = {
	value: string;
	onClick: (value: string) => void;
	colour: string;
};

export const Key = ({ value, onClick, colour }: Props) => {
	function handleClick() {
		onClick(value);
	}

	if (value === "↵") {
		return (
			<Action onClick={handleClick} style={{ backgroundColor: colour }}>
				<AiOutlineEnter />
			</Action>
		);
	} else if (value == "🠔") {
		return (
			<Action onClick={handleClick} style={{ backgroundColor: colour }}>
				<FiDelete />
			</Action>
		);
	} else {
		return (
			<Letters onClick={handleClick} style={{ backgroundColor: colour }}>
				{value}
			</Letters>
		);
	}
};
