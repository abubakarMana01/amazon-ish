import { Star } from "@mui/icons-material";
import Image from "next/image";
import React from "react";
import styles from "./styles.module.css";
import TextTruncate from "react-text-truncate";

interface productTypes {
	id: string;
	image: string;
	price: string;
	title: string;
	rating: { rate: number };
	category: string;
}

export default function Product({ data }: { data: productTypes }) {
	return (
		<article className={styles.product__container}>
			<div className={styles.product__imageContainer}>
				<Image
					src={data.image}
					width={200}
					height={200}
					objectFit="contain"
					alt="product image"
				/>
			</div>

			<div className={styles.product__details}>
				<div className={styles.product__category}>
					<span>{data.category}</span>
				</div>

				<TextTruncate
					line={3}
					element="h2"
					containerClassName={styles.product__title}
					truncateText=""
					text={data.title}
				/>

				<div className={styles.product__priceAndRatingContainer}>
					<h3>{`$${data.price}`}</h3>

					<div className={styles.product__ratingContainer}>
						<Star />
						<span>{data.rating.rate}</span>
					</div>
				</div>
			</div>

			{data.rating.rate < 3 && (
				<div className={styles.product__banner}>
					<span>Offer!</span>
				</div>
			)}
		</article>
	);
}
