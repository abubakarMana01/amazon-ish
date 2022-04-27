import React from "react";
import styles from "./styles.module.css";

export default function Disclaimer() {
  return (
    <div className={styles.disclaimer__container}>
      <div className={styles.disclaimer__inner}>
        <span>Disclaimer:</span> This is not the official Amazon Store. It is a
        redesign, built purely for educational purpose.
      </div>
    </div>
  );
}
