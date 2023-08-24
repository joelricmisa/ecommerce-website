import { WishlistCard } from "../components";
import { v4 as uuid } from "uuid";
import { ProductData, wishlistData } from "../constants";
import { trash, eye } from "../assets/icons/SvgIconsList";

const Wishlist = () => {
	return (
		<section>
			<div className="flex flex-col padding mx-auto w-11/12   font-poppins border-b border-black/20 ">
				<div className="text-secondary  font-semibold flex items-center mb-20 h-10  ">
					<span className="text-black text-xl">Wishlist ({wishlistData.length})</span>

					<button type="button" className="bg-secondary text-base text-white px-10 py-3 rounded-sm shaodw-sm ml-auto font-poppins mr-2">
						Move All To Bag
					</button>
				</div>

				<div className="grid grid-cols-4 gap-10 ">
					{wishlistData.map((product) => {
						console.log(product);
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
								quantity={product.quantity}
							/>
						);
					})}
				</div>
			</div>

			<div className="flex flex-col padding mx-auto w-11/12   font-poppins border-b border-black/20">
				<div className=" grid-cols-12 text-secondary font-semibold flex items-center mb-20 h-10 ">
					<span className="w-5 h-10 bg-secondary inline-block rounded-sm mr-4"></span>
					Just For You
					<button type="button" className="bg-secondary text-base text-white px-10 py-3 rounded-sm shaodw-sm ml-auto mr-2 font-poppins">
						See All
					</button>
				</div>

				<div className="grid grid-cols-4 gap-10 ">
					{ProductData.flashSales.map((product) => {
						console.log(product);
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
								quantity={product.quantity}
							/>
						);
					})}
				</div>
			</div>
		</section>
	);
};

export default Wishlist;
