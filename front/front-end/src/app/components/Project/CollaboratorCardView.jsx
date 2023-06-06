import { Link } from "react-router-dom";
import React from "react";
import { URL_PROFILE2 } from "../../constants/urls/urlFrontEnd";
import avatar from "../../assets/img/icons/avatar.svg";
import owerSvg from "../../assets/img/icons/owner.svg";

function CollaboratorCardView({
	firstname,
	lastname,
	work,
	uuid,
	owner = false,
	className = "",
	disabled = false,
}) {
	return (
		<Link to={URL_PROFILE2 + uuid} className={`bg-gray-1 p-2 rounded-lg ${className}`} onClick={(e) => {disabled && e.preventDefault()}}>
			<div className="flex gap-2">
				<img className="w-5" src={avatar} alt="Logo de TreeUp" />
				<p className="font-semibold w-full">
					{firstname} {lastname}
				</p>
			</div>
			<hr />
			<div className="flex justify-between">
				<p className="font-bold">{work || "Membre de TreeUp"}</p>
				{owner && <img src={owerSvg} alt="owner button" width={15} />}
			</div>
		</Link>
	);
}

export default CollaboratorCardView;
