import React, { useEffect, useState } from "react";
import styles from "styles/Account.module.css";
import googleIcon from "assets/images/google-icon.svg";
import buttonStyles from "components/button/styles.module.css";
import { motion } from "framer-motion";
import { Button, Header } from "components";
import Image from "next/image";
import { axios } from "config";
import { useRouter } from "next/router";
import jwtDecode from "jwt-decode";
import { useAppContext } from "contexts";

export default function Signup() {
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");

	const router = useRouter();
	const appContext = useAppContext();

	const handleSignup = async (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.preventDefault();
		try {
			const res = await axios.post("/auth/register", {
				name,
				email,
				password,
			});

			const loginRes = await axios.post("/auth/login", {
				email: res.data.email,
				password,
			});
			localStorage.setItem("token", loginRes.data.token);
			appContext.setUser(jwtDecode(loginRes.data.token));
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
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<form className={styles.account__formContainer}>
						<h1>Create your account</h1>

						<div className={styles.account__formInputContainer}>
							<input
								className={styles.account__formInput}
								type="text"
								name="name"
								id="name"
								autoComplete="off"
								placeholder=" "
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
							<label htmlFor="name">Name</label>
						</div>
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

						<Button title="SIGN UP" handleClick={handleSignup} large />

						<a href="#">
							<span>Already have an account?</span>
						</a>

						<div className={styles.divider} />

						<div className={styles.account_formSignUpButtonsContainer}>
							<button
								onClick={(e) => {
									e.preventDefault();
									router.push("/account/login");
								}}
								className={`${buttonStyles.button} ${buttonStyles.largeButton} ${styles.form__buttonSignUp}`}
							>
								LOG IN INSTEAD
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
				</div>
			</motion.section>
		</main>
	);
}
