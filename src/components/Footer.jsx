import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";
import { ButtonStyled } from "./ButtonStyled";

export default function Footer() {
	const { user } = useContext(UserContext);
	const logOut = () => {
		localStorage.clear();
	};
	return (
		<footer className="footer mt-auto py-3 bg-light d-flex justify-content-between">
			<span className="navbar-text ml-2">
				<strong>User:</strong> {user.firstName} {user.lastName},{" "}
				<strong>Email:</strong> {user.email}
			</span>
			<span className="nav-item">
				<Link to="/">
					<ButtonStyled onClick={logOut}>Log out</ButtonStyled>
				</Link>
			</span>
		</footer>
	);
}
