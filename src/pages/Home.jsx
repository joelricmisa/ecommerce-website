import { ProductData } from "../constants";
import { ProductList } from "../components";
import {
    Hero,
    BrowseByCategory,
    NewArrival,
    BigSpeaker,
    Services,
} from "./sections";

const Home = () => {
    return (
        <div className="animate">
            <Hero />
            <ProductList
                data={ProductData.flashSales}
                category={`Today's`}
                title="Flash Sales"
                timer={true}
            />
            <BrowseByCategory />
            <ProductList
                data={ProductData.bestSellingProducts}
                category={`This Month`}
                title="Best Selling Products"
            />
            <BigSpeaker />
            <ProductList
                data={ProductData.exploreOurProducts}
                category={`Our Products`}
                title="Explore Our Products"
            />
            <NewArrival />
            <Services />
        </div>
    );
};

export default Home;
