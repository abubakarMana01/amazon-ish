import React, { createContext, useContext, useState } from "react";

const AppContext = createContext<any | null>(null);

export default function AppProvider({ children }: { children: JSX.Element }) {
	const [currentCategory, setCurrentCategory] =
		useState<string>("all categories");
	const [cartItemsCount, setCartItemsCount] = useState(0);
	const [bookmarkItemsCount, setBookmarkItemsCount] = useState(0);
	const [isSidebarOpened, setIsSidebarOpened] = useState(true);
	const [deviceWidth, setDeviceWidth] = useState(0);

	const value = {
		currentCategory,
		setCurrentCategory,
		cartItemsCount,
		setCartItemsCount,
		bookmarkItemsCount,
		setBookmarkItemsCount,
		isSidebarOpened,
		setIsSidebarOpened,
		deviceWidth,
		setDeviceWidth,
	};

	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
	return useContext(AppContext);
}
