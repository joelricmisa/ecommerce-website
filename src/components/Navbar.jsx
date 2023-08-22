import { NavLink } from "react-router-dom";
import { cart, search, wishlist } from "../assets/icons";
import { navLinks } from "../constants";
import { useState } from "react";
const Navbar = () => {
	const currentPath = window.location.pathname;
	const currentActive = navLinks.filter((link) => (link.href.includes("/") ? `${link.href}` : `/${link.href}`) === currentPath);
	const [activeNav, setActiveNav] = useState(currentActive[0].label);
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
						<li key={link.label} className={`navLink ${link.label === activeNav ? "font-semibold" : ""}`}>
							<NavLink to={link.href} onClick={() => handleActiveNav(link.label)}>
								{link.label}
							</NavLink>
						</li>
					))}
				</ul>
				<div className="flex space-x-4 col-span-4 ">
					<span className="w-3/4">
						<label htmlFor="search" className="relative block">
							<span className="sr-only">Search</span>
							<button type="button" className="absolute inset-y-0 right-0 flex items-center pr-2">
								<img src={search} alt="search icon" />
							</button>
							<input
								className="placeholder:text-slate-400 block placeholder:text-sm bg-gray-100 w-full border border-slate-300 rounded-md py-2 px-4 pr-9 shadow-sm focus:outline-none focus:border-gray-500 focus:ring-gray-500 focus:ring-1"
								placeholder="What are you looking for?"
								type="text"
								name="search"
							/>
						</label>
					</span>
					<button type="button">
						<img src={wishlist} alt="wishlish icon" />
					</button>
					<button type="button">
						<img src={cart} alt="cart icon" />
					</button>
				</div>
			</nav>
		</header>
	);
};

export default Navbar;
