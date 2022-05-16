/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useLayoutEffect, useState } from "react";
import styles from "./styles.module.css";
import { GetStaticPropsContext } from "next";
import {
	AddShoppingCartRounded,
	BookmarkAdded,
	BookmarkRounded,
	LabelImportantRounded,
	RemoveShoppingCart,
} from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import { Header, Product } from "components";
import { colors } from "constants/index";
import { motion } from "framer-motion";
import { axios } from "config";
import { useRouter } from "next/router";
import { useAppContext } from "contexts";

interface IProps {
	id: string;
	product: {
		id: string;
		description: string;
		image: string;
		title: string;
		price: string;
		category: string;
	};
	suggestedProducts: [];
}

export default function ProductDetail({
	id,
	product,
	suggestedProducts,
}: IProps) {
	const [isProductInCart, setIsProductInCart] = useState(false);
	const [isProductBookmarked, setIsProductBookmarked] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const appContext = useAppContext();
	const router = useRouter();

	// Split the product description string to have an array
	const description = product.description;
	const splitDescription = description.split("; ");

	// Filter suggestions to have only products with the same category
	let filteredSuggestions: any[] = [];
	suggestedProducts.forEach((suggestedProduct: any) => {
		if (
			suggestedProduct.category === product.category &&
			suggestedProduct.id !== product.id
		) {
			filteredSuggestions.push(suggestedProduct);
		}
	});

	const handleCartButtonPress = async () => {
		if (!appContext.user) return router.push("/account");

		try {
			if (isProductInCart) {
				const res = await axios.delete(`/cart/${id}`, {
					headers: {
						"x-auth-token": localStorage.getItem("token")!,
					},
				});
				if (res.status === 200) {
					appContext.setCartItemsCount(appContext.cartItemsCount - 1);
					setIsProductInCart(false);
					setIsLoading(false);
				}
				return;
			}

			setIsLoading(true);
			const res = await axios.post(
				"/cart",
				{
					_id: id,
				},
				{
					headers: {
						"x-auth-token": localStorage.getItem("token")!,
					},
				}
			);
			if (res.status === 201 || res.status === 200) {
				appContext.setCartItemsCount(appContext.cartItemsCount + 1);
				setIsProductInCart(true);
				setIsLoading(false);
			}
		} catch (err: any) {
			setIsLoading(false);
			if (err.response) {
				console.log(err.response.data.error.message);
				alert("Failed. " + err.response.data.error.message);
			} else {
				console.log(err.response.data);
				alert("Failed. " + err.response.data);
			}
		}
	};

	const handleBookmarkPress = async () => {
		if (!appContext.user) return router.push("/account");

		try {
			if (isProductBookmarked) {
				const res = await axios.delete(`/bookmarks/${id}`, {
					headers: {
						"x-auth-token": `${localStorage.getItem("token")}`,
					},
				});
				if (res.status === 200) {
					appContext.setBookmarkItemsCount(appContext.bookmarkItemsCount - 1);
					setIsProductBookmarked(false);
				}
				return;
			}

			const res = await axios.post(
				"/bookmarks",
				{ _id: id },
				{
					headers: {
						"x-auth-token": localStorage.getItem("token")!,
					},
				}
			);
			if (res.status === 201 || res.status === 200) {
				appContext.setBookmarkItemsCount(appContext.bookmarkItemsCount + 1);
				setIsProductBookmarked(true);
			}
		} catch (err: any) {
			if (err.response) {
				console.log(err.response.data.error.message);
				alert("Failed. " + err.response.data.error.message);
			} else {
				console.log(err.response.data);
				alert("Failed. " + err.response.data);
			}
		}
	};

	useEffect(() => {
		(async function () {
			if (appContext.user) {
				// Check if product is in cart
				try {
					const res = await axios.get(`/cart/${id}`, {
						headers: { "x-auth-token": localStorage.getItem("token")! },
					});

					res.data.message === "Found"
						? setIsProductInCart(true)
						: setIsProductInCart(false);
				} catch (err: any) {
					console.log(err.message);
				}

				// Check if product is in bookmarks
				try {
					const res = await axios.get(`/bookmarks`, {
						headers: { "x-auth-token": localStorage.getItem("token")! },
					});

					const isBookmarked = res.data.find((_: any) => _.bookmark._id === id);
					isBookmarked
						? setIsProductBookmarked(true)
						: setIsProductBookmarked(false);
				} catch (err: any) {
					console.log(err.message);
				}
			}
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id, product.id]);

	return (
		<main>
			<Header />

			<motion.section
				initial={{ opacity: 0, y: -50 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ type: "spring" }}
				className={styles.productDetail__container}
			>
				<div>
					<div className={styles.productDetail__imageContainer}>
						<img
							src={product.image}
							alt={"Image of " + product.title}
							style={{ objectFit: "contain", width: "100%", height: "100%" }}
						/>
					</div>
				</div>

				<div className={styles.productDetail__info}>
					<h1>{product.title}</h1>

					<ul className={styles.productDetails__description}>
						{splitDescription.map((singleDesc, index) => (
							<li key={index}>{singleDesc}</li>
						))}
					</ul>

					<div className={styles.productDetail__actions}>
						<h2 className={styles.productDetail__price}>
							{"$" + product.price}
						</h2>
						<p className={styles.productDetail__deliveryMessage}>
							<LabelImportantRounded />
							Free Delivery Available - Abuja, Nigeria 900101
						</p>

						<div className={styles.productDetail__buttons}>
							<button
								style={{
									backgroundColor: isProductInCart ? "#dc143c" : "#f99900",
								}}
								className={`${styles.productDetail__cartButton} ${
									isLoading && styles.productDetail__cartButtonLoading
								}`}
								onClick={handleCartButtonPress}
							>
								{!isProductInCart ? (
									<AddShoppingCartRounded />
								) : (
									<RemoveShoppingCart />
								)}
								{!isProductInCart ? "Add to Cart" : "Remove from cart"}
							</button>

							<Tooltip placement="right" title="Bookmark" arrow>
								<button
									className={styles.productDetail__bookmarkButton}
									onClick={handleBookmarkPress}
								>
									{!isProductBookmarked ? (
										<BookmarkRounded
											style={{
												fill: colors?.dark,
												stroke: colors?.white,
												strokeWidth: 2,
												fontSize: 20,
											}}
										/>
									) : (
										<BookmarkAdded
											style={{
												fill: colors?.dark,
												stroke: colors?.white,
												strokeWidth: 2,
												fontSize: 20,
											}}
										/>
									)}
								</button>
							</Tooltip>
						</div>
					</div>
				</div>
			</motion.section>

			{filteredSuggestions.length && (
				<section className={styles.productDetail__suggestionsContainer}>
					<h2>You might also like</h2>
					<div className={styles.product__suggestions}>
						{filteredSuggestions?.slice(0, 3).map((suggestedProduct: any) => {
							if (suggestedProduct.category === product.category) {
								return (
									<Product key={suggestedProduct.id} data={suggestedProduct} />
								);
							}
							return null;
						})}
					</div>
				</section>
			)}
		</main>
	);
}

export async function getStaticPaths() {
	const res = await axios.get("/products");
	const data = res.data;

	const paths = data.map((product: { _id: string }) => ({
		params: {
			id: product._id.toString(),
		},
	}));

	return {
		paths,
		fallback: false,
	};
}

export async function getStaticProps(context: GetStaticPropsContext) {
	const id = context.params?.id;

	// Fetch single product
	const productResponse = await axios.get("/products/" + id);
	const product = productResponse.data;

	// Fetch all products to be filtered
	const productsResponse = await axios.get("/products");
	const products = productsResponse.data;

	return {
		props: {
			id,
			product,
			suggestedProducts: products,
		},
	};
}
