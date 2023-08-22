import { ProductData } from "../constants";
import { ProductList } from "../components";
import { Hero, BrowseByCategory, NewArrival, BigSpeaker, Services } from "./sections";

const Home = () => {
	return (
		<>
			<Hero />
			<ProductList data={ProductData.flashSales} category={`Today's`} title="Flash Sales" timer={true} bottomBtn={true} />
			<BrowseByCategory />
			<ProductList data={ProductData.bestSellingProducts} category={`This Month`} title="Best Selling Products" headerBtn={true} />
			<BigSpeaker />
			<ProductList data={ProductData.exploreOurProducts} category={`Our Products`} title="Explore Our Products" bottomBtn={true} />
			<NewArrival />
			<Services />
		</>
	);
};

export default Home;
