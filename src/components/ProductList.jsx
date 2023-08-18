import React from "react";
import Product from "./Product";
import { ProductData } from "../data/ProductData";
import { v4 as uuid } from "uuid";

const ProductList = ({ data, category, title, timer, headerBtn, bottomBtn }) => {
	return (
		<div className="flex flex-col pt-32 pb-16 mx-auto w-10/12   font-poppins border-b border-black/20">
			<div className=" grid-cols-12 text-secondary font-semibold flex items-center mb-5 h-10 ">
				<span className="w-5 h-10 bg-secondary inline-block rounded-sm mr-4"></span>
				{category}
			</div>
			<div className="flex items-end  font-inter text-4xl font-semibold mb-10 h-14">
				{title}
				{timer && <img src="/src/assets/images/timer.png" className="ml-10" alt="" />}
				{headerBtn ? (
					<button type="button" className="bg-secondary text-base text-white px-10 py-3 rounded-sm shaodw-sm ml-auto mr-10 font-poppins">
						View All
					</button>
				) : (
					<span className="flex ml-auto space-x-2 mr-10">
						<img src="/src/assets/svg/arrow-left.svg" className="bg-tertiary rounded-full p-1 cursor-pointer shadow-sm" alt="" />
						<img src="/src/assets/svg/arrow-right.svg" className="bg-tertiary rounded-full p-1 cursor-pointer shadow-sm" alt="" />
					</span>
				)}
			</div>
			<div className="grid grid-cols-4 px-10 gap-10  ">
				{data.map((product) => {
					console.log(product);
					return (
						<Product
							key={uuid()}
							productName={product.productName}
							productImage={product.productImage}
							currentPrice={product.currentPrice}
							originalPrice={product.originalPrice}
							rating={product.rating}
							rateCount={product.rateCount}
							discountPercentage={product.discountPercentage}
						/>
					);
				})}
			</div>
			{bottomBtn && (
				<button type="button" className="bg-secondary text-base text-white px-20 py-3 rounded-sm shaodw-sm mx-auto font-poppins mt-16 ">
					View All Products
				</button>
			)}
		</div>
	);
};

export default ProductList;
