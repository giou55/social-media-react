import { createContext, useState, useReducer, useEffect } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
	user: JSON.parse(localStorage.getItem("user")) || null,
	token: localStorage.getItem("token") || null,
	isLoggedIn: false,
	login: (data) => {},
	logout: () => {},
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

	const [user, setUser] = useState(state.user);
	const [token, setToken] = useState(state.token);
	const [isLoggedIn, setIsLoggedIn] = useState(state.token);

	useEffect(() => {
		localStorage.setItem("user", JSON.stringify(state.user));
		localStorage.setItem("token", state.token);
	}, [state.user, state.token]);

	const loginHandler = (data) => {
		setUser(data.user);
		setToken(data.token);
		setIsLoggedIn(true);
	};

	const logoutHandler = () => {
		localStorage.clear();
		setIsLoggedIn(false);
	};

	const contextValue = {
		user: user,
		token: token,
		isLoggedIn: isLoggedIn,
		login: loginHandler,
		logout: logoutHandler,
		dispatch,
	};

	return (
		<AuthContext.Provider value={contextValue}>
			{children}
		</AuthContext.Provider>
	);
};
