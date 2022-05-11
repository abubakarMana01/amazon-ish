import { Header } from "components";
import { useRouter } from "next/router";
import Image from "next/image";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import styles from "styles/Account.module.css";
import userImg from "assets/images/user.jpeg";
import { useAppContext } from "contexts";

function Account() {
	const router = useRouter();
	const { user, setUser } = useAppContext();

	useEffect(() => {
		if (!user) router.replace("/account/login");
	}, []);

	const handleSignOut = () => {
		localStorage.removeItem("token");
		setUser(null);
		router.replace("/account/login");
	};

	return (
		<main>
			<Header />

			<motion.section
				initial={{ opacity: 0, y: -50 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ type: "spring" }}
				className={styles.account__container}
			>
				<div style={{ width: "100%" }}>
					<div className={styles.account__topContainer}>
						<div className={styles.account__imageContainer}>
							<Image src={userImg} layout="fill" alt="user" />
						</div>

						<div className={styles.account__nameContainer}>
							<h1>Hi, Abubakar</h1>
							<p>
								This is your profile page. Here, you can view and customize your
								profile details. Double check your details before check out.
							</p>
						</div>

						<button
							className={styles.account__signOutButton}
							onClick={handleSignOut}
						>
							Sign out
						</button>
					</div>

					<div className={styles.account__info}>
						<div className={styles.accountInfoRow}>
							<p>
								<span>Name</span>
								<span>YAHYA MANA ABUBAKAR</span>
							</p>
						</div>
						<div className={styles.accountInfoRow}>
							<p>
								<span>Email Address</span>
								<span>ym.abubakr7@gmail.com</span>
							</p>
						</div>
						<div className={styles.accountInfoRow}>
							<p>
								<span>Phone</span>
								<span>09033889352</span>
							</p>
						</div>
						<div className={styles.accountInfoRow}>
							<p>
								<span>Date of Birth</span>
								<span>2022-02-08</span>
							</p>
						</div>
						<div className={styles.accountInfoRow}>
							<p>
								<span>Address</span>
								<span>
									Utako Police Station, Utako, Federal Capital Territory
								</span>
							</p>
						</div>
						<div className={styles.accountInfoRow}>
							<p>
								<span>Country</span>
								<span>NG</span>
							</p>
						</div>
						<div className={styles.accountInfoRow}>
							<p>
								<span>Zip code</span>
								<span>900108</span>
							</p>
						</div>
					</div>
				</div>
			</motion.section>
		</main>
	);
}

export default Account;
