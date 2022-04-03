import { useState } from "react";
import styled, { css } from "styled-components";

const Letters = styled.button`
	width: 40px;
	height: 58px;
	font-weight: bold;
	border-radius: 4px;
	margin: 3px;
	font-size: 24px;
	font-family: inherit;
`;

const Action = styled.button`
	width: 60px;
	height: 58px;
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
	const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
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
