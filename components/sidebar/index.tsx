import React, { useEffect } from "react";
import { useRouter } from "next/router";
import styles from "./styles.module.css";
import {
	BookmarksRounded,
	ShoppingCartRounded,
	WatchLaterRounded,
	AccountCircleRounded,
	HomeRounded,
} from "@mui/icons-material";
import { Badge, Tooltip } from "@mui/material";
import { useAppContext } from "contexts";

type routeTypes =
	| "orders"
	| "cart"
	| "bookmarks"
	| "account"
	| ""
	| "account/login";

export default function Sidebar() {
	const router = useRouter();
	const appContext = useAppContext();

	useEffect(() => {
		if (appContext.deviceWidth > 550) {
			appContext.setIsSidebarOpened(true);
		} else {
			appContext.setIsSidebarOpened(false);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [appContext.deviceWidth]);

	useEffect(() => {
		if (!appContext.user) {
			appContext.setCartItemsCount(0);
			appContext.setBookmarkItemsCount(0);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [appContext.user]);

	const handleRoutePush = (route: routeTypes) => {
		router.push(`/${route}`);

		if (appContext.deviceWidth <= 550) {
			appContext.setIsSidebarOpened(false);
		}
	};

	return (
		<nav
			style={{
				transform: `translateX(${appContext.isSidebarOpened ? 0 : -100}%)`,
			}}
			className={styles.nav}
		>
			<div className={styles.logoContainer}>
				{/* <Image src={Logo} alt="logo" /> */}
			</div>

			<ul className={styles.navLinks}>
				<li>
					<span
						onClick={() => handleRoutePush("")}
						className={
							router.pathname === "/" ? styles.navLink__active : styles.navLink
						}
					>
						<Tooltip title="Home" placement="right" arrow>
							<HomeRounded style={{ width: 36 }} fontSize="large" />
						</Tooltip>
					</span>
				</li>
				<li>
					<span
						onClick={() => handleRoutePush("cart")}
						className={
							router.pathname === "/cart"
								? styles.navLink__active
								: styles.navLink
						}
					>
						<Tooltip title="Cart" placement="right" arrow>
							<Badge
								badgeContent={appContext.cartItemsCount}
								color="warning"
								showZero={false}
							>
								<ShoppingCartRounded fontSize="large" />
							</Badge>
						</Tooltip>
					</span>
				</li>
				<li>
					<span
						onClick={() => handleRoutePush("bookmarks")}
						className={
							router.pathname === "/bookmarks"
								? styles.navLink__active
								: styles.navLink
						}
					>
						<Tooltip title="Bookmarks" placement="right" arrow>
							<Badge
								badgeContent={appContext.bookmarkItemsCount}
								color="warning"
								showZero={false}
							>
								<BookmarksRounded fontSize="large" />
							</Badge>
						</Tooltip>
					</span>
				</li>
				<li>
					<span
						onClick={() => handleRoutePush("orders")}
						className={
							router.pathname === "/orders"
								? styles.navLink__active
								: styles.navLink
						}
					>
						<Tooltip title="Orders" placement="right" arrow>
							<WatchLaterRounded fontSize="large" />
						</Tooltip>
					</span>
				</li>
			</ul>

			<div className={styles.profileIconContainer}>
				<span
					onClick={() =>
						handleRoutePush(appContext.user ? "account" : "account/login")
					}
					className={
						router.pathname === "/account" ||
						router.pathname === "/account/login" ||
						router.pathname === "/account/signup"
							? styles.navLink__active
							: styles.navLink
					}
				>
					<Tooltip title="Account" placement="right" arrow>
						<AccountCircleRounded fontSize="large" />
					</Tooltip>
				</span>
			</div>
		</nav>
	);
}
