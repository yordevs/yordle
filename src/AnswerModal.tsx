import styled from "styled-components";

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

	display: flex;
	flex-direction: column;
	align-items: center;
`;

const TextHolder = styled.div`
	width: 80%;
	margin: 10px;
	font-size: 18px;
`;

const Text = styled.p`
	margin: 5px;
`;

const GoToButton = styled.div`
	background-color: #66a060;
	color: #fff;
	padding: 15px;
	border-radius: 5px;
	margin: 10px;

	&:hover {
		cursor: pointer;
	}
`;

type Props = {
	answer: string;
	description: string;
	show: boolean;
	onHide: () => void;
};

export const AnswerModal = ({ answer, description, show, onHide }: Props) => {
	if (show) {
		return (
			<Container>
				<TextHolder>
					<Text>
						<b>Answer</b>
					</Text>
					<Text>{answer}</Text>
				</TextHolder>
				<TextHolder>
					<Text>
						<b>Description</b>
					</Text>
					<Text>{description}</Text>
				</TextHolder>

				<GoToButton onClick={onHide}>Go To Stats</GoToButton>
			</Container>
		);
	} else {
		return null;
	}
};
