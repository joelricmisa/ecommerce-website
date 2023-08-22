import { sideLinks } from "../../constants";
import { Link } from "react-router-dom";
import { apple } from "../../assets/logo";
import { heroImg } from "../../assets/images";
const Hero = () => {
	return (
		<div className="grid grid-cols-12">
			<ul className="col-span-3 border-r font-poppins ml-auto p-24 pt-10 pb-0 space-y-5">
				{sideLinks.map((link) => (
					<li key={link.label}>
						<Link className="homeSideLink" to={link.href}>
							{link.label}
						</Link>
					</li>
				))}
			</ul>
			<div className="col-span-9 p-10">
				<section className="w-11/12 bg-black h-[350px] grid-rows-2 grid-cols-2 text-white rounded-sm">
					<div className="col-span-2  h-full flex p-10">
						<div className="w-1/2 pl-20 pt-10 space-y-5 ">
							<p className="flex items-center">
								<span>
									<img src={apple} className="mr-5" alt="" />
								</span>
								iPhone 14 Series
							</p>
							<h1 className="text-5xl  font-bold leading-tight">
								Up to 10% <br /> off Voucher
							</h1>
							<Link className="underline underline-offset-4 block">Shop Now</Link>
						</div>
						<img src={heroImg} className="w-1/2 " alt="" />
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
	);
};

export default Hero;
