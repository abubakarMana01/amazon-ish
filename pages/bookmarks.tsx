import { Button, Header } from "components";
import React from "react";
import styles from "styles/Bookmarks.module.css";
import EmptyBookmarksImage from "assets/images/empty-bookmarks.svg";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

export default function Bookmarks() {
	const router = useRouter();

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

						<Button title="Go Shopping" handleClick={() => router.push("/")} />
					</div>
				</div>
			</motion.section>
		</main>
	);
}
