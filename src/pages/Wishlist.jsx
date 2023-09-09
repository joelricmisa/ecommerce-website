import { SvgIcon, WishlistCard } from "../components";
import { v4 as uuid } from "uuid";
import { ProductData } from "../constants";
import { trash, eye, box } from "../assets/icons/SvgIconsList";
import { ShopContext } from "../contexts/ShopContext";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Wishlist = () => {
	const { wishlistItems, addToCart } = useContext(ShopContext);
	const [addAll, setAddAll] = useState(false);

	useEffect(() => {
		addAll && wishlistItems.map((product) => addToCart(product));
	}, [addAll, addToCart]);

	return (
		<section className="animate">
			<div className="flex flex-col padding border-bottom ">
				<div className="flex-wrap h-10 mb-20 font-semibold text-tertiary-100 flex-center xl:flex-between ">
					<span className="text-xl text-black">Wishlist ({wishlistItems.length})</span>
					<button
						type="button"
						className="mx-0 button"
						onClick={() => setAddAll(!addAll)}>
						Move All To Cart
					</button>
				</div>
				{wishlistItems.length !== 0 ? (
					<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:gap-10 ">
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
									iconValue={trash("text-white fill-tertiary-200 ")}
									iconName={"trash"}
									quantity={product.quantity}
									subTotal={product.subTotal}
								/>
							);
						})}
					</div>
				) : (
					<p className="text-center flex-center">
						<SvgIcon icon={box("w-10 h-10")} /> Your wishlist is empty.
					</p>
				)}
			</div>

			<div className="flex flex-col padding ">
				<div className="mb-20 font-semibold text-tertiary-100 flex-between">
					<div className="flex-center">
						<span className="w-5 h-10 rounded-sm bg-tertiary-100"></span>
						Just For You
					</div>
					<Link
						to={"/products"}
						className="mx-0 button">
						See All
					</Link>
				</div>

				<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:gap-10 ">
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
								iconValue={eye("text-white fill-tertiary-200 ")}
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
