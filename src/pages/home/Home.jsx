import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import HomeRightbar from "../../components/homeRightbar/HomeRightbar";
import "./home.css";
import axios from "axios";
import { useState, useEffect} from "react";

export default function Home() {
	const [user, setUser] = useState({});
	
	const firstname = localStorage.getItem('firstname');
	const lastname = localStorage.getItem('lastname');

	useEffect(() => {
		const fetchUserData = async () => {
			const res = await axios.get(
				`/users?firstname=${firstname}&lastname=${lastname}`
			);
			setUser(res.data);
		};
		fetchUserData();
	}, [firstname, lastname]);

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
