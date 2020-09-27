import React from 'react';

import { StatefulInput } from 'baseui/input';
import { Button, SIZE } from "baseui/button";


const getAuthData = () => {
	try {
		return JSON.parse(localStorage.getItem("auth") as any);
	} catch(err) {
		localStorage.clear();
		window.location.reload();
	}
}

const authData = getAuthData();
const AuthContext = React.createContext<any>({
	login: () => undefined,
	logout: () => undefined,
	data: authData,
	// authorized: false,
});

export const useAuth = () => {
	return React.useContext(AuthContext);
}

export const AuthProvider = (props: any) => {
	const logout = React.useCallback(() => {
		localStorage.clear();
		window.location.reload();
	}, []);

	const login = React.useCallback(() => {
		window.location.href = "/auth";
	}, []);

	const value = React.useMemo(() => ({
		logout, login,
		data: authData,
	}), []);

	return (
		<AuthContext.Provider value={value}>
			{props.children}
		</AuthContext.Provider>
	);
}
