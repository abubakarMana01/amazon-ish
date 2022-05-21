import React, { useEffect, useState } from "react";
import styles from "styles/Orders.module.css";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { Button, Header, Order } from "components";
import { axios } from "config";
import { useAppContext } from "contexts";

interface IProps {
	orders: [];
	error: any;
}

export default function Orders() {
	const router = useRouter();
	const appContext = useAppContext();

	const [orders, setOrders] = useState([]);
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (!appContext.user) return;

		(async () => {
			setIsLoading(true);
			const { orders: data, error } = await fetchOrders();
			setOrders(data);
			setError(error);
			setIsLoading(false);
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
				className={styles.orders__container}
			>
				<h1>Your Orders</h1>

				{error && <h3>An error occured</h3>}

				{!error && (
					<section className={styles.orders__orderSummaryContainer}>
						{orders.map((order: any) => (
							<Order key={order._id} data={order} />
						))}
					</section>
				)}

				{!error && !orders.length && !isLoading && (
					<>
						<p className={styles.orders__noOrderTitle}>
							You&apos;ve not made any orders
						</p>
						<Button
							title="Continue Shopping"
							handleClick={() => router.push("/")}
						/>
					</>
				)}
			</motion.section>
		</main>
	);
}

async function fetchOrders() {
	let orders = [];
	let error = null;

	try {
		const res = await axios.get("/orders", {
			headers: {
				"x-auth-token": localStorage.getItem("token")!,
			},
		});
		orders = res.data;
	} catch (err: any) {
		if (err.response) {
			console.log(err.response.data.error.message);
			error = JSON.stringify(err.response.data.error.message);
		} else {
			console.log(err.message);
			error = JSON.stringify(err.message);
		}
	}

	return { orders, error };
}

// export async function getServerSideProps() {
// 	let orders = [];
// 	let error = null;
// 	try {
// 		const res = await axios.get("/orders", {
// 			headers: {
// 				"x-auth-token":
// 					// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Mjc2YTAyOGNhMjE0M2I2Yzg2NGQ2YTMiLCJpYXQiOjE2NTE5NDE2MDR9.6Ne8AAvhuSg1r01vpJ-zIgA6kV30hd4yh_v4LP_RFnc",
// 					"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Mjc2OGY4OTQxYzJiNzdlNDVkMTRlYmYiLCJpYXQiOjE2NTE5MzcxNjF9.kbzUY1ZRHLb91mI1xjPdIGDL3M1NzPuBg4V3x_rDVeY",
// 			},
// 		});
// 		orders = res.data;
// 	} catch (err: any) {
// 		console.log(err.message);
// 		error = JSON.stringify(err);
// 	}

// 	return {
// 		props: {
// 			orders,
// 			error,
// 		},
// 	};
// }
