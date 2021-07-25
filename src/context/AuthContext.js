import { createContext, useState, useReducer } from "react";
import AuthReducer from "./AuthReducer";

export const AuthContext = createContext({
	token: "",
	isLoggedIn: false,
	login: (data) => {},
	logout: () => {},
	firstName: "",
	lastName: "",
	userId: "",
});

export const AuthContextProvider = ({ children }) => {
	const initialToken = localStorage.getItem("token");
	const [token, setToken] = useState(initialToken);
	const [firstname, setFirstname] = useState("");
	const [lastname, setLastname] = useState("");
	const [userId, setUserId] = useState("");

	const userIsLoggedIn = !!token;

	const loginHandler = (data) => {
		localStorage.setItem("token", data.token);
		localStorage.setItem("firstname", data.firstName);
		localStorage.setItem("lastname", data.lastName);
		localStorage.setItem("userId", data.userId);
		setToken(data.token);
		setFirstname(data.firstName);
		setLastname(data.lastName);
		setUserId(data.userId);
	};

	const logoutHandler = () => {
		localStorage.clear();
		setToken(null);
		setFirstname("");
		setLastname("");
		setUserId("");
	};

	const contextValue = {
		token: token,
		isLoggedIn: userIsLoggedIn,
		login: loginHandler,
		logout: logoutHandler,
		firstName: firstname,
		lastName: lastname,
		userId: userId,
	};

	return (
		<AuthContext.Provider value={contextValue}>
			{children}
		</AuthContext.Provider>
	);
};
