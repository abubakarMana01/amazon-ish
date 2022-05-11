/* eslint-disable @next/next/no-img-element */
import { Categories, Header, Product } from "components";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styles from "styles/Home.module.css";
import slide1 from "assets/carousel/1.jpg";
import slide2 from "assets/carousel/2.jpg";
import slide3 from "assets/carousel/3.jpg";
import slide4 from "assets/carousel/4.jpg";
import slide5 from "assets/carousel/5.jpg";
import slide6 from "assets/carousel/6.jpg";
import { useAppContext } from "contexts";
import { axios } from "config";

interface IProps {
	products: [];
	error: any;
}

const Home = ({ products, error }: IProps) => {
	const carouselImages = [slide1, slide2, slide3, slide4, slide5, slide6];
	// products = products.sort(() => Math.random() - 0.5);

	const appContext: any = useAppContext();

	return (
		<main className={styles.home__container}>
			<Header />

			<Carousel
				showStatus={false}
				infiniteLoop={true}
				showArrows={false}
				autoPlay={true}
				showThumbs={false}
				interval={5000}
				stopOnHover
				transitionTime={200}
			>
				{carouselImages.map((carouselImage) => (
					<div className={styles.carousel__image} key={carouselImage.src}>
						<img src={carouselImage.src} alt="carousel" />
					</div>
				))}
			</Carousel>

			<Categories />

			<section className={styles.products__container}>
				{!products.length && error ? (
					<div>An error occured</div>
				) : (
					<>
						{products.map((product: any) => {
							if (appContext.currentCategory === "all categories") {
								return <Product key={product.id} data={product} />;
							} else if (product.category === appContext.currentCategory) {
								return <Product key={product.id} data={product} />;
							} else {
								return null;
							}
						})}
					</>
				)}
			</section>
		</main>
	);
};

export default Home;

export async function getStaticProps() {
	let products = [];
	let error = null;
	try {
		const res = await axios.get("/products");
		products = await res.data;
	} catch (err: any) {
		console.log(err.message);
		error = JSON.stringify(err);
	}

	return {
		props: {
			products,
			error,
		},
	};
}
