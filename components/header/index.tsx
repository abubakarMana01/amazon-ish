import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./styles.module.css";
import { ArrowBack, Search } from "@mui/icons-material";
import Logo from "assets/amazon-logo.svg";
import LogoSm from "assets/amazon-logo-sm.svg";
import { useRouter } from "next/router";
import { IconButton } from "@mui/material";
import { Dropdown } from "components";
import { useAppContext } from "contexts";

export default function Header() {
	const router = useRouter();
	const { setIsSidebarOpened, isSidebarOpened, setDeviceWidth } =
		useAppContext();

	useEffect(() => {
		setDeviceWidth(window.innerWidth);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleLogoPress = () => {
		if (window.innerWidth > 550 && isSidebarOpened) {
			router.push("/");
		} else {
			setIsSidebarOpened(!isSidebarOpened);
		}
	};

	return (
		<header className={styles.header__container}>
			{router.pathname !== "/" && (
				<div className={styles.btn__back}>
					<IconButton onClick={router.back}>
						<ArrowBack />
					</IconButton>
				</div>
			)}

			<div className={styles.header__logoWrapper}>
				<div
					className={`${styles.header__logoContainer}`}
					onClick={handleLogoPress}
				>
					<Image src={LogoSm} alt="logo" width={26} height={26} />
				</div>
			</div>

			<div className={styles.input__container}>
				<Search />
				<input type="text" placeholder="Search..." />
			</div>

			<div className={styles.header__dropdownContainer}>
				<Dropdown options={["English", "French", "German", "Italian"]} />
			</div>

			<div className={styles.desktop__logo}>
				<Image src={Logo} alt="logo" height={32} width={106} />
			</div>
		</header>
	);
}
