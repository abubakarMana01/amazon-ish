/* eslint-disable @next/next/no-img-element */
import {
	AddShoppingCartRounded,
	BookmarkRounded,
	LabelImportantRounded,
} from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import { Header, Product } from "components";
import { colors } from "constants/index";
import { useAppContext } from "contexts";
import { GetStaticPropsContext } from "next";
import React from "react";
import styles from "./styles.module.css";

export default function ProductDetail({
	product,
	suggestedProducts,
}: {
	product: {
		description: string;
		image: string;
		title: string;
		price: string;
		category: string;
	};
	suggestedProducts: [];
}) {
	const appContext = useAppContext();

	// Split the product description string to have an array
	const description = product.description;
	const splitDescription = description.split("; ");

	// Filter suggestions to have only products with the same category
	let filteredSuggestions: any[] = [];
	suggestedProducts.forEach((suggestedProduct: any) => {
		if (suggestedProduct.category === product.category) {
			filteredSuggestions.push(suggestedProduct);
		}
	});

	return (
		<main>
			<Header />

			<section className={styles.productDetail__container}>
				<div>
					<div className={styles.productDetail__imageContainer}>
						<img
							src={product.image}
							alt={"image of" + product.title}
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
							<button className={styles.productDetail__cartButton}>
								<AddShoppingCartRounded />
								Add to Cart
							</button>

							<Tooltip placement="right" title="Bookmark" arrow>
								<button className={styles.productDetail__bookmarkButton}>
									<BookmarkRounded
										style={{
											fill: colors?.dark,
											stroke: colors?.white,
											strokeWidth: 2,
											fontSize: 20,
										}}
									/>
								</button>
							</Tooltip>
						</div>
					</div>
				</div>
			</section>

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
		</main>
	);
}

export async function getStaticPaths() {
	const res = await fetch("https://fakestoreapi.com/products");
	const data = await res.json();

	const paths = data.map((product: { id: string }) => ({
		params: {
			id: product.id.toString(),
		},
	}));

	return {
		paths,
		fallback: false,
	};
}

export async function getStaticProps(context: GetStaticPropsContext) {
	const id = context.params?.id;

	const productResponse = await fetch(
		"https://fakestoreapi.com/products/" + id
	);
	const product = await productResponse.json();

	const productsResponse = await fetch("https://fakestoreapi.com/products");
	const products = await productsResponse.json();

	return {
		props: {
			product,
			suggestedProducts: products,
		},
	};
}
