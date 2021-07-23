import { useContext, useRef } from "react";
import "./login.css";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@material-ui/core";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Login() {
	const email = useRef();
	const password = useRef();

	// const { isFetching, dispatch, error } = useContext(AuthContext);

	const submitHandler = async (e) => {
		e.preventDefault();
		const userCredentials = {
			email: email.current.value,
			password: password.current.value,
		};
		// dispatch({ type: "LOGIN_START" });
		try {
			const res = await axios.post("/auth/login", userCredentials);
			console.log(res);
			// dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
		} catch (err) {
			console.log(err);
			// dispatch({ type: "LOGIN_FAILURE", payload: err });
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
				<div className="loginRight" onSubmit={submitHandler}>
					<form className="loginBox">
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
						<div className="loginMessage">{Error}</div>
						<button className="loginButton" type="submit">
							{/* {isFetching ? (
								<CircularProgress color="primary" size="20px" />
							) : (
								"Log in"
							)} */}
							Log in
						</button>
						<span className="loginForgot">Forgot Password?</span>
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
