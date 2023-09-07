import { ProductCard } from "./index";
import { timerImg } from "../assets/images";
import { v4 as uuid } from "uuid";
import { SvgIcon } from "./index";
import { arrowLeft, arrowRight } from "../assets/icons/SvgIconsList";
import Timer from "./Timer";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ShopContext } from "../contexts/ShopContext";

const ProductList = ({ data, category, title, timer, headerBtn, bottomBtn }) => {
	const { setCategory } = useContext(ShopContext);
	return (
		<div className="flex flex-col gap-8 padding mt-10 lg:mt-0 w-full  border-bottom ">
			<div
				className=" w-full text-tertiary-100 font-semibold flex-center !justify-start  h-10 
			">
				<span className="w-5 h-10 bg-tertiary-100 rounded-sm"></span>
				{category}
			</div>

			<div className="flex-center gap-2  flex-col items-start   w-full  ">
				{timer && <Timer days={3} hours={12} minutes={30} seconds={15} />}

				<div className={`${timer && "mt-5"} flex-between w-full `}>
					<span className={`font-inter text-2xl sm:text-3xl lg:text-4xl font-semibold`}>{title} </span>
					{headerBtn ? (
						<Link to={"/products"} className="button  mx-0 ml-auto " onClick={() => setCategory(title)}>
							View All
						</Link>
					) : (
						<span className="flex-center ">
							<SvgIcon icon={arrowLeft()} classVal={"icon"} />
							<SvgIcon icon={arrowRight()} classVal={"icon"} />
						</span>
					)}
				</div>
			</div>

			<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 xl:gap-10 ">
				{data.map((product) => {
					// console.log(product);
					return (
						<ProductCard
							key={uuid()}
							id={product.id}
							productName={product.productName}
							productImage={product.productImage}
							currentPrice={product.currentPrice}
							originalPrice={product.originalPrice}
							rating={product.rating}
							rateCount={product.rateCount}
							discountPercentage={product.discountPercentage}
							quantity={product.quantity}
							subTotal={product.subTotal}
						/>
					);
				})}
			</div>
			{bottomBtn && (
				<Link
					to={"/products"}
					className="button xl:px-20 mt-16 "
					onClick={() => {
						title === "Flash Sales" ? setCategory(title) : setCategory("all");
					}}>
					View All Products
				</Link>
			)}
		</div>
	);
};

export default ProductList;
