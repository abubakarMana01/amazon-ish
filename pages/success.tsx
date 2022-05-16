import React from "react";
import { motion } from "framer-motion";
import styles from "styles/Orders.module.css";
import { Header } from "components";
import { CheckCircleRounded } from "@mui/icons-material";

export default function Success() {
	return (
		<main>
			<Header />

			<motion.section
				initial={{ opacity: 0, y: -50 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ type: "spring" }}
				className={styles.orders__container}
			>
				<h1 style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
					<CheckCircleRounded color="success" fontSize="large" />
					Thank you, your order has been confirmed!
				</h1>

				<p style={{ maxWidth: 700, fontSize: "1rem" }}>
					Thank you for shopping with us!. We&apos;ll send you a confirmation
					once your order has been shipped. If you would like to check the
					status of your order, please click the link below.
				</p>
			</motion.section>
		</main>
	);
}

// export async function getServerSideProps(context: GetServerSidePropsContext) {
// let data;
// try {
// 	const res = await axios.get(
// 		`/pay/retrieve-checkout-session?session_id=${context.query.session_id}`
// 	);
// 	data = res.data;
// } catch (err: any) {
// 	console.log(err.response.data);
// }
// return {
// 	props: {
// 		data: data,
// 	},
// };
// }
