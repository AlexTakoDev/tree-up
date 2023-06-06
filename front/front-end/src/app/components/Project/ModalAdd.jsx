import React, { useEffect, useState } from "react";

import Button from "../base/ButtonBis";
import CheckBox from "../base/CheckBox";
import CollaboratorCard from "./CollaboratorCardView";
import { SearchIcon } from "@heroicons/react/solid";
import { getUsers } from "../../api/backend/account";

export const ModalAdd = ({
	isVisible,
	onClose,
	onClose1,
	children,
	userConecte,
	userAdd,
}) => {
	if (!isVisible) return null;

	const handleClose = (e) => {
		if (e.target.id === "wrapper") onClose();
	};

	const [search, setSearch] = useState("");
	const [users, setUsers] = useState([]);
	const [loader, setLoader] = useState(false);
	const [error, setError] = useState(false);

	const showData = async () => {
		try {
			setLoader(true);
			const response = await getUsers();
			const filteredUsers = response.data.users.filter(
				(user) => user.uuid !== userConecte
			);
			setUsers(filteredUsers);
		} catch (error) {
			setError("Erreur lors du chargement de la liste des utilisateurs");
		}
		setLoader(false);
	};

	//funtion de busqueda => merci captain obvious
	const searcher = (e) => {
		setSearch(e.target.value);
	};

	const results = !search
		? users.filter(
				(dato) => !userAdd.includes(dato.uuid) && dato.uuid !== userConecte
		)
		: users.filter((dato) => {
				const searchTerms = search.toLowerCase().split(" ");
				const firstName = dato.firstname.toLowerCase();
				const lastName = dato.lastname.toLowerCase();
				return (
					searchTerms.every(
						(term) => firstName.includes(term) || lastName.includes(term)
					) &&
					!userAdd.includes(dato.uuid) &&
					dato.uuid !== userConecte
				);
		});

	useEffect(() => {
		showData();
	}, []);

	const [selectedUsers, setSelectedUsers] = useState([]);

	const handleUserSelection = (id, checked) => {
		if (checked) {
			setSelectedUsers([...selectedUsers, id]);
		} else {
			setSelectedUsers(selectedUsers.filter((userId) => userId !== id));
		}
	};

	const handleSubmit = () => {
		onClose1(selectedUsers);
	};

	return (
		<div
			className="fixed inset-0 backdrop-blur-sm bg-gray-600 bg-opacity-50 flex justify-center items-center"
			id="wrapper"
			onClick={handleClose}
		>
			<div className="container mx-auto max-w-2xl bg-gray-50 p-3 rounded-md border-2 border-gray-1 h-[600px] max-h-screen">
				<div className="flex flex-col gap-3 h-full">
					<div className="flex justify-between">
						<div className="flex items-center rounded-lg bg-gray-1">
							<SearchIcon className="h-6 w-6 m-1 " />
							<input
								value={search}
								onChange={searcher}
								type="text"
								placeholder="Rechercher un utilisateur"
								className="border-0 bg-gray-1 rounded-lg"
								name=""
								id=""
							/>
						</div>
						<button className="font-bold px-3" onClick={onClose}>
							X
						</button>
					</div>
					{/* User list */}
					<div className="flex flex-col gap-1 h-full overflow-y-auto">
						{results &&
							results.map((user) => (
								<div
									key={user.uuid}
									className="flex items-center bg-gray-1 p-2 rounded-lg"
								>
									<CollaboratorCard {...user} className="w-full" disabled={true} />
									<CheckBox
										id={user.uuid}
										onChange={(e) =>
											handleUserSelection(user.uuid, e.target.checked)
										}
									/>
								</div>
							))
						}
						{loader && "Chargement..."}
						{error}
					</div>

					<Button
						title={"Ajouter les utilisateurs sélectionnés"}
						onClick={() => {
							handleSubmit();
							onClose();
						}}
					/>
				</div>
			</div>
		</div>
	);
};
