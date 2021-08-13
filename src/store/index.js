import { createStore } from "redux";

const initialState = {
	user: null,
	userId: localStorage.getItem("userId") || null,
	token: localStorage.getItem("token") || null,
	isLoggedIn: localStorage.getItem("isLoggedIn") === "true",
	error: false,
};

const counterReducer = (state = initialState, action) => {
	if (action.type === "LOGIN") {
		return {
			user: state.user,
			userId: action.payload.userId,
			token: action.payload.token,
			isLoggedIn: true,
			error: false,
		};
	}
	if (action.type === "LOGOUT") {
		return {
			user: null,
			userId: null,
			token: null,
			isLoggedIn: false,
			error: false,
		};
	}
	if (action.type === "FOLLOW") {
		return {
			user: action.payload,
			userId: state.userId,
			token: state.token,
			isLoggedIn: state.isLoggedIn,
			error: state.error,
		};
	}
	if (action.type === "UNFOLLOW") {
		return {
			user: action.payload,
			userId: state.userId,
			token: state.token,
			isLoggedIn: state.isLoggedIn,
			error: state.error,
		};
	}
	if (action.type === "UPDATE") {
		return {
			user: action.payload,
			userId: state.userId,
			token: state.token,
			isLoggedIn: state.isLoggedIn,
			error: state.error,
		};
	}
	return state;
};

const store = createStore(counterReducer);

export default store;
