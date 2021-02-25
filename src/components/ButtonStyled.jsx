import styled from "styled-components";

export const ButtonStyled = styled.button`
	margin-right: 0.5rem;
	padding: 0.5rem;
	border: 1px solid #aaa;
	color: #fff
	display: inline-block;
	cursor: pointer;
	
	&:hover,
	&:focus {
		outline-color: #555;
	}
	&:active {
		position: relative;
		top: 1px;
	}
`;

export const ButtonEditStyled = styled(ButtonStyled)`
	background-color: #333;
	color: #fff;
	&:hover,
	&:focus {
	}
`;

export const ButtonDeleteStyled = styled(ButtonStyled)`
	color: #555;
	&:hover,
	&:focus {
		background-color: #c62d1f;
	}
`;