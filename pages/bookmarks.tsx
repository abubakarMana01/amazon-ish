import { Button, Header, Product } from "components";
import React from "react";
import styles from "styles/Bookmarks.module.css";
import EmptyBookmarksImage from "assets/images/empty-bookmarks.svg";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useAppContext } from "contexts";

interface IProps {
	bookmarkedProducts: [];
	error: any;
}

export default function Bookmarks({ bookmarkedProducts, error }: IProps) {
	const router = useRouter();

	const appContext = useAppContext();
	appContext.setBookmarkItemsCount(bookmarkedProducts.length);

	return (
		<main>
			<Header />

			<motion.section
				initial={{ opacity: 0, scale: 0.95 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ type: "tween" }}
				className={styles.bookmarks__container}
			>
				<h1>Bookmarks</h1>

				{!bookmarkedProducts.length && !error ? (
					<div className={styles.bookmarks__emptyContainer}>
						<div className={styles.bookmarks__emptyImageWrapper}>
							<div className={styles.bookmarks__emptyImageContainer}>
								<Image
									layout="fill"
									src={EmptyBookmarksImage}
									alt="empty-bookmarks"
								/>
							</div>
						</div>

						<div className={styles.bookmarks__emptyMessageContainer}>
							<h2>It&apos;s empty here.</h2>
							<p>
								Something&apos;s catching your eye? Add your favorite items to
								Bookmarks, and check them out anytime you wish.
							</p>

							<Button
								title="Go Shopping"
								handleClick={() => router.push("/")}
							/>
						</div>
					</div>
				) : (
					<div className={styles.bookmarks__productsContainer}>
						{bookmarkedProducts.map((product: any) => (
							<Product key={product.id} data={product} />
						))}
					</div>
				)}
			</motion.section>
		</main>
	);
}

export async function getStaticProps() {
	let bookmarkedProducts = [];
	let error = null;
	try {
		const res = await fetch("https://fakestoreapi.com/products");
		bookmarkedProducts = await res.json();
		bookmarkedProducts.length = 2;
	} catch (err: any) {
		console.log(err.message);
		error = JSON.stringify(err);
	}

	return {
		props: {
			bookmarkedProducts,
			error,
		},
	};
}
