import styled from "styled-components";

const Letters = styled.button`
	width: 8vw;
	max-width: 40px;
	height: 9vw;
	max-height: 58px;
	font-weight: bold;
	border-radius: 4px;
	margin: 3px;
	font-size: 24px;
	font-family: inherit;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Action = styled.button`
	width: 11vw;
	height: 9vw;
	max-width: 60px;
	max-height: 58px;
	font-weight: bold;
	border-radius: 4px;
	margin: 3px;
	font-size: 24px;
	font-family: inherit;
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
