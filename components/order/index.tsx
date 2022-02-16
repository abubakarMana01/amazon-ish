import Image from "next/image";
import React from "react";
import styles from "./styles.module.css";
import Product from "assets/product.jpg";
import Product1 from "assets/product1.jpg";

export default function Order() {
	return (
		<article className={styles.orderSummary__container}>
			<h2 className={styles.orderSummary__orderId}>Order ID: 1644486597</h2>
			<p>Payment Method: Card</p>

			<div className={styles.orderSummary__itemsContainer}>
				<div>
					<div className={styles.orderSummary__quantity}>
						<span>x2</span>
					</div>
					<div className={styles.orderSummary__imageContainer}>
						<Image
							src={Product1}
							alt="product"
							objectFit="contain"
							layout="fill"
						/>
					</div>
					<p>DualSense Wireless Controller - Click. Charge. Play. Wireless</p>
				</div>

				<div>
					<div className={styles.orderSummary__quantity}>
						<span>x1</span>
					</div>
					<div className={styles.orderSummary__imageContainer}>
						<Image
							src={Product}
							alt="product"
							objectFit="contain"
							layout="fill"
						/>
					</div>
					<p>Samsung Galaxy S20 5G Factory Unlocked New Android Cell…</p>
				</div>
			</div>

			<div className={styles.orderSummary__amountContainer}>
				<p>Amount</p>
				<h3>$223.53</h3>
			</div>
		</article>
	);
}
