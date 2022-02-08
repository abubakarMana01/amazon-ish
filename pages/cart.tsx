import { Button, Header } from "components";
import React from "react";
import styles from "styles/Cart.module.css";
import EmptyCartImage from "assets/images/empty-cart.svg";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Cart() {
	return (
		<main>
			<Header />

			<motion.section
				initial={{ opacity: 0, scale: 0.95 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ type: "tween" }}
				className={styles.cart__container}
			>
				<h1>Your Cart</h1>

				<div className={styles.cart__emptyContainer}>
					<div className={styles.cart__emptyImageWrapper}>
						<div className={styles.cart__emptyImageContainer}>
							<Image layout="fill" src={EmptyCartImage} alt="empty-cart" />
						</div>
					</div>

					<div className={styles.cart__emptyMessageContainer}>
						<h2>Your cart feels lonely.</h2>
						<p>
							Your shopping cart lives to serve. Give it purpose - fill it with
							books, electronicts, videos, etc. and make it happy.
						</p>

						<Button title="Continue shopping" handleClick={() => {}} />
					</div>
				</div>
			</motion.section>
		</main>
	);
}
