import React, { useContext, useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import { UserContext } from "../context/UserContext";
import Footer from "../components/Footer";
import {
	ButtonStyled,
	ButtonEditStyled,
	ButtonDeleteStyled,
} from "../components/ButtonStyled";
import { FrebiKit } from "../data/FrebiKit";
import Loader from "../components/Loader";

export default function CustomerDetailPage(props) {
	const customerId = props.match.params.id;
	const { customerList, setCustomerList } = useContext(UserContext);
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

	const deleteCustomer = () => {
		FrebiKit.customer.delete(customerId)
		.then(() => {
			const newCustomerList = customerList.filter(
				(customer) => customer.id !== parseInt(customerId)
			);
			setCustomerList(newCustomerList);
			history.push("/home");
		});
	};

	return (
		<div>
			<NavBar />
			{customerItem ? (
				<div>
					<h3>{customerItem.name}</h3>
					<table className="table table-bordered">
						<tbody>
							<tr>
								<td className="table-secondary">Organisation Number</td>
								<td className="table-secondary">
									{customerItem.organisationNr}
								</td>
							</tr>
							<tr>
								<td className="table-secondary">Payment Term</td>
								<td className="table-secondary">{customerItem.paymentTerm}</td>
							</tr>
							<tr>
								<td className="table-secondary">Phone Number</td>
								<td className="table-secondary">{customerItem.phoneNumber}</td>
							</tr>
							<tr>
								<td className="table-secondary">Reference</td>
								<td className="table-secondary">{customerItem.reference}</td>
							</tr>
							<tr>
								<td className="table-secondary">VAT Number</td>
								<td className="table-secondary">{customerItem.vatNr}</td>
							</tr>
							<tr>
								<td className="table-secondary">Email</td>
								<td className="table-secondary">
									<a href={`mailto:${customerItem.email}`}>
										{customerItem.email}
									</a>
								</td>
							</tr>
							<tr>
								<td className="table-secondary">Website</td>
								<td className="table-secondary">
									<a href={customerItem.website} target="_blank">
										{customerItem.website}
									</a>
								</td>
							</tr>
						</tbody>
					</table>
					<ButtonDeleteStyled onClick={deleteCustomer}>
						🗑 Delete
					</ButtonDeleteStyled>
					<Link to={`/home/${customerId}/edit`}>
						<ButtonEditStyled>✍️ Edit</ButtonEditStyled>
					</Link>
					<Link to="/home">
						<ButtonStyled> 👈 Home</ButtonStyled>
					</Link>
					<Footer />
				</div>
			) : (
				<Loader />
			)}
		</div>
	);
}