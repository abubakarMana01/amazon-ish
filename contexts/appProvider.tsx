import React, { createContext, useContext, useState } from "react";

const AppContext = createContext<null | any>(null);

export default function AppProvider({ children }: { children: JSX.Element }) {
	const [currentCategory, setCurrentCategory] =
		useState<string>("all categories");

	return (
		<AppContext.Provider
			value={{
				currentCategory,
				setCurrentCategory,
			}}
		>
			{children}
		</AppContext.Provider>
	);
}

export function useAppContext() {
	return useContext(AppContext);
}
