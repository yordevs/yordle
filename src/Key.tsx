import { useState } from "react";

type Props = {
	value: string;
	onClick: (value: string) => void;
	colour: string;
};

export const Key = ({ value, onClick, colour }: Props) => {
	const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
		onClick(value);
	};

	return (
		<button onClick={handleClick} style={{ background: colour }}>
			{value}
		</button>
	);
};
