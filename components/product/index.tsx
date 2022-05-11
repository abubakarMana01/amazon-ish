import { Star } from "@mui/icons-material";
import Image from "next/image";
import React from "react";
import styles from "./styles.module.css";
import TextTruncate from "react-text-truncate";
import Link from "next/link";
import { motion } from "framer-motion";

type productTypes = {
	_id: string;
	image: string;
	price: string;
	title: string;
	rating: { rate: number };
	category: string;
};

interface IProps {
	data: productTypes;
}

export default function Product({ data }: IProps) {
	return (
		<motion.article
			initial={{ opacity: 0, scale: 0.9 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{ type: "tween" }}
			layout
			className={styles.product__container}
		>
			<Link href={"/products/" + data._id}>
				<a className={styles.product__link}>
					<div className={styles.product__imageContainer}>
						<Image
							src={data.image}
							width={230}
							height={230}
							objectFit="contain"
							alt="product image"
						/>
					</div>

					<div className={styles.product__details}>
						<div className={styles.product__category}>
							<span>{data.category}</span>
						</div>

						<h2 className={styles.product__title}>{data.title}</h2>

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
				</a>
			</Link>
		</motion.article>
	);
}
