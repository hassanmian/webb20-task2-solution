import React, { useState, useContext, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { ButtonStyled, ButtonEditStyled } from "../components/ButtonStyled";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import NavBar from "../components/NavBar";
import { UserContext } from "../context/UserContext";
import { FrebiKit } from "../data/FrebiKit";

export default function CustomerCreatePage() {
	const {
		customerList,
		setCustomerList,
		getCustomerList,
		getUser,
		validateForm,
	} = useContext(UserContext);
	const [formData, setFormData] = useState({});
	const history = useHistory();

	useEffect(() => {
		if (!customerList) {
			getCustomerList();
			getUser();
		}
	}, []);

	const renderInput = (name, label, type) => {
		return (
			<div className="mb-3 form-group row">
				<label className="col-sm-2 col-form-label">{label}</label>
				<div className="col-sm-10">
					<input
						type={type || "text"}
						name={name}
						onChange={handleOnChange}
						value={formData[name] || ""}
						className="form-control"
					/>
				</div>
			</div>
		);
	};

	const handleOnChange = (e) => {
		const inputName = e.target.name;
		const inputValue = e.target.value;
		setFormData({ ...formData, [inputName]: inputValue });
	};

	//Create customer (formData), send to backend
	const handleOnSubmit = (e) => {
		e.preventDefault();
		if (validateForm(formData) === true) {
			FrebiKit.customer.create(formData)
				.then((res) => res.json())
				.then((data) => {
					setCustomerList([...customerList, data]);
					history.push("/home");
				});
		} else {
			alert(
				"Payment Term must be a natural number and VAT Nr must start with SE and after that 10 digits"
			);
		}
	};

	return (
		<div>
			<NavBar />
			{customerList ? (
				<div>
					<h2>Create Customer</h2>
					<form className="mb-3" onSubmit={handleOnSubmit}>
						{renderInput("name", "Customer Name")}
						{renderInput("email", "Customer Email", "email")}
						{renderInput("organisationNr", "Organisation Nr")}
						{renderInput("paymentTerm", "Payment Term", "number")}
						{renderInput("phoneNumber", "Phone Nr", "tel")}
						{renderInput("reference", "Reference")}
						{renderInput("vatNr", "VAT Nr")}
						{renderInput("website", "Website", "url")}

						<ButtonEditStyled type="submit">Create Customer</ButtonEditStyled>
						<Link to="/home">
							<ButtonStyled>Back</ButtonStyled>
						</Link>
					</form>

					<Footer />
				</div>
			) : (
				<Loader />
			)}
		</div>
	);
}
