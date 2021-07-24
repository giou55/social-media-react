import { createContext, useState } from "react";

export const AuthContext = createContext({
	token: "",
	isLoggedIn: false,
	login: (token) => {},
	logout: () => {},
	firstName: "",
	lastName: "",
	userId: ""
});

export const AuthContextProvider = ({ children }) => {
	const [token, setToken] = useState(null);

	const userIsLoggedIn = !!token;

	const loginHandler = (token) => {
		setToken(token);
	};

	const logoutHandler = () => {
		setToken(null);
	};


	const contextValue = {
		token: token,
		isLoggedIn: userIsLoggedIn,
		login: loginHandler,
		logout: logoutHandler,
		firstName: "",
		lastName: "",
		userId: "",
	};

	return (
		<AuthContext.Provider value={contextValue}>
			{children}
		</AuthContext.Provider>
	);
};
