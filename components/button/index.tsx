import React from "react";
import styles from "./styles.module.css";

interface IProps {
	title: string;
	handleClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	large?: boolean;
}

export default function Button({ title, handleClick, large = false }: IProps) {
	return (
		<button
			onClick={handleClick}
			className={`${styles.button} ${large && styles.largeButton}`}
		>
			{title}
		</button>
	);
}
