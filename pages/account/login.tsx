import React, { useEffect, useState } from "react";
import googleIcon from "assets/images/google-icon.svg";
import styles from "styles/Account.module.css";
import Image from "next/image";
import buttonStyles from "components/button/styles.module.css";
import { motion } from "framer-motion";
import { Button, Header } from "components";
import { axios } from "config";
import { useRouter } from "next/router";
import { useAppContext } from "contexts";
import jwtDecode from "jwt-decode";

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const router = useRouter();
	const appContext = useAppContext();

	const handleLogin = async (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.preventDefault();
		try {
			const res = await axios.post("/auth/login", {
				email,
				password,
			});

			localStorage.setItem("token", res.data.token);
			appContext.setUser(jwtDecode(res.data.token));
		} catch (err: any) {
			alert("Something went wrong");
			if (err.response) {
				console.log(err.response.data.error.message);
			} else {
				console.log(err.message);
			}
		}
	};

	useEffect(() => {
		if (appContext.user) router.push("/");

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [appContext.user]);

	return (
		<main>
			<Header />

			<motion.section
				initial={{ opacity: 0, y: -50 }}
				animate={{ opacity: 1, y: 0 }}
				className={styles.account__container}
			>
				<form className={styles.account__formContainer}>
					<h1>Log In</h1>

					<div className={styles.account__formInputContainer}>
						<input
							className={styles.account__formInput}
							type="email"
							name="email"
							id="email"
							autoComplete="off"
							placeholder=" "
							value={email}
							onChange={(e) => setEmail(e.target.value)}
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
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<label htmlFor="password">Password</label>
					</div>

					<Button title="LOG IN" handleClick={handleLogin} large />

					<a href="#">
						<span>Need help logging in?</span>
					</a>

					<div className={styles.divider} />

					<div className={styles.account_formSignUpButtonsContainer}>
						<button
							onClick={(e) => {
								e.preventDefault();
								router.push("/account/signup");
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
