import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";

interface IProps {
	data: {
		_id: string;
		paymentMethod: string;
		products: {
			product: {
				_id: string;
				title: string;
				image: string;
				price: number;
			};
			quantity: number;
		}[];
	};
}

export default function Order({ data: order }: IProps) {
	const [totalPrice, setTotalPrice] = useState(0);

	useEffect(() => {
		order.products.forEach((_) => {
			setTotalPrice((prev: number) => prev + _.product.price * _.quantity);
		});

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

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
				{order.products.map(({ product, quantity }) => (
					<div key={product._id}>
						<div className={styles.orderSummary__quantity}>
							<span>x{quantity}</span>
						</div>
						<div className={styles.orderSummary__imageContainer}>
							<Image
								src={product.image}
								alt="product"
								objectFit="contain"
								layout="fill"
							/>
						</div>
						<p>{product.title}</p>
					</div>
				))}
			</div>

			<div className={styles.orderSummary__amountContainer}>
				<p>Amount</p>
				{totalPrice && <h3>{`$${totalPrice}`}</h3>}
			</div>
		</article>
	);
}
