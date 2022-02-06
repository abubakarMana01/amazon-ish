import React from "react";
import styles from "./styles.module.css";

export default function Dropdown({ options }: { options: string[] }) {
	return (
		<select className={styles.dropdown__select}>
			{options.map((option) => (
				<option key={option} value={option.toLowerCase()}>
					{option}
				</option>
			))}
		</select>
	);
}
