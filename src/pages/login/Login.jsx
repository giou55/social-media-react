import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import "./login.css";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Login() {
	const email = useRef();
	const password = useRef();
	const [errorMessage, setErrorMessage] = useState("");
	const dispatch = useDispatch();

	const API_URL = process.env.REACT_APP_API_URL;

	const login = async (e) => {
		e.preventDefault();
		const userCredentials = {
			email: email.current.value,
			password: password.current.value,
		};
		try {
			const res = await axios.post(API_URL + "/auth/login", userCredentials);
			dispatch({ type: "LOGIN", payload: res.data });
			localStorage.setItem("userId", res.data.userId);
			localStorage.setItem("token", res.data.token);
			localStorage.setItem("isLoggedIn", "true");
			// if (res.data.message !== "") {
			// 	setErrorMessage(res.data.message);
			// } else {
			// 	setErrorMessage("");
			// 	authCtx.login(res.data);
			// }
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className="login">
			<div className="loginWrapper">
				<div className="loginLeft">
					<h3 className="loginLogo">Friendbook</h3>
					<span className="loginDesc">
						Connect with friends and the world around you on
						Friendbook.
					</span>
				</div>
				<div className="loginRight">
					<form className="loginBox" onSubmit={login}>
						<label htmlFor="email">
							<b>Email</b>
						</label>
						<input
							type="email"
							name="email"
							id="email"
							required
							className="loginInput"
							ref={email}
						/>
						<label htmlFor="psw">
							<b>Password</b>
						</label>
						<input
							type="password"
							name="psw"
							id="psw"
							required
							minLength="6"
							className="loginInput"
							ref={password}
						/>
						{/* <div className="loginMessage">{errorMessage}</div> */}
						<button className="loginButton" type="submit">
							Log in
						</button>
						<Link to="/register">
							<button className="loginRegisterButton">
								Create a New Account
							</button>
						</Link>
					</form>
				</div>
			</div>
		</div>
	);
}
