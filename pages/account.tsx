import React from "react";
import styles from "styles/Account.module.css";
import googleIcon from "assets/images/google-icon.svg";
import buttonStyles from "../components/button/styles.module.css";
import { motion } from "framer-motion";
import { Button, Header } from "components";
import Image from "next/image";

export default function Account() {
	return (
		<main>
			<Header />

			<motion.section
				initial={{ opacity: 0, scale: 0.95 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ type: "tween" }}
				className={styles.account__container}
			>
				<form className={styles.account__formContainer}>
					<h1>Log In</h1>

					<div className={styles.account__formInputContainer}>
						<input
							className={styles.account__formInput}
							type="text"
							name="email"
							id="email"
							autoComplete="off"
							placeholder=" "
						/>
						<label htmlFor="email">Email address</label>
					</div>

					<div className={styles.account__formInputContainer}>
						<input
							className={styles.account__formInput}
							type="password"
							name="password"
							id="password"
							placeholder=" "
						/>
						<label htmlFor="password">Password</label>
					</div>

					<Button title="LOG IN" handleClick={() => {}} large />

					<a href="#">
						<span>Need help logging in?</span>
					</a>

					<div className={styles.divider} />

					<div className={styles.account_formSignUpButtonsContainer}>
						<button
							onClick={(e) => {
								e.preventDefault();
							}}
							className={`${buttonStyles.button} ${buttonStyles.largeButton} ${styles.form__buttonSignUp}`}
						>
							SIGN UP
						</button>

						<button
							onClick={(e) => {
								e.preventDefault();
							}}
							className={`${buttonStyles.button} ${buttonStyles.largeButton} ${styles.form__buttonSignUp} ${styles.form__buttonGoogle}`}
						>
							<Image src={googleIcon} width={24} height={24} alt="google" />
							SIGN IN WITH GOOGLE
						</button>
					</div>
				</form>
			</motion.section>
		</main>
	);
}
