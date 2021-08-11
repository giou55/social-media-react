import { createStore } from "redux";

const initialState = {
	user: JSON.parse(localStorage.getItem("user")) || null,
	token: localStorage.getItem("token") || null,
	isLoggedIn: localStorage.getItem("isLoggedIn") === "true",
	error: false,
};

const counterReducer = (state = initialState, action) => {
	if (action.type === "LOGIN") {
		return {
			user: action.payload.user,
			token: action.payload.token,
			isLoggedIn: true,
			error: false,
		};
	}
	if (action.type === "LOGOUT") {
		return {
			user: null,
			token: null,
			isLoggedIn: false,
			error: false,
		};
	}
	if (action.type === "FOLLOW") {
		return {
			user: action.payload,
			token: state.token,
			isLoggedIn: state.isLoggedIn,
			error: state.error,
		};
	}
	if (action.type === "UNFOLLOW") {
		return {
			user: action.payload,
			token: state.token,
			isLoggedIn: state.isLoggedIn,
			error: state.error,
		};
	}
	if (action.type === "UPDATE") {
		return {
			user: action.payload,
			token: state.token,
			isLoggedIn: state.isLoggedIn,
			error: state.error,
		};
	}
	return state;
};

const store = createStore(counterReducer);

export default store;
