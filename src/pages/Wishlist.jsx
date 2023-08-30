import { WishlistCard } from "../components";
import { v4 as uuid } from "uuid";
import { ProductData } from "../constants";
import { trash, eye } from "../assets/icons/SvgIconsList";
import { ShopContext } from "../contexts/ShopContext";
import { useContext, useEffect, useState } from "react";

const Wishlist = () => {
	const { wishlistItems, addToCart, cartItems } = useContext(ShopContext);
	const [addAll, setAddAll] = useState(false);

	useEffect(() => {
		addAll && wishlistItems.map((product) => addToCart(product));
	}, [addAll, addToCart]);

	return (
		<section className="animate">
			<div className="flex flex-col padding border-bottom  ">
				<div className="text-tertiary-100  font-semibold flex-center xl:flex-between flex-wrap mb-20 h-10  ">
					<span className="text-black text-xl">Wishlist ({wishlistItems.length})</span>
					<button type="button" className="button mx-0" onClick={() => setAddAll(!addAll)}>
						Move All To Cart
					</button>
				</div>

				<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 xl:gap-10 ">
					{wishlistItems.map((product) => {
						return (
							<WishlistCard
								key={uuid()}
								id={product.id}
								productName={product.productName}
								productImage={product.productImage}
								currentPrice={product.currentPrice}
								originalPrice={product.originalPrice}
								discountPercentage={product.discountPercentage}
								iconValue={trash()}
								iconName={"trash"}
								quantity={product.quantity}
								subTotal={product.subTotal}
							/>
						);
					})}
				</div>
			</div>

			<div className="flex flex-col padding ">
				<div className=" text-tertiary-100 font-semibold flex-between mb-20 ">
					<div className="flex-center">
						<span className="w-5 h-10 bg-tertiary-100 rounded-sm"></span>
						Just For You
					</div>
					<button type="button" className="button mx-0">
						See All
					</button>
				</div>

				<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 xl:gap-10  ">
					{ProductData.flashSales.map((product) => {
						return (
							<WishlistCard
								key={uuid()}
								id={product.id}
								productName={product.productName}
								productImage={product.productImage}
								currentPrice={product.currentPrice}
								originalPrice={product.originalPrice}
								rating={product.rating}
								rateCount={product.rateCount}
								discountPercentage={product.discountPercentage}
								iconValue={eye()}
								iconName={"eye"}
								quantity={product.quantity}
								subTotal={product.subTotal}
							/>
						);
					})}
				</div>
			</div>
		</section>
	);
};

export default Wishlist;
