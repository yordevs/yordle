import styled from "styled-components";

const Letters = styled.button`
	display: flex;
	justify-content: center;
	align-items: center;

	width: 8vw;
	max-width: 40px;
	height: 9vw;
	max-height: 58px;

	border-radius: 4px;
	margin: 3px;

	font-weight: bold;
	font-size: 24px;
	font-family: inherit;
	color: black;
`;

const Action = styled.button`
	display: flex;
	color: black;
	justify-content: center;
	align-items: center;

	width: 11vw;
	height: 9vw;
	max-width: 60px;
	max-height: 58px;
	border-radius: 4px;
	margin: 3px;

	font-weight: bold;
	font-size: 24px;
	font-family: inherit;
	color: black;
`;

type Props = {
	value: string;
	onClick: (value: string) => void;
	colour: string;
};

export const Key = ({ value, onClick, colour }: Props) => {
	const handleClick: React.MouseEventHandler<HTMLButtonElement> = () => {
		onClick(value);
	};

	if (value === "↵" || value === "🠔") {
		return <Action onClick={handleClick}>{value}</Action>;
	} else {
		return (
			<Letters onClick={handleClick} style={{ background: colour }}>
				{value}
			</Letters>
		);
	}
};
