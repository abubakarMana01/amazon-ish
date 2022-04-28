import { Button, CartItem, Header, Product } from "components";
import React, { useEffect } from "react";
import styles from "styles/Cart.module.css";
import EmptyCartImage from "assets/images/empty-cart.svg";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { DoneAll } from "@mui/icons-material";
import { useAppContext } from "contexts";

interface IProps {
	products: [];
	error: any;
}

export default function Cart({ products, error }: IProps) {
	const router = useRouter();

	const appContext = useAppContext();

	useEffect(() => {
		appContext.setCartItemsCount(products.length);
	}, []);

	return (
		<main>
			<Header />

			<motion.section
				initial={{ opacity: 0, y: -50 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ type: "spring" }}
				className={styles.cart__container}
			>
				<h1>Your Cart</h1>

				<div className={styles.cart__contentContainer}>
					<div
						className={`${styles.cart__leftContainer} ${
							!products.length && styles.cart__leftContainerEmpty
						}`}
					>
						{!products.length && !error ? (
							<div className={styles.cart__emptyImageContainer}>
								<Image layout="fill" src={EmptyCartImage} alt="empty-cart" />
							</div>
						) : (
							<div className={styles.cart__productsContainer}>
								{products.map((product: any) => (
									<CartItem key={product.id} data={product} />
								))}
							</div>
						)}
					</div>

					<div className={styles.cart__rightContainer}>
						{!products.length && !error ? (
							<>
								<h2>Your cart feels lonely.</h2>
								<p style={{ marginBottom: "3rem" }}>
									Your shopping cart lives to serve. Give it purpose - fill it
									with books, electronicts, videos, etc. and make it happy.
								</p>

								<Button
									title="Continue shopping"
									handleClick={() => router.push("/")}
								/>
							</>
						) : (
							<div className={styles.cart__details}>
								<h2>Checkout</h2>

								<div className={styles.cart__deliveryMessage}>
									<DoneAll fontSize="small" />
									<span>Your order is eligible for Free Delivery</span>
								</div>

								<h3 className={styles.cart__total}>Sub-Total: $95.98</h3>
								<p>Number of items: {products.length}</p>
								<p style={{ opacity: 0.5, marginBottom: "1rem" }}>
									This price is exclusive of taxes. GST will be added during
									checkout.
								</p>

								<Button title="Proceed to Payment" handleClick={() => {}} />
							</div>
						)}
					</div>
				</div>
			</motion.section>
		</main>
	);
}

export async function getStaticProps() {
	let products = [];
	let error = null;
	try {
		const res = await fetch("https://fakestoreapi.com/products");
		products = await res.json();
		products.length = 3;
	} catch (err: any) {
		console.log(err.message);
		error = JSON.stringify(err);
	}

	return {
		props: {
			products,
			error,
		},
	};
}
