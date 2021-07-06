import "./register.css";
import { useRef } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";

export default function Register() {
	const username = useRef();
	const email = useRef();
	const password = useRef();
	const passwordAgain = useRef();
	const history = useHistory();

	const handleClick = async (e) => {
		e.preventDefault();
		if (passwordAgain.current.value !== password.current.value) {
			password.current.setCustomValidity("Passwords don't match!");
		} else {
			const user = {
				username: username.current.value,
				email: email.current.value,
				password: password.current.value,
			};
			try {
				await axios.post("/auth/register", user);
				history.push("/login");
			} catch (err) {
				console.log(err);
			}
		}
	};

	return (
		<div className="register">
			<div className="registerWrapper">
				<div className="registerLeft">
					<h3 className="registerLogo">Friendbook</h3>
					<span className="registerDesc">
						Connect with friends and the world around you on
						Friendbook.
					</span>
				</div>
				<div className="registerRight">
					<form className="registerBox" onSubmit={handleClick}>
						<label htmlFor="username">
							<b>Username</b>
						</label>
						<input
							name="username"
							id="username"
							required
							ref={username}
							className="registerInput"
						/>
						<label htmlFor="email">
							<b>Email</b>
						</label>
						<input
							name="email"
							id="email"
							required
							ref={email}
							className="registerInput"
							type="email"
						/>
						<label htmlFor="psw">
							<b>Password</b>
						</label>
						<input
							name="password"
							id="password"
							required
							ref={password}
							className="registerInput"
							type="password"
							minLength="6"
						/>
						<label htmlFor="psw-again">
							<b>Password Again</b>
						</label>
						<input
							name="psw-again"
							id="psw-again"
							required
							ref={passwordAgain}
							className="registerInput"
							type="password"
						/>
						<button className="registerButton" type="submit">
							Sign up
						</button>
						<Link to="/login">
							<button className="registerRegisterButton">
								Log into Account
							</button>
						</Link>
					</form>
				</div>
			</div>
		</div>
	);
}
