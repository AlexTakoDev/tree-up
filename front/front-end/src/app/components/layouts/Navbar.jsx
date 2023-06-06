import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { selectIsLogged, selectUser, signOut, selectAvatar } from "../../redux-store/authenticationSlice";
import { useDispatch, useSelector } from "react-redux";
import { UserCircleIcon } from "@heroicons/react/solid";
import Button from "../base/Button";
import Logo from "../../assets/img/LogoTreeUp100x100.png";
import { URL_LOGIN } from "../../constants/urls/urlFrontEnd";

const Navbar = () => {
	const [enableDropdown, setEnableDropdown] = useState(false);
	const isLoggued = useSelector(selectIsLogged);
	const dispatch = useDispatch();
	const user = useSelector(selectUser);
	const avatarUrl = useSelector(selectAvatar);
	const nav = useNavigate();
	
	return (
		<>
			<div className="bg-gray-1 p-3">
				<div className="container mx-auto">
					<div className="flex justify-between items-center">
						<Link to="/">
							<img className="border-gradient-v rounded-2xl shadow-sm hover:shadow-inner shadow-dark" src={Logo} alt="Logo de TreeUp" width={60} />
						</Link>

						{isLoggued ? (
							<div className="flex items-center gap-3">
								<h5>{user.username}</h5>
								{avatarUrl !== null ?
								<img
									className="bg-white rounded-full border-gradient-v shadow-sm hover:shadow-inner shadow-dark cursor-pointer"
									src={avatarUrl}
									alt="avatar user"
									width={60}
									onClick={() => setEnableDropdown(!enableDropdown)}
								/> :
								<UserCircleIcon 
								className="bg-white rounded-full border-gradient-v shadow-sm hover:shadow-inner shadow-dark cursor-pointer"
								alt = "avatar user"
								width={60}
								onClick={() => setEnableDropdown(!enableDropdown)}
								 />}
							</div>
						) : (
							<Link to="/login">
								<Button title={"Connexion"} />
							</Link>
						)}
					</div>
				</div>
			</div>

			{isLoggued && enableDropdown && (
				<div className="container mx-auto relative">
					<div className="bg-gray-1 text-center px-3 pb-2 w-48 absolute right-0 rounded-b-md">
						<Link to={`/profile/${user.uuid}`}>
							<div className="border-2 border-neutral-400 rounded m-1">Mon profil</div>
						</Link>
						<Link to="/profile#projects">
							<div className="border-2 border-neutral-400 rounded m-1">Mes Projets</div>
						</Link>
						<hr className="border-neutral-400" />

						<div className="border-2 border-neutral-400 rounded m-1 text-red-700 font-bold cursor-pointer" onClick={() => {
							dispatch(signOut());
							nav(URL_LOGIN);
						}}>
							Déconnexion
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default Navbar;
