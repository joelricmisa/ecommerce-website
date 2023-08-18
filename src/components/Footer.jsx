import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
	return (
		<footer className="bg-black text-white">
			<div className=" p-32 grid grid-cols-5">
				<ul className="footerLinkParent">
					<li>
						<Link className="footerLinkHeader !font-bold">Exclusive</Link>
					</li>
					<li>
						<Link className="footerLink !text-xl">Subscribe</Link>
					</li>
					<li>
						<Link className="footerLink">Get 10% off your first order</Link>
					</li>
					<li>
						<label htmlFor="email" className="relative block">
							<span className="sr-only">Email</span>
							<button type="button" className="absolute inset-y-0 right-0 flex items-center pr-2">
								<img src="/src/assets/svg/send.svg" alt="send icon" />
							</button>
							<input
								className="block placeholder:text-sm bg-black w-full border broder-slate-300 rounded-md py-2 px-4 pr-9 shadow-sm focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 font-poppins text-base"
								type="email"
								name="email"
								placeholder="Enter your email"
							/>
						</label>
					</li>
				</ul>
				<ul className="footerLinkParent">
					<li>
						<Link className="footerLinkHeader">Support</Link>
					</li>
					<li>
						<Link className="footerLink">20 Aurora Compound St., Metro Manila, Marikina, Philippines.</Link>
					</li>
					<li>
						<Link className="footerLink">exclusive@gmail.com</Link>
					</li>
					<li>
						<Link className="footerLink">+99075-11111-77777</Link>
					</li>
				</ul>
				<ul className="footerLinkParent">
					<li>
						<Link className="footerLinkHeader">Account</Link>
					</li>
					<li>
						<Link className="footerLink">My Account</Link>
					</li>
					<li>
						<Link className="footerLink">Login / Register</Link>
					</li>
					<li>
						<Link className="footerLink">Cart</Link>
					</li>
					<li>
						<Link className="footerLink">Wishlist</Link>
					</li>
					<li>
						<Link className="footerLink">Shop</Link>
					</li>
				</ul>
				<ul className="footerLinkParent">
					<li>
						<Link className="footerLinkHeader">Quick Link</Link>
					</li>
					<li>
						<Link className="footerLink">Privacy Policy</Link>
					</li>
					<li>
						<Link className="footerLink">Terms Of Use</Link>
					</li>
					<li>
						<Link className="footerLink">FAQ</Link>
					</li>
					<li>
						<Link className="footerLink">Contact</Link>
					</li>
				</ul>
				<ul className="footerLinkParent">
					<li>
						<Link className="footerLinkHeader">Download App</Link>
					</li>
					<li>
						<Link className="footerLink !text-xs !opacity-75">Save $3 with App New User Only</Link>
					</li>
					<li className="flex">
						<img src="/src/assets/svg/github-qr.svg" className="w-1/2" alt="my github qr code" />
						<span className="flex flex-col items-center justify-center space-y-4 ml-4">
							<img src="/src/assets/logo/playstore.png" className="cursor-pointer" alt="playstore" />
							<img src="/src/assets/logo/appstore.png" className="cursor-pointer" alt="appstore" />
						</span>
					</li>
					<li className="flex space-x-5 w-full pt-5">
						<img src="/src/assets/svg/facebook.svg" className="cursor-pointer" alt="facebook icon" />
						<img src="/src/assets/svg/twitter.svg" className="cursor-pointer" alt="twitter icon" />
						<img src="/src/assets/svg/instagram.svg" className="cursor-pointer" alt="instagram icon" />
						<img src="/src/assets/svg/linkedin.svg" className="cursor-pointer" alt="linkedin icon" />
					</li>
				</ul>
			</div>
			<div className="flex items-center justify-center space-x-2 font-poppins text-base p-5 border-t opacity-40 ">
				<img src="/src/assets/svg/copyright.svg" alt="" />

				<h2>Copyright Joelric 2023. All right reserved</h2>
			</div>
		</footer>
	);
};

export default Footer;
