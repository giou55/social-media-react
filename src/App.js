import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Profile from "./pages/profile/Profile";

import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";

import { useSelector } from "react-redux";

function App() {
	const isLoggedIn = useSelector((state) => state.isLoggedIn);

	return (
		<Router basename="/friendbook">
			<Switch>
				<Route exact path="/">
					{isLoggedIn ? <Home /> : <Login />}
				</Route>
				<Route path="/login">
					{isLoggedIn ? <Redirect to="/" /> : <Login />}
				</Route>
				<Route path="/register">
					{isLoggedIn ? <Redirect to="/" /> : <Register />}
				</Route>
				<Route path="/profile/:fullname">
					{isLoggedIn ? <Profile /> : <Redirect to="/login" />}
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
