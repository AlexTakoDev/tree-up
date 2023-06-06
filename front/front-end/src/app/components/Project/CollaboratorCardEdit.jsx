import React from "react";
import avatar from "../../assets/img/icons/avatar.svg";
import collaboratorSVG from "../../assets/img/icons/Collaborator.svg";
import cross from "../../assets/img/icons/Cross.svg";

function CollaboratorCardEdit({ firstname, lastname, work, onDelete, owner }) {
	return (
		<div className="bg-gray-1 p-2 rounded-lg w-48">
			<div className="flex gap-2">
				<img className="w-5" src={avatar} alt="Logo de TreeUp" />
				<p className="font-semibold w-full">
					{firstname} {lastname}
				</p>
				{!owner && <button type="button" onClick={onDelete}>
					<img src={cross} alt="x" width={15} />
				</button>}
			</div>
			<hr />
			<div className="flex justify-between">
				<p className="font-bold">{work || "Membre de TreeUp"}</p>
				{!owner && <button type="button" onClick={() => {}}>
					<img src={collaboratorSVG} alt="owner button" width={15} />
				</button>}
			</div>
		</div>
	);
}

export default CollaboratorCardEdit;
