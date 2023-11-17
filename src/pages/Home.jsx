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
                dataId={"6554b1bfdb069acd41999b0d"}
                category={`Today's`}
                title="Flash Sales"
                timer={true}
            />
            <BrowseByCategory />
            <ProductList
                dataId={"6555b76dbe32834a738b38d1"}
                category={`This Month`}
                title="Best Selling Products"
            />
            <BigSpeaker />
            <ProductList
                dataId={"6555b8dfbe32834a738b38fe"}
                category={`Our Products`}
                title="Explore Our Products"
            />
            <NewArrival />
            <Services />
        </div>
    );
};

export default Home;
