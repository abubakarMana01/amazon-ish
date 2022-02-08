import React from "react";
import styles from "./styles.module.css";

export default function Button({
	title,
	handleClick,
}: {
	title: string;
	handleClick: () => void;
}) {
	return (
		<button onClick={handleClick} className={styles.button}>
			{title}
		</button>
	);
}
