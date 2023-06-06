import { Navigate, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getToken, isTokenValid } from "../services/tokenServices";

import { URL_LOGIN } from "../constants/urls/urlFrontEnd";

const ConnectedRoute = ({ children }) => {
	const [redirection, setRedirection] = useState();
	const location = useLocation();
    
    useEffect(() => {
		const token = getToken();
		if (!isTokenValid(token)) {
            setRedirection(<Navigate to={URL_LOGIN} state={{ from: location }} />)
        }
	}, []);

	if (redirection) return redirection;

	return children;
};

export default ConnectedRoute;