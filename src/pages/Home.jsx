import React from "react";
import { Link } from "react-router-dom";
import ProductList from "../components/ProductList";
import { ProductData } from "../data/ProductData";
import Category from "../components/Category";
import { v4 as uuid } from "uuid";
const Home = () => {
	return (
		<>
			<div className="grid grid-cols-12">
				<ul className="col-span-3 border-r font-poppins ml-auto p-24 pt-10 pb-0 space-y-5">
					<li>
						<Link className="homeSideLink" to={""}>
							Woman&apos;s Fashion
						</Link>
					</li>
					<li>
						<Link className="homeSideLink" to={""}>
							Men&apos;s Fashion
						</Link>
					</li>
					<li>
						<Link className="homeSideLink" to={""}>
							Electronics
						</Link>
					</li>
					<li>
						<Link className="homeSideLink" to={""}>
							Home & Lifestyle
						</Link>
					</li>
					<li>
						<Link className="homeSideLink" to={""}>
							Medicine
						</Link>
					</li>
					<li>
						<Link className="homeSideLink" to={""}>
							Sports & Outdoor
						</Link>
					</li>
					<li>
						<Link className="homeSideLink" to={""}>
							Baby’s & Toys
						</Link>
					</li>
					<li>
						<Link className="homeSideLink" to={""}>
							Groceries & Pets
						</Link>
					</li>
					<li>
						<Link className="homeSideLink" to={""}>
							Health & Beauty
						</Link>
					</li>
				</ul>
				<div className="col-span-9 p-10">
					<section className="w-11/12 bg-black h-[350px] grid-rows-2 grid-cols-2 text-white rounded-sm">
						<div className="col-span-2  h-full flex p-10">
							<div className="w-1/2 pl-20 pt-10 space-y-5">
								<p className="flex items-center">
									<span>
										<img src="/src/assets/logo/apple.png" className="mr-5" alt="" />
									</span>
									iPhone 14 Series
								</p>
								<h1 className="text-5xl w-3/4 font-bold leading-light">Up to 10% off Voucher</h1>
								<Link className="underline underline-offset-4 block">Shop Now</Link>
							</div>
							<img src="/src/assets/images/hero.png" className="w-1/2 " alt="" />
						</div>
						<div className="col-span-2 ">
							<ul className="flex bg-black justify-center space-x-2 pb-4">
								<li className="bullet"></li>
								<li className="bullet"></li>
								<li
									className="h-4 w-4 bg-black rounded-full  ring-2 ring-white
							 cursor-pointer "></li>
								<li className="bullet"></li>
								<li className="bullet"></li>
							</ul>
						</div>
					</section>
				</div>
			</div>
			<ProductList data={ProductData.flashSales} category={`Today's`} title="Flash Sales" timer={true} bottomBtn={true} />

			<div className="flex flex-col pt-32 pb-16 mx-auto w-10/12 font-poppins border-b border-black/20">
				<div className=" grid-cols-12 text-secondary font-semibold flex items-center mb-5 h-10 ">
					<span className="w-5 h-10 bg-secondary inline-block rounded-sm mr-4"></span>
					Categories
				</div>
				<div className="flex items-end  font-inter text-4xl font-semibold mb-10 h-14">
					Browse By Category
					<span className="flex ml-auto space-x-2 mr-10">
						<img src="/src/assets/svg/arrow-left.svg" className="bg-tertiary rounded-full p-1 cursor-pointer shadow-sm" alt="" />
						<img src="/src/assets/svg/arrow-right.svg" className="bg-tertiary rounded-full p-1 cursor-pointer shadow-sm" alt="" />
					</span>
				</div>
				<div className="grid grid-cols-6 px-10 gap-10 py-10 ">
					{ProductData.browseByCategory.map((category) => {
						console.log(category);
						return <Category key={uuid()} categoryName={category.categoryName} categoryImage={category.categoryImage} />;
					})}
				</div>
			</div>

			<ProductList data={ProductData.bestSellingProducts} category={`This Month`} title="Best Selling Products" headerBtn={true} />

			<div className="flex  mx-auto mt-28 w-10/12 font-poppins bg-black h-[500px] rounded-sm">
				<div className="flex flex-col w-1/2 p-24 space-y-10">
					<h3 className="text-tertiary text-base font-medium">Categories</h3>
					<h1 className="text-5xl text-white font-inter font-semibold leading-snug">Enhance Your Music Experience</h1>
					<button type="button" className="bg-secondary py-3 px-4 w-1/2 text-white font-semibold">
						Buy Now!
					</button>
				</div>
				<div className="w-1/2 relative">
					<span className="absolute inset-0 z-10 w-[150%] -left-32">
						<img src="/src/assets/images/light.png" alt="light" />
					</span>
					<img className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20" src="/src/assets/images/jbl-speaker.png" alt="" />
				</div>
			</div>
			<ProductList data={ProductData.exploreOurProducts} category={`Our Products`} title="Explore Our Products" bottomBtn={true} />

			<div className="flex flex-col pt-32 pb-16 mx-auto w-10/12 font-poppins ">
				<div className=" grid-cols-12 text-secondary font-semibold flex items-center mb-5 h-10 ">
					<span className="w-5 h-10 bg-secondary inline-block rounded-sm mr-4"></span>
					Featured
				</div>
				<div className="flex items-end  font-inter text-4xl font-semibold mb-10 h-14">New Arrival</div>
				<div className="grid w-full grid-cols-2 h-[600px]  gap-5 text-white rounded-sm">
					<div className=" bg-black flex items-end justify-center relative rounded-sm">
						<img src="/src/assets/images/playstation.png" alt="" />
						<span className="bottom-0 left-0 absolute p-10 flex flex-col justify-end space-y-2 bg-black/30 h-full w-full">
							<h1 className="text-2xl font-semibold">PlayStation 5</h1>
							<p className="text-sm w-1/2">Black and White version of the PS5 coming out on sale.</p>
							<Link className="text-base font-medium underline underline-offset-2">Shop Now</Link>
						</span>
					</div>
					<div className="  grid grid-rows-2 ">
						<div className="bg-black flex items-end justify-end relative rounded-sm">
							<img src="/src/assets/images/attractive-woman.png" alt="" />
							<span className="bottom-0 left-0 absolute p-5 flex flex-col justify-end space-y-2 bg-black/30 h-full w-full">
								<h1 className="text-2xl font-semibold">Women’s Collections</h1>
								<p className="text-sm w-1/2">Featured woman collections that give you another vibe.</p>
								<Link className="text-base font-medium underline underline-offset-2">Shop Now</Link>
							</span>
						</div>
						<div className=" grid grid-cols-2 gap-5 mt-5">
							<div className="bg-black grid place-items-center relative rounded-sm">
								<img src="/src/assets/images/speaker.png" alt="" />
								<span className="bottom-0 left-0 absolute p-5 flex flex-col justify-end space-y-2 bg-black/30 h-full w-full">
									<h1 className="text-2xl font-semibold">Speakers</h1>
									<p className="text-sm w-full">Amazon wireless speakers.</p>
									<Link className="text-base font-medium underline underline-offset-2">Shop Now</Link>
								</span>
							</div>
							<div className="bg-black grid place-items-center relative rounded-sm">
								<img src="/src/assets/images/gucci-perfume.png" alt="" />
								<span className="bottom-0 left-0 absolute p-5 flex flex-col justify-end space-y-2 bg-black/30 h-full w-full">
									<h1 className="text-2xl font-semibold">Perfume</h1>
									<p className="text-sm w-full capitalize">Gucci Intense Oud Edp</p>
									<Link className="text-base font-medium underline underline-offset-2">Shop Now</Link>
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="grid w-8/12 mx-auto grid-cols-3 py-20 pb-40 gap-10">
				<div className="flex flex-col justify-center items-center space-y-2">
					<img src="/src/assets/logo/delivery.png" className="mb-4" alt="" />
					<h2 className="font-bold text-xl">FREE AND FAST DELIVERY</h2>
					<p className="text-sm">Free delivery for all orders over $140</p>
				</div>
				<div className="flex flex-col justify-center items-center space-y-2">
					<img src="/src/assets/logo/customer-service.png" className="mb-4" alt="" />
					<h2 className="font-bold text-xl">24/7 CUSTOMER SERVICE</h2>
					<p className="text-sm">Friendly 24/7 customer support</p>
				</div>
				<div className="flex flex-col justify-center items-center space-y-2">
					<img src="/src/assets/logo/money-guarantee.png" className="mb-4" alt="" />
					<h2 className="font-bold text-xl">MONEY BACK GUARANTEE</h2>
					<p className="text-sm">We reurn money within 30 days</p>
				</div>
			</div>
		</>
	);
};

export default Home;
