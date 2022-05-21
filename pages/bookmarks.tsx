import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import styles from "styles/Bookmarks.module.css";
import { Button, Header, Product } from "components";
import EmptyBookmarksImage from "assets/images/empty-bookmarks.svg";
import { useAppContext } from "contexts";
import { axios } from "config";

interface IProps {
	products: [];
	error: any;
}

export default function Bookmarks() {
	const router = useRouter();

	const appContext = useAppContext();

	const [products, setProducts] = useState([]);
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (!appContext.user) return;

		(async () => {
			setIsLoading(true);
			const { products, error } = await fetchBookmarks();
			setProducts(products);
			setError(error);
			setIsLoading(false);
			appContext.setBookmarkItemsCount(products.length);
		})();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<main>
			<Header />

			<motion.section
				initial={{ opacity: 0, y: -50 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ type: "spring" }}
				className={styles.bookmarks__container}
			>
				<h1>Bookmarks</h1>

				{error && <h3>An error occured</h3>}

				{!error && (
					<>
						{/* Show empty cart image if there are no products */}
						{(!appContext.user || (!products.length && !isLoading)) && (
							<div className={styles.bookmarks__emptyContainer}>
								<div className={styles.bookmarks__emptyImageWrapper}>
									<div className={styles.bookmarks__emptyImageContainer}>
										<Image
											layout="fill"
											src={EmptyBookmarksImage}
											alt="empty-bookmarks"
											priority
										/>
									</div>
								</div>

								<div className={styles.bookmarks__emptyMessageContainer}>
									<h2>It&apos;s empty here.</h2>
									<p>
										Something&apos;s catching your eye? Add your favorite items
										to Bookmarks, and check them out anytime you wish.
									</p>

									<Button
										title="Go Shopping"
										handleClick={() => router.push("/")}
									/>
								</div>
							</div>
						)}

						{/* Show products after loading and user exists */}
						{appContext.user && products.length !== 0 && (
							<div className={styles.bookmarks__productsContainer}>
								{products.map((product: any) => (
									<Product key={product._id} data={product.bookmark} />
								))}
							</div>
						)}
					</>
				)}
			</motion.section>
		</main>
	);
}

async function fetchBookmarks() {
	let products = [];
	let error = null;

	try {
		const res = await axios.get("/bookmarks", {
			headers: {
				"x-auth-token": localStorage.getItem("token")!,
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

	return { products, error };
}

// export async function getServerSideProps() {
// 	let bookmarkedProducts = [];
// 	let error = null;
// 	try {
// 		const res = await axios.get("/bookmarks", {
// 			headers: {
// 				"x-auth-token":
// 					// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Mjc2YTAyOGNhMjE0M2I2Yzg2NGQ2YTMiLCJpYXQiOjE2NTE5NDE2MDR9.6Ne8AAvhuSg1r01vpJ-zIgA6kV30hd4yh_v4LP_RFnc",
// 					"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Mjc2OGY4OTQxYzJiNzdlNDVkMTRlYmYiLCJpYXQiOjE2NTE5MzcxNjF9.kbzUY1ZRHLb91mI1xjPdIGDL3M1NzPuBg4V3x_rDVeY",
// 			},
// 		});
// 		bookmarkedProducts = await res.data;
// 	} catch (err: any) {
// 		console.log(err.message);
// 		error = JSON.stringify(err);
// 	}

// 	return {
// 		props: {
// 			bookmarkedProducts,
// 			error,
// 		},
// 	};
// }
