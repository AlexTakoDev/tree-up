import React, { useEffect, useState } from "react";

import ButtonBis from "../base/ButtonBis";
import CardProject from "./CardProject";
import { Link } from "react-router-dom";
import { URL_BACK_PROJECT } from "../../constants/urls/urlBackEnd";
import { URL_CREATEPROJECT } from "../../constants/urls/urlFrontEnd";
import apiGateway from "../../api/backend/apiGateway"

const ListProject = () => {

	const [loadingProject, setLoadingProject] = useState([]);
	const [projects, setProjects] = useState([]);
	const [blacklistProjectIds, setBlacklistProjectIds] = useState([]);
	const [error, setError] = useState();
	
	useEffect(() => {
		getMoreProjects();
	}, []);

	const scrolled = (myDiv)=> {
		if (myDiv.offsetHeight + myDiv.scrollTop >= myDiv.scrollHeight) {
			if (!loadingProject) {
				getMoreProjects();
			}
		}
	}

	useEffect(() => {
		setBlacklistProjectIds([...blacklistProjectIds, ...projects.map((project) => project.uuid)]);
	}, [projects]);

	const getMoreProjects = () => {
		setLoadingProject(true)
		apiGateway.post(URL_BACK_PROJECT, {blacklistIds: blacklistProjectIds})
		.then((({data}) => {
			setProjects([...projects, ...data])
			setLoadingProject(false);
		}))
		.catch((error) => setError(error.message));
	};

	return (
		<div className="flex flex-wrap justify-center content-start overflow-y-auto h-full gap-10" onScroll={(e) => scrolled(e.target)}>
			<div className="border-gradient-v rounded-3xl p-3 h-fit w-full text-center">
				<p>Tree-Up vous permets de partager et d’échanger sur les divers projets d’actualité postés par nos jeunes développeurs !</p>
				<p>N’hésitez pas à faire un tour sur nos projets récents et de partager votre avis dans la section commentaires !</p>
				<Link to={URL_CREATEPROJECT} className="text-primary-light">
					Cliquez ici
				</Link>
				<p className="inline-block ml-1">si vous souhaitez créer un projet afin de le mettre en avant !</p>
			</div>
			{projects
				.map((project) => (
				<CardProject key={project.uuid} {...project} />
			))}
			{error && (
				<p className="error p-5 m-1 border-2 border-red-700 bg-white">
				{error}
				</p>
			)}
		</div>
	);
};

export default ListProject;
