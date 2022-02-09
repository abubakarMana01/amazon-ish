import React from "react";
import styles from "styles/Orders.module.css";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { Button, Header } from "components";

export default function Orders() {
	const router = useRouter();

	return (
		<main>
			<Header />

			<motion.section
				initial={{ opacity: 0, scale: 0.95 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ type: "tween" }}
				className={styles.orders__container}
			>
				<h1>Your Orders</h1>

				<p>You&apos;ve not made any orders</p>
				<Button
					title="Continue Shopping"
					handleClick={() => router.push("/")}
				/>
			</motion.section>
		</main>
	);
}
