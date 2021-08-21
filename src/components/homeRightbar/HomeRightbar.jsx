import "./homerightbar.css";
import { Users } from "../../dummyData";
import Online from "../online/Online";

export default function HomeRightbar() {
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
						<b>Pola foster</b> and <b>3 other friends</b> have a
						birthday today
					</span>
				</div>
				<img
					className="rightbarAd"
					src={process.env.PUBLIC_URL + "/assets/ad.jpg"}
					alt=""
				/>
				<h4 className="rightbarTitle">Online Friends</h4>
				<ul className="rightbarFriendList">
					{Users.map((u) => (
						<Online key={u.id} user={u} />
					))}
				</ul>
			</div>
		</div>
	);
}
