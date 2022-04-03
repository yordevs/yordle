type Props = {
	value: string;
	onClick: (value: string) => void;
};

export const Key = ({ value, onClick }: Props) => {
	const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
		onClick(value);
	};

	return <button onClick={handleClick}>{value}</button>;
};
