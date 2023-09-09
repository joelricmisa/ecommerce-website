import { sideLinks } from "../../constants";
import { Link } from "react-router-dom";
import { apple } from "../../assets/logo";
import { heroImg } from "../../assets/images";
import { useContext } from "react";
import { ShopContext } from "../../contexts/ShopContext";
const Hero = () => {
	const { setCategory } = useContext(ShopContext);
	return (
		<div className="flex flex-wrap w-full">
			<ul className="flex-wrap justify-start w-full gap-5 lg:w-3/12 lg:border-r flex-center padding">
				{sideLinks.map((link) => (
					<li key={link.label}>
						<Link
							className="font-normal link lg:no-underline"
							to={"/products"}
							onClick={() => setCategory(link.category)}>
							{link.label}
						</Link>
					</li>
				))}
			</ul>
			<div className="w-full lg:w-9/12 lg:p-10 ">
				<section className=" w-full bg-secondary h-full lg:h-[400px]  grid-rows-2 grid-cols-2 text-primary rounded-sm">
					<div className="flex w-full h-full p-5 xl:p-10">
						<div className="flex-col items-start gap-5 mx-auto lg:pl-20 lg:pt-10 flex-center ">
							<p className="flex items-center">
								<span>
									<img
										src={apple}
										className="mr-4"
										alt=""
									/>
								</span>
								iPhone 14 Series
							</p>
							<h1 className="text-2xl font-bold leading-tight md:text-4xl lg:text-5xl">
								Up to 10% <br /> off Voucher
							</h1>
							<Link className="block link">Shop Now</Link>
						</div>
						<img
							src={heroImg}
							className="w-1/2 scale-75 lg:scale-100"
							alt=""
						/>
					</div>

					<ul className="w-full gap-2 pb-5 flex-center bg-secondary">
						<li className="heroBullet"></li>
						<li className="heroBullet"></li>
						<li className="w-4 h-4 rounded-full cursor-pointer bg-secondary ring-2 ring-primary "></li>
						<li className="heroBullet"></li>
						<li className="heroBullet"></li>
					</ul>
				</section>
			</div>
		</div>
	);
};

export default Hero;
