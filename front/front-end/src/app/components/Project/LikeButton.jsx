import React, { useEffect, useState } from "react";

import { ThumbUpIcon as HeartIconfull } from "@heroicons/react/solid";
import { postLike } from "../../api/backend/like";

function LikeButton({ isLogged, project, setProject }) {
	const like = async () => {
		if (!isLogged) return;

		await postLike({ uuid_project: project.uuid })
			.then((res) => {
				const newProject = project;
				{
					project.liked
						? (newProject.liked = false)
						: (newProject.liked = true);
				}
				{
					res.data.isliked
						? (newProject.countLikes += 1)
						: (newProject.countLikes -= 1);
				}
				setProject((project) => ({ ...project, ...newProject }));
			})
			.catch((err) => {
				console.log(err);
			});
		//setlikes(likes+1)
	};

	return (
		<div
			className={`bg-gray-200 text-center text-sm hover:font-medium py-1 px-3 rounded-l-md cursor-pointer ${
				project.liked && "bg-zinc-800 text-white"
			}`}
		>
			<button type="button" onClick={like} className="flex items-center gap-2">
				<HeartIconfull
					className="h-6 w-6 my-1"
					color={project.liked ? "white": "black"}
				/>
				{project.liked ? "Vous avez like ce projet" : "Ajouter un like"}
			</button>
		</div>
	);
}

export default LikeButton;
