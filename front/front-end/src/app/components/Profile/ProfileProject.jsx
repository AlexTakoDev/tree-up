import "../../views/Profile/Scrollbar.css";

import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

import CardProject from "../Project/CardProject";
import { PlusIcon } from "@heroicons/react/solid";
import { URL_BACK_PROJECT } from "../../constants/urls/urlBackEnd";
import { URL_CREATEPROJECT } from "../../constants/urls/urlFrontEnd";
import apiGateway from "../../api/backend/apiGateway";
import { selectUser } from "../../redux-store/authenticationSlice";
import { useSelector } from "react-redux";

const ProfileProject = () => {
  const { uuid } = useParams();
  const user = useSelector(selectUser);

  const [projects, setProjects] = useState([]);
	const [error, setError] = useState();

  useEffect(() => {
		apiGateway.get(URL_BACK_PROJECT + "/user/" + uuid)
		.then(({data}) => setProjects(data))
		.catch(({error}) => setError(error.message));
	}, [uuid]);
  
  return (
    <div className="flex ml-7">
      <div className="">
        {user?.uuid === uuid && 
          <Link to={URL_CREATEPROJECT}>
            <PlusIcon className="border-2 w-24 rounded-md h-full mr-5 shadow-xl bg-white" />
          </Link>
        }
      </div>
      <div className="flex gap-3 overflow-x-scroll w-auto border-red-500 scrollbar">
      {projects
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .map((project) => (
        <CardProject key={project.uuid} {...project} />
      ))}
      {error && (
				<p className="error p-5 m-1 border-2 border-red-700 bg-white">
				{error}
				</p>
			)}
      </div>
    </div>
  );
};

export default ProfileProject;