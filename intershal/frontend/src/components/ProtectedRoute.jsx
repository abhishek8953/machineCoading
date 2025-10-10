/* eslint-disable react/prop-types */
import {} from "react";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ login, children }) => {
	const data = localStorage.getItem("login");
	JSON.parse(data);
	if (data) {
		return children;
	}

	if (!login) {
		return <Navigate to="/login" />;
	}

	return children;
};
