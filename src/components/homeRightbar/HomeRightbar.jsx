import "./homerightbar.css";
import Online from "../online/Online";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function HomeRightbar({ user }) {
	const [users, setUsers] = useState(null);

	useEffect(() => {
		const fetchRandomUsers = async () => {
			const res = await axios.get(
				process.env.REACT_APP_API_URL + "/users/random"
			);
			setUsers(res.data);
		};
		fetchRandomUsers();
	}, []);

	return (
		<div className="rightbar">
			<div className="rightbarWrapper">
				<div className="birthdayContainer">
					<img
						className="birthdayImg"
						src={process.env.PUBLIC_URL + "/assets/gift.png"}
						alt=""
					/>
					<span className="birthdayText">
						<b>Dimitra Kiriazi</b> and <b>2 other friends</b> have a
						birthday today
					</span>
				</div>
				<img
					className="rightbarAd"
					src={process.env.PUBLIC_URL + "/assets/ad.jpg"}
					alt=""
				/>
				<h4 className="rightbarTitle">Online Friends</h4>
				
				{users && (
					<ul className="rightbarFriendList">
						{users.map(
							(u) =>
								u._id !== user._id && (
									<Link
										key={u._id}
										to={
											"/profile/" +
											u.firstname +
											"." +
											u.lastname
										}
										style={{ textDecoration: "none" }}
									>
										<Online key={u._id} user={u} />
									</Link>
								)
						)}
					</ul>
				)}
			</div>
		</div>
	);
}
