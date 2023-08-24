import { NavLink, useLocation, Link } from "react-router-dom";

import { navLinks } from "../constants";
import { useContext, useEffect, useState } from "react";
import { SvgIcon } from "./index";
import { cart, search, heart } from "../assets/icons/SvgIconsList";
import { wishlistData, cartData } from "../constants";
import { ShopContext } from "../contexts/ShopContext";

const Navbar = () => {
	const { state } = useLocation();
	const filePath = window.location.pathname;
	const [currentPath, setCurrentPath] = useState(filePath);
	const currentActive = navLinks.filter((link) => (link.href.includes("/") ? `${link.href}` : `/${link.href}`) === currentPath);
	const [activeNav, setActiveNav] = useState(currentActive[0]?.label);
	const wishlistPath = "/wishlist";
	const cartPath = "/cart";
	const { cartItems } = useContext(ShopContext);
	useEffect(() => {
		// run side-effect
		setCurrentPath(window.location.pathname);
		currentActive;
		setActiveNav(currentActive[0]?.label);
		// console.log(currentPath);
		// console.log("nagrerender");
	}, [currentActive, currentPath, state]);

	const handleActiveNav = (label) => {
		setActiveNav(label);
	};
	// console.log(currentActive);
	// console.log(navLinks);

	return (
		<header>
			<div className="bg-black text-white p-4 text-center w-full">
				<p>
					Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
					<a href="" className="underline ml-2 font-semibold">
						ShopNow
					</a>
					<select className="bg-black ml-40 cursor-pointer px-2 font-poppins text-sm" name="english" id="">
						<option value="english">English</option>
						<option value="tagalog">Tagalog</option>
					</select>
				</p>
			</div>
			<nav className="grid grid-cols-12  mx-auto items-center p-5 mt-2 border-b-2">
				<NavLink to="/" className="font-bold text-2xl font-inter col-span-3  pl-24  -ml-2">
					Exclusive
				</NavLink>
				<ul className="flex space-x-8 col-span-5 pl-6">
					{navLinks.map((link) => (
						<li key={link.label} className={`navLink`}>
							<NavLink
								className={` relative   ${
									link.label === activeNav
										? "after:absolute after:-bottom-[10%] after:left-0 after:bg-black after:h-[1.5px] after:w-full font-medium"
										: "after:absolute after:-bottom-[10%] after:left-[50%] after:-translate-x-[50%]  after:w-0 after:bg-black after:h-[1.5px] hover:after:w-full after:transition-all after:duration-300"
								} `}
								to={link.href}
								onClick={() => handleActiveNav(link.label)}>
								{link.label}
							</NavLink>
						</li>
					))}
				</ul>

				<div className="flex gap-5 col-span-4 ">
					<span className="w-3/4">
						<label htmlFor="search" className="relative block">
							<span className="sr-only">Search</span>
							<button type="button" className="absolute inset-y-0 right-0 flex items-center pr-2">
								<SvgIcon icon={search()} />
							</button>
							<input
								className="placeholder:text-slate-400 block placeholder:text-sm bg-gray-100 w-full border border-slate-300 rounded-md py-2 px-4 pr-9 shadow-sm focus:outline-none focus:border-gray-500 focus:ring-gray-500 focus:ring-1"
								placeholder="What are you looking for?"
								type="text"
								name="search"
							/>
						</label>
					</span>

					<Link
						to={"wishlist"}
						className={`grid place-items-center ml-1 relative ${
							filePath === wishlistPath
								? "after:absolute after:bottom-1 after:left-0 after:bg-black after:h-[1.5px] after:w-full "
								: "after:absolute after:bottom-1 after:left-[50%] after:-translate-x-[50%]  after:w-0 after:bg-black after:h-[1.5px] hover:after:w-full after:transition-all after:duration-300"
						}`}>
						<span
							className={`z-20 absolute top-0 bg-red-400 font-poppins text-sm text-white rounded-full font-medium  ${
								wishlistData.length <= 99 ? "px-1.5 -right-2" : "px-1 -right-4"
							} `}>
							{wishlistData.length <= 99 ? wishlistData.length : "99"}
						</span>
						<SvgIcon icon={heart(`w-8 h-8 text-black ${filePath === wishlistPath ? "fill-black" : ""}`)} classVal={`relative `} />
					</Link>

					<Link
						to={"/cart"}
						className={`grid place-items-center relative ${
							filePath === cartPath
								? "after:absolute after:bottom-1 after:left-0 after:bg-black after:h-[1.5px] after:w-full "
								: "after:absolute after:bottom-1 after:left-[50%] after:-translate-x-[50%]  after:w-0 after:bg-black after:h-[1.5px] hover:after:w-full after:transition-all after:duration-300"
						}`}>
						<span
							className={`z-20 absolute top-0 bg-red-400 font-poppins text-sm text-white rounded-full font-medium  ${
								Object.entries(cartItems).length <= 99 ? "px-1.5 -right-2" : "px-1 -right-4"
							} `}>
							{Object.entries(cartItems).length <= 99 ? Object.entries(cartItems).length : "99"}
						</span>

						<SvgIcon icon={cart(`w-8 h-8 text-black ${filePath === cartPath ? "fill-black" : ""}`)} />
					</Link>
				</div>
			</nav>
		</header>
	);
};

export default Navbar;
