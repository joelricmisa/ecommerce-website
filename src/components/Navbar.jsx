import { NavLink, Link } from "react-router-dom";

import { navLinks, navIconLinks } from "../constants";
import { useContext, useEffect, useState } from "react";
import { SvgIcon } from "./index";
import { cart, search, heart, menu } from "../assets/icons/SvgIconsList";
import { ShopContext } from "../contexts/ShopContext";

const Navbar = () => {
	const { cartItems, wishlistItems } = useContext(ShopContext);
	const [currentPath, setCurrentPath] = useState(window.location.pathname);
	const currentActive = navLinks.filter((link) => (link.href.includes("/") ? `${link.href}` : `/${link.href}`) === currentPath);
	const [activeNav, setActiveNav] = useState(currentActive[0]?.label);
	const [toggle, setToggle] = useState(false);

	useEffect(() => {
		setCurrentPath(window.location.pathname);
		currentActive;
		setActiveNav(currentActive[0]?.label);
	}, [currentActive, currentPath]);

	const handleActiveNav = (label = "") => {
		setActiveNav(label);
		setToggle(!toggle);
	};

	return (
		<>
			<button className="flex-center xl:hidden hidden" onClick={() => setToggle(!toggle)}>
				<SvgIcon icon={menu("w-10 h-10")} />
			</button>

			<header className="sticky top-0 z-50 bg-white border-bottom shadow-md">
				<div className="bg-black text-white p-2 xl:p-4 flex-center flex-col xl:flex-row justify-evenly text-center w-full">
					<p>
						Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
						<a href="" className="link ml-2">
							ShopNow
						</a>
					</p>
					<select className="bg-black cursor-pointer px-2 text-sm self-end" name="english" id="">
						<option value="english">English</option>
						<option value="tagalog">Tagalog</option>
					</select>
				</div>
				<div className="w-full py-8 flex-between padding-x xl:hidden ">
					<NavLink to="/" className="font-bold text-2xl font-inter">
						Exclusive
					</NavLink>
					<button className="flex-center xl:hidden" onClick={() => setToggle(!toggle)}>
						<SvgIcon icon={menu("w-10 h-10")} />
					</button>
				</div>
				<nav
					className={`${
						toggle ? "fixed xl:static xl:h-auto top-0 w-full h-[100dvh] z-50 visible bg-white" : "h-0 xl:h-auto xl:visible  invisible"
					} transition-all flex flex-col xl:flex-row xl:items-center  xl:border-b-2 padding-x xl:h-auto `}>
					<div className="w-full xl:w-3/12 py-8 flex-between ">
						<NavLink to="/" className="font-bold text-2xl font-inter">
							Exclusive
						</NavLink>
						<button className="flex-center xl:hidden" onClick={() => setToggle(!toggle)}>
							<SvgIcon icon={menu("w-10 h-10")} />
						</button>
					</div>

					<div className={`flex-center xl:w-4/12 w-full  justify-start `}>
						<label htmlFor="search" className="relative block w-full xl:w-11/12 ">
							<span className="sr-only">Search</span>
							<button type="button" className="flex-center absolute inset-y-0 right-0  pr-2">
								<SvgIcon icon={search()} />
							</button>
							<input
								className="input placeholder:text-slate-400 placeholder:text-sm border border-slate-300 rounded-md py-2 pr-9 "
								placeholder="What are you looking for?"
								type="text"
								name="search"
							/>
						</label>
					</div>

					<div className={`flex-center flex-col xl:flex-row xl:items-center items-start  xl:w-5/12 xl:py-8 py-5 w-full h-full justify-between`}>
						<ul className="xl:flex-center xl:gap-6  xl:w-4/5 justify-start  w-full ">
							{navLinks.map((link) => (
								<li key={link.label}>
									<NavLink className="navLink " to={link.href} onClick={() => handleActiveNav(link.label)}>
										<span className={` relative  ${link.label === activeNav ? "navActive" : "navNotActive"} `}>{link.label}</span>
									</NavLink>
								</li>
							))}
						</ul>
						<div className="flex-center xl:justify-end self-end xl:self-center  xl:w-1/5">
							{navIconLinks.map((navIcon) => (
								<Link
									key={navIcon.label}
									to={navIcon.href}
									className={`grid-center block ml-1 w-[30px] relative ${currentPath === `/${navIcon.href}` ? "navActive" : "navNotActive"}`}
									onClick={() => handleActiveNav()}>
									<span
										className={`z-20 absolute -top-1 bg-red-400  text-sm text-white rounded-full font-medium  ${
											navIcon.storageName === "wishlistItems"
												? wishlistItems.length <= 99
													? "px-1.5 -right-2"
													: "px-1 -right-4"
												: navIcon.storageName === "cartItems"
												? cartItems.length <= 99
													? "px-1.5 -right-2"
													: "px-1 -right-4"
												: ""
										} `}>
										{navIcon.storageName === "wishlistItems"
											? wishlistItems.length <= 99
												? wishlistItems.length
												: "99"
											: navIcon.storageName === "cartItems"
											? cartItems.length <= 99
												? cartItems.length
												: "99"
											: ""}
									</span>
									<SvgIcon icon={navIcon.icon(`w-8 h-8 text-black ${currentPath === `/${navIcon.href}` ? "fill-black" : ""}`)} />
								</Link>
							))}
						</div>
					</div>
				</nav>
			</header>
		</>
	);
};

export default Navbar;
