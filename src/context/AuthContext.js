import { createContext, useReducer, useEffect } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
	// user: {
	// 	_id: "60d6f96602eadd5d1879f66d",
	// 	profilePicture: "/person/1.jpeg",
	// 	coverPicture: "",
	// 	followers: [],
	// 	followings: ["60d6f429f61fde4e8c6bc293"],
	// 	isAdmin: false,
	// 	username: "george",
	// 	email: "george@gmail.com",
	// },
	user: JSON.parse(localStorage.getItem("user")) || null,
	isFetching: false,
	error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

	useEffect(() => {
		localStorage.setItem("user", JSON.stringify(state.user));
	}, [state.user]);

	return (
		<AuthContext.Provider
			value={{
				user: state.user,
				isFetching: state.isFetching,
				error: state.error,
				dispatch,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
