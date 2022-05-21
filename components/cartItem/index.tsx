import React, { useState } from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { RemoveShoppingCart } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import { axios } from "config";
import { useRouter } from "next/router";
import { useAppContext } from "contexts";

type productTypes = {
	_id: string;
	image: string;
	price: string;
	title: string;
	rating: { rate: number };
	category: string;
};

interface IProps {
	itemId: string;
	data: productTypes;
	quantity: number;
	allProducts: [];
	setAllProducts: (products: []) => void;
}

export default function CartItem({
	itemId,
	data,
	quantity: q,
	allProducts,
	setAllProducts,
}: IProps) {
	const router = useRouter();
	const { cartItemsCount, setCartItemsCount } = useAppContext();

	const [quantity, setQuantity] = useState(q);

	const handleQuantityDecrease = () => {
		if (quantity > 0) {
			setQuantity((prev) => prev - 1);
		}
	};

	const handleQuantityIncrease = () => {
		setQuantity((prev) => prev + 1);
	};

	const handleRemoveItem = async (id: string) => {
		try {
			const res = await axios.delete(`/cart/${id}`, {
				headers: {
					"x-auth-token": localStorage.getItem("token")!,
				},
			});

			if (res.status === 200) {
				setCartItemsCount(cartItemsCount - 1);
				router.replace("/cart");

				const newProducts: any = allProducts.filter(
					(_: any) => _.product._id !== id
				);
				setAllProducts(newProducts);
			}
		} catch (err: any) {
			if (err.response) {
				alert("Failed. " + err.response.data.error.message);
				console.log(err.response.data.error.message);
			} else {
				alert("Failed. " + err.message);
				console.log(err.message);
			}
		}
	};

	return (
		<motion.article
			initial={{ opacity: 0, scale: 0.9 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{ type: "tween" }}
			layout
			className={styles.product__container}
		>
			<div className={styles.product__imageContainer}>
				<Image
					src={data.image}
					width="100%"
					height="100%"
					objectFit="contain"
					alt="Product"
				/>
			</div>

			<div className={styles.product__details}>
				<Link href={"/products/" + data._id}>
					<a className={styles.product__name}>{data.title}</a>
				</Link>

				<div className={styles.product__priceAndQuantityContainer}>
					<p className={styles.product__price}>{`$${data.price}`}</p>

					<div className={styles.product__quantityContainer}>
						<button onClick={handleQuantityDecrease}>-</button>
						<span>{quantity}</span>
						<button onClick={handleQuantityIncrease}>+</button>
					</div>
					<Tooltip title="Remove from cart" placement="right" arrow color="red">
						<div
							className={styles.product__removeItem}
							onClick={() => handleRemoveItem(data._id)}
						>
							<RemoveShoppingCart color="inherit" />
						</div>
					</Tooltip>
				</div>
			</div>
		</motion.article>
	);
}
