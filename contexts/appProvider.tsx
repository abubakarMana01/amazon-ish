import React, { createContext, useContext, useState } from "react";

const AppContext = createContext<null | any>(null);

export default function AppProvider({ children }: { children: JSX.Element }) {
	const [currentCategory, setCurrentCategory] =
		useState<string>("all categories");
	const [cartItemsCount, setCartItemsCount] = useState(0);
	const [bookmarkItemsCount, setBookmarkItemsCount] = useState(0);

	return (
		<AppContext.Provider
			value={{
				currentCategory,
				setCurrentCategory,
				cartItemsCount,
				setCartItemsCount,
				bookmarkItemsCount,
				setBookmarkItemsCount,
			}}
		>
			{children}
		</AppContext.Provider>
	);
}

export function useAppContext() {
	return useContext(AppContext);
}
