import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { ButtonStyled } from "../components/ButtonStyled";
import { UserContext } from "../context/UserContext";
import { FrebiKit, setToken } from "../data/FrebiKit";

export default function LoginPage() {
    const { getCustomerList, getUser, setIsLoggedIn } = useContext(UserContext);
    const [formData, setFormData] = useState({
        email: "webb19@willandskill.se",
        password: "javascriptoramverk",
    });
    const history = useHistory();

    const handleOnChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();
        const payload = {
            email: formData.email,
            password: formData.password,
        };
        FrebiKit.login(payload)
            .then((res) => res.json())
            .then((data) => {
                setToken(data.token)
                setIsLoggedIn(true);
                history.push("/home");
            });
    };

    return (
        <div>
            <h2>CRM</h2>
            <h4>Log in</h4>
            <form onSubmit={handleOnSubmit}>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        name="email"
                        value={formData.email}
                        onChange={handleOnChange}
                        type="text"
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                        name="password"
                        value={formData.password}
                        onChange={handleOnChange}
                        type="text"
                        className="form-control"
                    />
                </div>
                <ButtonStyled type="submit">Log in</ButtonStyled>
            </form>
        </div>
    );
}
