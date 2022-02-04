import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import styles from "./styles.module.css";
import Logo from "assets/amazon-logo-sm.svg";
import {
	HomeRounded,
	BookmarkRounded,
	ShoppingCartRounded,
	WatchLaterRounded,
	AccountCircleRounded,
} from "@mui/icons-material";
import { Badge, Tooltip } from "@mui/material";

export default function Sidebar() {
	const router = useRouter();

	return (
		<nav className={styles.nav}>
			<div className={styles.logoContainer}>
				<Image src={Logo} alt="logo" />
			</div>

			<ul className={styles.navLinks}>
				<li>
					<Link href="/">
						<a
							data-tip="hello world"
							className={
								router.pathname === "/"
									? styles.navLink__active
									: styles.navLink
							}
						>
							<Tooltip title="Home" placement="right" arrow>
								<HomeRounded style={{ width: "36" }} fontSize="large" />
							</Tooltip>
						</a>
					</Link>
				</li>
				<li>
					<Link href="/cart">
						<a
							data-tip="hello world"
							className={
								router.pathname === "/cart"
									? styles.navLink__active
									: styles.navLink
							}
						>
							<Tooltip title="Cart" placement="right" arrow>
								<Badge badgeContent={0} color="warning" showZero>
									<ShoppingCartRounded fontSize="large" />
								</Badge>
							</Tooltip>
						</a>
					</Link>
				</li>
				<li>
					<Link href="/bookmarks">
						<a
							className={
								router.pathname === "/bookmarks"
									? styles.navLink__active
									: styles.navLink
							}
						>
							<Tooltip title="Bookmarks" placement="right" arrow>
								<Badge badgeContent={0} color="warning" showZero>
									<BookmarkRounded fontSize="large" />
								</Badge>
							</Tooltip>
						</a>
					</Link>
				</li>
				<li>
					<Link href="/orders">
						<a
							className={
								router.pathname === "/orders"
									? styles.navLink__active
									: styles.navLink
							}
						>
							<Tooltip title="Orders" placement="right" arrow>
								<WatchLaterRounded fontSize="large" />
							</Tooltip>
						</a>
					</Link>
				</li>
			</ul>

			<div className={styles.profileIconContainer}>
				<Link href="/account">
					<a
						className={
							router.pathname === "/account"
								? styles.navLink__active
								: styles.navLink
						}
					>
						<Tooltip title="Account" placement="right" arrow>
							<AccountCircleRounded fontSize="large" />
						</Tooltip>
					</a>
				</Link>
			</div>
		</nav>
	);
}
