import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import CustomerListItem from "../components/CustomerListItem";
import { UserContext } from "../context/UserContext";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { ButtonEditStyled } from "../components/ButtonStyled";
import Loader from "../components/Loader";

export default function CustomerListPage() {
	const {
		customerList,
		getCustomerList,
		getUser,
		isLoggedIn,
	} = useContext(UserContext);
	
	useEffect(() => {
		getCustomerList();
		getUser();
	}, []);

	return (
		<div>
			<NavBar />
			<h1>Customers</h1>
			{customerList ? (
				<div>
					<ul className="list-group">
						{customerList.map((item) => {
							return <CustomerListItem key={item.id} customerData={item} />;
						})}
					</ul>
					<div className="mt-2">
						<Link to="/home/create">
							<ButtonEditStyled>🎉 Create New</ButtonEditStyled>
						</Link>
					</div>
					<Footer />
				</div>
			) : (
				<Loader />
			)}
		</div>
	);
}
