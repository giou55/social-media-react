import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import HomeRightbar from "../../components/homeRightbar/HomeRightbar";
import "./home.css";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Home() {
	const [user, setUser] = useState({});
	const authCtx = useContext(AuthContext);

	useEffect(() => {
		const fetchUserData = async () => {
			const res = await axios.get(
				`/users?firstname=${authCtx.firstName}&lastname=${authCtx.lastName}`
			);
			setUser(res.data);
		};
		fetchUserData();
	}, [authCtx.firstName, authCtx.lastName]);

	return (
		<>
			{user && <Topbar user={user} />}
			<div className="homeContainer">
				<Sidebar />
				{user && <Feed user={user} />}
				<HomeRightbar />
			</div>
		</>
	);
}
