import { useAppContext } from "contexts";
import React, { SetStateAction } from "react";
import styles from "./styles.module.css";

const categories = [
	"electronics",
	"jewelery",
	"men's clothing",
	"women's clothing",
	"appliances",
	"toys",
	"prime video",
	"movies & TV",
	"music",
	"software",
];

export default function Categories() {
	const appContext: any = useAppContext();

	return (
		<div className={styles.category__container}>
			<ul>
				<li
					style={{
						opacity: appContext.currentCategory === "all categories" ? 1 : 0.5,
						fontWeight:
							appContext.currentCategory === "all categories" ? "700" : "600",
					}}
					onClick={() => appContext.setCurrentCategory("all categories")}
				>
					All categories
					<div
						style={{
							opacity: appContext.currentCategory === "all categories" ? 1 : 0,
						}}
						className={styles.category__selectedIndicatorContainer}
					>
						<div className={styles.category__selectedIndicator} />
					</div>
				</li>
				{categories.map((category) => (
					<li
						style={{
							opacity: appContext.currentCategory === category ? 1 : 0.5,
							fontWeight:
								appContext.currentCategory === category ? "700" : "600",
						}}
						key={category}
						onClick={() => appContext.setCurrentCategory(category)}
					>
						{category}
						<div
							style={{
								opacity: appContext.currentCategory === category ? 1 : 0,
							}}
							className={styles.category__selectedIndicatorContainer}
						>
							<div className={styles.category__selectedIndicator} />
						</div>
					</li>
				))}
			</ul>
		</div>
	);
}
