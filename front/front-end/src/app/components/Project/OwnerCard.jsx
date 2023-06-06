import React from "react";
import avatar from "../../assets/img/icons/avatar.svg";
import owner from "../../assets/img/icons/Owner.svg";

function OwnerCard({ firstname, lastname, username, descripcion }) {
	return (
		<div className="bg-gray-1 p-2 rounded-lg w-48 flex justify-center items-center">
			<div className="flex gap-2">
				<img className="w-5" src={avatar} alt="Logo de TreeUp" />
				<p className="font-semibold w-full">
					{firstname} {lastname}
				</p>
				<button type="button" onClick={onDelete}>
					<img src={cross} alt="x" width={15} />
				</button>
			</div>
			<hr />
			<div className="flex justify-between">
				<p className="font-bold">{work || "Membre"}</p>
				<button type="button" onClick={onDelete}>
					<img src={owner} alt="owner button" width={15} />
				</button>
			</div>
		</div>
	);
}

export default OwnerCard;
