import React from "react";
import { motion } from "framer-motion";
import styles from "styles/Cart.module.css";
import { Header } from "components";

export default function Success() {
	return (
		<main>
			<Header />

			<motion.section
				initial={{ opacity: 0, y: -50 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ type: "spring" }}
				className={styles.cart__container}
			>
				<h1>Payment successful</h1>
			</motion.section>
		</main>
	);
}
