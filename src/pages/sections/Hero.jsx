import { sideLinks } from "../../constants";
import { Link } from "react-router-dom";
import { apple } from "../../assets/logo";
import { heroImg } from "../../assets/images";
import { useContext } from "react";
import { ShopContext } from "../../contexts/ShopContext";
const Hero = () => {
	const { setCategory } = useContext(ShopContext);
	return (
		<div className="w-full flex flex-wrap">
			<ul className="w-full lg:w-3/12 lg:border-r flex-center gap-5 justify-start flex-wrap padding">
				{sideLinks.map((link) => (
					<li key={link.label}>
						<Link className="link font-normal lg:no-underline" to={"/products"} onClick={() => setCategory(link.category)}>
							{link.label}
						</Link>
					</li>
				))}
			</ul>
			<div className="w-full lg:w-9/12 lg:p-10 ">
				<section className=" w-full bg-secondary h-full lg:h-[400px]  grid-rows-2 grid-cols-2 text-primary rounded-sm">
					<div className="w-full  h-full flex p-5 xl:p-10">
						<div className="mx-auto lg:pl-20 lg:pt-10 flex-center flex-col items-start gap-5 ">
							<p className="flex items-center">
								<span>
									<img src={apple} className="mr-4" alt="" />
								</span>
								iPhone 14 Series
							</p>
							<h1 className="text-2xl md:text-4xl lg:text-5xl  font-bold leading-tight">
								Up to 10% <br /> off Voucher
							</h1>
							<Link className="link block">Shop Now</Link>
						</div>
						<img src={heroImg} className="w-1/2 scale-75 lg:scale-100" alt="" />
					</div>

					<ul className="flex-center w-full bg-secondary gap-2 pb-5">
						<li className="heroBullet"></li>
						<li className="heroBullet"></li>
						<li
							className="h-4 w-4 bg-secondary rounded-full  ring-2 ring-primary
							 cursor-pointer "></li>
						<li className="heroBullet"></li>
						<li className="heroBullet"></li>
					</ul>
				</section>
			</div>
		</div>
	);
};

export default Hero;
