import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import store from "./store/index";

// import { AuthContextProvider } from "./context/AuthContext";

// ReactDOM.render(
// 	<AuthContextProvider>
// 		<App />
// 	</AuthContextProvider>,
// 	document.getElementById("root")
// );

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById("root")
);

