import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { DoneAll } from "@mui/icons-material";
import { motion } from "framer-motion";
import styles from "styles/Cart.module.css";
import { Button, CartItem, Header } from "components";
import emptyCartImage from "assets/images/empty-cart.svg";
import { useAppContext } from "contexts";
import { axios } from "config";
import { loadStripe } from "@stripe/stripe-js";

interface IProps {
	products: [];
	error: any;
}

export default function Cart({ products, error }: IProps) {
	const router = useRouter();

	const appContext = useAppContext();
	const [totalPrice, setTotalPrice] = useState(0);
	const [numberOfItems, setNumberOfItems] = useState(0);

	useEffect(() => {
		if (appContext.user) appContext.setCartItemsCount(products.length);
		else appContext.setCartItemsCount(0);

		setTotalPrice(0);
		setNumberOfItems(0);

		products.forEach((_: any) => {
			setNumberOfItems((prev: number) => prev + _.quantity);
			setTotalPrice((prev: number) => prev + _.product.price * _.quantity);
		});

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [appContext.user, products.length]);

	const handlePayment = async () => {
		const requestBody = products.map((_: any) => ({
			productId: _.product._id,
			quantity: _.quantity,
		}));

		try {
			const res = await axios.post(
				"/pay/create-checkout-session",
				{
					items: requestBody,
				},
				{
					headers: {
						"x-auth-token": `${localStorage.getItem("token")}`,
					},
				}
			);
			const stripe = await loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_KEY}`);
			await stripe?.redirectToCheckout({
				sessionId: res.data.id,
				// billingAddressCollection: "required",
				// clientReferenceId: `${localStorage.getItem("token")}`,
			});
		} catch (err: any) {
			if (err.response) {
				console.log(err.response.data.error.message);
			}
			alert("Payment failed " + err.message);
			console.log(err.message);
		}
	};

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

				{error ? (
					<h3>An error occured. {error}</h3>
				) : (
					<div className={styles.cart__contentContainer}>
						<div
							className={`${styles.cart__leftContainer} ${
								!products.length && styles.cart__leftContainerEmpty
							}`}
						>
							{(!appContext.user || !products.length) && (
								<div className={styles.cart__emptyImageContainer}>
									<Image layout="fill" src={emptyCartImage} alt="empty-cart" />
								</div>
							)}

							{!appContext.user ||
								(products.length !== 0 && (
									<div className={styles.cart__productsContainer}>
										{products.map((_: any) => (
											<CartItem
												itemId={_._id}
												key={_._id}
												data={_.product}
												quantity={_.quantity}
											/>
										))}
									</div>
								))}
						</div>

						<div className={styles.cart__rightContainer}>
							{!appContext.user || products.length === 0 ? (
								<>
									<h2>Your cart feels lonely.</h2>
									<p style={{ marginBottom: "3rem" }}>
										Your shopping cart lives to serve. Give it purpose - fill it
										with books, electronics, videos, etc. and make it happy.
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

									<h3 className={styles.cart__total}>
										{`Sub-Total: $${totalPrice.toFixed(2)}`}
									</h3>
									<p>Number of items: {numberOfItems}</p>
									<p style={{ opacity: 0.5, marginBottom: "1rem" }}>
										This price is exclusive of taxes. GST will be added during
										checkout.
									</p>

									<Button
										title="Proceed to Payment"
										handleClick={handlePayment}
									/>
								</div>
							)}
						</div>
					</div>
				)}
			</motion.section>
		</main>
	);
}

export async function getServerSideProps() {
	let products = [];
	let error = null;

	try {
		const res = await axios.get("/cart", {
			headers: {
				"x-auth-token":
					// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Mjc2YTAyOGNhMjE0M2I2Yzg2NGQ2YTMiLCJpYXQiOjE2NTE5NDE2MDR9.6Ne8AAvhuSg1r01vpJ-zIgA6kV30hd4yh_v4LP_RFnc",
					"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Mjc2OGY4OTQxYzJiNzdlNDVkMTRlYmYiLCJpYXQiOjE2NTE5MzcxNjF9.kbzUY1ZRHLb91mI1xjPdIGDL3M1NzPuBg4V3x_rDVeY",
			},
		});
		products = res.data;
	} catch (err: any) {
		if (err.response) {
			console.log(err.response.data.error.message);
			error = JSON.stringify(err.response.data.error.message);
		} else {
			console.log(err.message);
			error = JSON.stringify(err.message);
		}
	}

	return {
		props: {
			products,
			error,
		},
	};
}
