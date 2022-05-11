import React, { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import styles from "styles/Bookmarks.module.css";
import { Button, Header, Product } from "components";
import EmptyBookmarksImage from "assets/images/empty-bookmarks.svg";
import { useAppContext } from "contexts";
import { axios } from "config";

interface IProps {
	bookmarkedProducts: [];
	error: any;
}

export default function Bookmarks({ bookmarkedProducts, error }: IProps) {
	const router = useRouter();

	const appContext = useAppContext();

	useEffect(() => {
		if (appContext.user)
			appContext.setBookmarkItemsCount(bookmarkedProducts.length);
		else appContext.setBookmarkItemsCount(0);
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

				{error ? (
					<h3>An error occured</h3>
				) : !appContext.user || !bookmarkedProducts.length ? (
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
							<Product key={product._id} data={product.bookmark} />
						))}
					</div>
				)}
			</motion.section>
		</main>
	);
}

export async function getServerSideProps() {
	let bookmarkedProducts = [];
	let error = null;
	try {
		const res = await axios.get("/bookmarks", {
			headers: {
				"x-auth-token":
					// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Mjc2YTAyOGNhMjE0M2I2Yzg2NGQ2YTMiLCJpYXQiOjE2NTE5NDE2MDR9.6Ne8AAvhuSg1r01vpJ-zIgA6kV30hd4yh_v4LP_RFnc",
					"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Mjc2OGY4OTQxYzJiNzdlNDVkMTRlYmYiLCJpYXQiOjE2NTE5MzcxNjF9.kbzUY1ZRHLb91mI1xjPdIGDL3M1NzPuBg4V3x_rDVeY",
			},
		});
		bookmarkedProducts = await res.data;
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
