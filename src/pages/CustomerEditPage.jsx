import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { UserContext } from "../context/UserContext";
import CustomerEditItem from "../components/CustomerEditItem";
import Loader from "../components/Loader";

export default function CustomerEditPage(props) {
	const { customerList } = useContext(UserContext);
	const customerId = props.match.params.id;
	const [customerItem, setCustomerItem] = useState(null);
	const history = useHistory();

	useEffect(() => {
		if (!customerList) {
			history.push("/home");
		} else {
			setCustomerItem(
				customerList.filter((customer) => customer.id === parseInt(customerId))[0]
			);
		}
	}, []);

	return (
		<div>
			<NavBar />
			<h1>Edit Customer</h1>
			{customerItem ? (
				<CustomerEditItem customerItem={customerItem} customerId={customerId} />
			) : (
				<Loader />
			)}
			<Footer />
		</div>
	);
}
