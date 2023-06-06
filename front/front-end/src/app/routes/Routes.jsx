import * as URL from "../constants/urls/urlFrontEnd";

import { Route, Routes as RoutesContainer } from "react-router-dom";

import ConnectedRoute from "./ConnectedRoute";
import CreateProject from "../views/CreateProject/CreateProject";
import EditProfile from "../views/EditProfile/EditProfile";
import Home from "../views/Home/Home";
import Login from "../views/Login/Login";
import Profile from "../views/Profile/Profile";
import Project from "../views/Project/Project";
import React from "react";
import SideBar from "../components/layouts/Sidebar";
import SignIn from "../views/SignIn/SignIn"

/**
 * Routes of the application
 * with public and private route
 *
 * @author Peter Mollet
 */
const Routes = () => {
	return (
		<RoutesContainer>
			<Route path={URL.URL_LOGIN} element={<Login />} />
			<Route path={URL.URL_SIGNIN} element={<SignIn />} />
			<Route
				path="/*"
				element={
					<div className="flex container mx-auto">
						{/* <SideBar /> */}
						<div className="w-full body overflow-y-auto">
							<RoutesContainer>
								<Route path="/" element={<Home />} />
								<Route path={URL.URL_PROFILE} element={<Profile />} />
								<Route path={URL.URL_EDITPROFILE} element ={<EditProfile />} />
								<Route path={URL.URL_CREATEPROJECT} element={<ConnectedRoute><CreateProject isEditMode={false} /></ConnectedRoute>} />
								<Route path={URL.URL_PROJETVIEW + ":uuid"} element={<Project />} />
								<Route path={URL.URL_PROJECT_UPDATE + ":uuid"} element={<ConnectedRoute><CreateProject isEditMode={true} /></ConnectedRoute> } />
							</RoutesContainer>
						</div>
					</div>
				}
			/>
		</RoutesContainer>
	);
};

export default Routes;
