import { Button, Header } from "components";
import React from "react";
import styles from "styles/Bookmarks.module.css";
import EmptyBookmarksImage from "assets/images/empty-bookmarks.svg";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Bookmarks() {
	return (
		<main>
			<Header />

			<motion.section
				initial={{ scale: 0.8 }}
				animate={{ scale: 1 }}
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
						<h2>{"It's empty here."}</h2>
						<p>
							Something's catching your eye? Add your favorite items to
							Bookmarks, and check them out anytime you wish.
						</p>

						<Button title="Go Shopping" handleClick={() => {}} />
					</div>
				</div>
			</motion.section>
		</main>
	);
}
