import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";

interface IProps {
	data: {
		_id: string;
		paymentMethod: string;
		products: {
			_id: string;
			description: string;
			image: string;
			quantity: number;
		}[];
		total_amount: number;
		images: string[];
	};
}

export default function Order({ data: order }: IProps) {
	return (
		<article className={styles.orderSummary__container}>
			<h2 className={styles.orderSummary__orderId}>
				Order ID: {order._id.slice(0, 11)}
			</h2>
			<p>
				Payment Method:{" "}
				<span style={{ textTransform: "capitalize" }}>
					{order.paymentMethod}
				</span>
			</p>

			<div className={styles.orderSummary__itemsContainer}>
				{order.products.map((product, index) => (
					<div key={product._id}>
						<div className={styles.orderSummary__quantity}>
							<span>x{product.quantity}</span>
						</div>
						<div className={styles.orderSummary__imageContainer}>
							<Image
								src={order.images[index]}
								alt="product"
								objectFit="contain"
								layout="fill"
							/>
						</div>
						<p>{product.description}</p>
					</div>
				))}
			</div>

			<div className={styles.orderSummary__amountContainer}>
				<p>Amount</p>
				<h3>${order.total_amount / 100}</h3>
			</div>
		</article>
	);
}
