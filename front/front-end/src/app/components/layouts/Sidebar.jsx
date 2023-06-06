import React, { useState } from "react";

import CheckBox from "../base/CheckBox";
import { Link } from "react-router-dom";
import Search from "../base/Search";

const SideBar = () => {
	const fakeProjectType = [
		{ uuid: "1", type: "Réseau social" },
		{ uuid: "2", type: "E-Commerce" },
		{ uuid: "3", type: "Blog" },
	];

	const fakeTechnologiesType = [
		{ uuid: "4", type: "Html/Css" },
		{ uuid: "5", type: "Javascript" },
		{ uuid: "7", type: "Php" },
		{ uuid: "6", type: "NodeJs" },
	];

	const [filterType, setFilterType] = useState("project");
	const [filterTypeProject, setFilterTypeProject] = useState([]);
	const [filterTypeTechnologie, setFilterTypeTechnologie] = useState([]);
	const [search, setSearch] = useState("");

	const toggleFilterType = (e) => {
		setFilterType(e.target.value);
	};

	const toggleFilter = {
		base: (e, setFilter) => setFilter((filter) => (filter.includes(e.target.value) ? filter.filter((item) => item != e.target.value) : [...filter, e.target.value])),
		typeProject: (e) => toggleFilter.base(e, setFilterTypeProject),
		typeTechnologie: (e) => toggleFilter.base(e, setFilterTypeTechnologie),
	};

	return (
		<div className="flex pb-16 md:w-1/4 lg:w-1/5">
			<div className="flex flex-col justify-between bg-gray-1 shadow-lg p-2 rounded-md">
				<div>
					<Search setOutput={setSearch} />
					<div>
						<h6>Type</h6>
						<CheckBox type="radio" text="Projet" value="project" onChange={toggleFilterType} defaultChecked={true} />
						<CheckBox type="radio" text="Utilisateur" value="user" onChange={toggleFilterType} />
					</div>
					<hr className="border-dark my-2" />
					<div>
						<h6>Type de projets</h6>
						{fakeProjectType.map(({ uuid, type }) => (
							<CheckBox text={type} key={uuid} value={uuid} onChange={toggleFilter.typeProject} />
						))}
					</div>
					<hr className="border-dark my-2" />
					<div>
						<h6>Technologies utilisées</h6>
						{fakeTechnologiesType.map(({ uuid, type }) => (
							<CheckBox text={type} key={uuid} value={uuid} onChange={toggleFilter.typeTechnologie} />
						))}
					</div>
				</div>

				<div>
					<Link to="/contact">
						<p>Nous contacter ? </p>
					</Link>
					<Link to="/about">
						<p>A propos de nous</p>
					</Link>
					<Link to="/cgu">
						<p>Conditions Générales d'Utilisations</p>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default SideBar;
