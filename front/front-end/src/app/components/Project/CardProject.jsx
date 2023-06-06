import { Link } from "react-router-dom";
import PillTechnologie from "../Technos/PillTechnologie";
import React from "react";
import { URL_PROJETVIEW } from "../../constants/urls/urlFrontEnd";

const CardProject = ({ uuid, name, type, description, collaborator, technologies, image }) => {
	return (
		<Link to={URL_PROJETVIEW + uuid} className="border-gradient-h border-0 rounded-2xl hover:shadow-2xl active:border-2">
			<article className="flex flex-col items-center pb-2 w-96 rounded-2xl bg-white">
				<div className="flex flex-col w-full  justify-between align-super p-3">
					<div>
						<h4 className="text-2xl">{name}</h4>
						<h5 className="text-sm text-gray-500">{type?.name}</h5>
					</div>
					<div>
						<h5 className="text-sm font-bold">Description</h5>
						<p className="break-words">{description.slice(0, 150) + (description.length > 149 ? "..." : "")}</p>
					</div>
				</div>
			</article>
		</Link>
	);
};

export default CardProject;
