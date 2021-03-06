import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import HomeRightbar from "../../components/homeRightbar/HomeRightbar";
import "./home.css";
import axios from "axios";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

export default function Home() {
	const userId = useSelector((state) => state.userId);
	const user = useSelector((state) => state.user);

	const dispatch = useDispatch();

	useEffect(() => {
		const fetchUser = async () => {
			const res = await axios.get(
				process.env.REACT_APP_API_URL + "/users?userId=" + userId
			);
			dispatch({ type: "UPDATE", payload: res.data });
		};
		fetchUser();
	}, [userId, dispatch]);

	return (
		<>
			{user && <Topbar user={user} />}
			{user && (
				<div className="homeContainer">
					<Sidebar user={user} />
					<Feed />
					<HomeRightbar user={user} />
				</div>
			)}
		</>
	);
}
