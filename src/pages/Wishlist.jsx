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
		<section>
			<div className="flex flex-col padding mx-auto w-11/12   border-b border-black/20 ">
				<div className="text-secondary  font-semibold flex-between mb-20 h-10  ">
					<span className="text-black text-xl">Wishlist ({wishlistItems.length})</span>
					<button type="button" className="button mr-2" onClick={() => setAddAll(!addAll)}>
						Move All To Cart
					</button>
				</div>

				<div className="grid grid-cols-4 gap-10 ">
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

			<div className="flex flex-col padding mx-auto w-11/12   border-b border-black/20">
				<div className=" grid-cols-12 text-secondary font-semibold flex-between mb-20 h-10 ">
					<div className="flex-center">
						<span className="w-5 h-10 bg-secondary rounded-sm"></span>
						Just For You
					</div>
					<button type="button" className="button mr-2">
						See All
					</button>
				</div>

				<div className="grid grid-cols-4 gap-10 ">
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
