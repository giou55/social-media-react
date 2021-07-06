import { useContext, useRef } from "react";
import "./login.css";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@material-ui/core";
import { Link } from "react-router-dom";

export default function Login() {
	const email = useRef();
	const password = useRef();

	const { isFetching, dispatch } = useContext(AuthContext);

	const handleClick = (e) => {
		e.preventDefault();
		loginCall(
			{ email: email.current.value, password: password.current.value },
			dispatch
		);
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
				<div className="loginRight" onSubmit={handleClick}>
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
						<button className="loginButton" type="submit">
							{isFetching ? (
								<CircularProgress color="primary" size="20px" />
							) : (
								"Log in"
							)}
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
