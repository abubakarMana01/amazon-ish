import React, { createContext, useContext, useEffect, useState } from "react";
import { axios } from "config";
import jwtDecode from "jwt-decode";

const AppContext = createContext<any | null>(null);

export default function AppProvider({ children }: { children: JSX.Element }) {
	const [user, setUser] = useState<string | null>(null);
	const [currentCategory, setCurrentCategory] =
		useState<string>("all categories");
	const [cartItemsCount, setCartItemsCount] = useState(0);
	const [bookmarkItemsCount, setBookmarkItemsCount] = useState(0);
	const [isSidebarOpened, setIsSidebarOpened] = useState(true);
	const [deviceWidth, setDeviceWidth] = useState(0);

	useEffect(() => {
		try {
			const token = localStorage.getItem("token");
			if (token) {
				const decoded: string = jwtDecode(token);
				setUser(decoded);
			} else {
				setUser(null);
			}
		} catch (err: any) {
			console.log(err.message);
			setUser(null);
		}
	}, []);

	useEffect(() => {
		(async function () {
			if (!user) return;

			try {
				const cartRes = await axios.get("/cart", {
					headers: {
						"x-auth-token": localStorage.getItem("token")!,
					},
				});
				setCartItemsCount(cartRes.data.length);

				const bookmarksRes = await axios.get("/bookmarks", {
					headers: {
						"x-auth-token": localStorage.getItem("token")!,
					},
				});
				setBookmarkItemsCount(bookmarksRes.data.length);
			} catch (err: any) {
				if (err.response) {
					console.log(err.response.data?.error.message);
				} else {
					console.log(err.message);
				}
			}
		})();
	}, [user]);

	return (
		<AppContext.Provider
			value={{
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
				user,
				setUser,
			}}
		>
			{children}
		</AppContext.Provider>
	);
}

export function useAppContext() {
	return useContext(AppContext);
}
