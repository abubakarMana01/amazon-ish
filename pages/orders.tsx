import React from "react";
import styles from "styles/Orders.module.css";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { Button, Header, Order } from "components";

export default function Orders() {
	const router = useRouter();
	const ordersPresent = true;

	return (
		<main>
			<Header />

			<motion.section
				initial={{ opacity: 0, y: -50 }}
				animate={{ opacity: 1, y: 0 }}
				// transition={{ type: "spring" }}
				className={styles.orders__container}
			>
				<h1>Your Orders</h1>

				{!ordersPresent ? (
					<>
						<p className={styles.orders__noOrderTitle}>
							You&apos;ve not made any orders
						</p>
						<Button
							title="Continue Shopping"
							handleClick={() => router.push("/")}
						/>
					</>
				) : (
					<section className={styles.orders__orderSummaryContainer}>
						<Order />
						<Order />
						<Order />
						<Order />
						<Order />
					</section>
				)}
			</motion.section>
		</main>
	);
}
