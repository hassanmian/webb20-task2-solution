import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import { FrebiKit } from "./data/FrebiKit";
import CustomerCreatePage from "./pages/CustomerCreatePage";
import CustomerDetailPage from "./pages/CustomerDetailPage";
import CustomerEditPage from "./pages/CustomerEditPage";
import CustomerListPage from "./pages/CustomerListPage";
import LoginPage from "./pages/LoginPage";

export default function App() {
	const [customerList, setCustomerList] = useState(null);
	const [user, setUser] = useState({});
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	
	const getCustomerList = () => {
		FrebiKit.getCustomerList()
			.then((res) => res.json())
			.then((data) => setCustomerList(data.results));
	};

	const getUser = () => {
		FrebiKit.getUser()
			.then((res) => res.json())
			.then((data) => setUser(data));
	};

	const validateForm = (data) => {
		if (data.vatNr && data.paymentTerm) {
			const number = data.paymentTerm;
			const paymentTerm = number.toString();
			const vatNr = data.vatNr;
			const start = vatNr.slice(0, 2);
			const afterSE = vatNr.slice(2);
			if (
				afterSE.length === 10 &&
				start === "SE" &&
				!isNaN(afterSE) &&
				paymentTerm !== "" &&
				paymentTerm.slice(0, 1) !== "-"
			) {
				return true;
			}
		} else {
			return false;
		}
	};

	const userContextValue = {
		customerList,
		setCustomerList,
		user,
		setUser,
		getCustomerList,
		getUser,
		isLoggedIn,
		setIsLoggedIn,
		validateForm,
	};

	return (
		<div className="container">
			<UserContext.Provider value={userContextValue}>
				<Switch>
					<Route path="/home/create">
						<CustomerCreatePage />
					</Route>
					<Route path="/home/:id/edit" component={CustomerEditPage} />
					<Route path="/home/:id" component={CustomerDetailPage} />
					<Route path="/home">
						<CustomerListPage />
					</Route>
					<Route path="/">
						<LoginPage />
					</Route>
				</Switch>
			</UserContext.Provider>
		</div>
	);
}
