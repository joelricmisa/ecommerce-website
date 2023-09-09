import { NavLink, Link, useLocation } from "react-router-dom";

import { navLinks, navIconLinks, shopProductsData } from "../constants";
import { useContext, useEffect, useState } from "react";
import { SvgIcon } from "./index";
import { search, menu, user, signIn, signUp } from "../assets/icons/SvgIconsList";
import { ShopContext } from "../contexts/ShopContext";

const Navbar = () => {
	const location = useLocation();
	const { cartItems, wishlistItems, setCategory } = useContext(ShopContext);

	const [currentPath, setCurrentPath] = useState(location.pathname);
	const currentActive = navLinks.filter((link) => (link.href.includes("/") ? `${link.href}` : `/${link.href}`) === currentPath);
	const [activeNav, setActiveNav] = useState(currentActive[0]?.label);
	const [toggle, setToggle] = useState(false);
	const [searchInput, setSearchInput] = useState("");
	const [searchResult, setSearchResult] = useState([]);
	const [searchFocus, setSearchFocus] = useState(false);
	const [userIconFocus, setUserIconFocus] = useState(false);
	const [showIconNum, setShowIconNum] = useState(true);

	useEffect(() => {
		setCurrentPath(location.pathname);
		currentActive;
		setActiveNav(currentActive[0]?.label);
	}, [currentActive, currentPath]);

	useEffect(() => {
		const filtered = shopProductsData.filter((product) => product.productName.toLowerCase().includes(searchInput.toLowerCase()));

		filtered.length !== 0 ? setSearchResult(filtered) : setSearchResult([]);
	}, [searchInput]);

	const handleActiveNav = (label = "") => {
		setActiveNav(label);
		setToggle(!toggle);
		setCategory("all");
	};

	return (
		<>
			<header className="sticky top-0 z-50 shadow-md bg-primary border-bottom">
				<div className="flex-col w-full p-2 text-center bg-secondary text-primary xl:p-4 flex-center xl:flex-row justify-evenly">
					<p>
						Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
						<a
							href=""
							className="ml-2 link">
							ShopNow
						</a>
					</p>
					<select
						className="self-end px-2 text-sm cursor-pointer bg-secondary"
						name="english"
						id="">
						<option value="english">English</option>
						<option value="tagalog">Tagalog</option>
					</select>
				</div>
				<div className="w-full py-3 flex-between padding-x xl:hidden ">
					<NavLink
						to="/"
						className="text-2xl font-bold font-inter">
						Exclusive
					</NavLink>
					<button
						className="flex-center xl:hidden"
						onClick={() => setToggle(!toggle)}>
						<SvgIcon icon={menu("w-10 h-10")} />
					</button>
				</div>
				<nav
					className={`${
						toggle ? "fixed xl:static xl:h-auto top-0 w-full h-[100dvh] z-50 visible bg-primary" : "h-0 xl:h-auto xl:visible  invisible"
					} transition-all flex flex-col xl:flex-row xl:items-center  xl:border-b-2 padding-x xl:h-auto`}>
					<div className="w-full py-3 xl:w-3/12 flex-between ">
						<NavLink
							to="/"
							className="text-2xl font-bold font-inter">
							Exclusive
						</NavLink>
						<button
							className="flex-center xl:hidden"
							onClick={() => setToggle(!toggle)}>
							<SvgIcon icon={menu("w-10 h-10")} />
						</button>
					</div>

					<div className={`flex-center xl:w-4/12 w-full  justify-start  relative`}>
						<label
							htmlFor="search"
							className="relative block w-full xl:w-11/12 ">
							<span className="sr-only">Search</span>
							<button
								type="button"
								className="absolute inset-y-0 right-0 pr-2 flex-center">
								<SvgIcon icon={search()} />
							</button>
							<input
								className="py-2 border rounded-md input placeholder:text-slate-400 placeholder:text-sm border-slate-300 pr-9"
								placeholder="What are you looking for?"
								type="text"
								name="search"
								autoComplete="off"
								value={searchInput}
								onChange={(e) => setSearchInput(e.target.value)}
								onFocus={() => setSearchFocus(true)}
								onBlur={() =>
									setTimeout(() => {
										setSearchFocus(false);
										setSearchInput("");
									}, 150)
								}
							/>
						</label>
						{searchInput && searchFocus && (
							<div className="absolute top-[100%] bg-extraColor rounded-md z-50 w-full xl:w-11/12">
								{searchResult.length === 0 ? (
									<span className="searchResultLink ">
										No results found <SvgIcon icon={search()} />
									</span>
								) : (
									searchResult.map((item, index) => (
										<Link
											key={index}
											className="searchResultLink "
											to={`/products/${item.id}`}
											onClick={() => {
												setSearchFocus(false);
												setSearchInput("");
											}}>
											{item.productName} <SvgIcon icon={search()} />
										</Link>
									))
								)}
							</div>
						)}
					</div>

					<div
						className={`flex-center flex-col xl:flex-row xl:items-center items-start  xl:w-5/12 xl:py-3 py-5 w-full h-full justify-between  `}>
						<ul className="justify-start w-full xl:flex-center xl:gap-6 xl:w-4/6 ">
							{navLinks.map((link) => (
								<li key={link.label}>
									<NavLink
										className="navLink "
										to={link.href}
										onClick={() => handleActiveNav(link.label)}>
										<span className={` relative  ${link.label === activeNav ? "navActive" : "navNotActive"} `}>{link.label}</span>
									</NavLink>
								</li>
							))}
						</ul>
						<div className="self-end w-2/6 flex-center xl:justify-end xl:self-center xl:w-2/6">
							{navIconLinks.map((navIcon) => (
								<Link
									key={navIcon.label}
									to={navIcon.href}
									className={`grid-center block ml-1 w-[30px] relative ${
										currentPath === `/${navIcon.href}` ? "navActive" : "navNotActive"
									}`}
									onClick={() => handleActiveNav()}>
									<span
										className={`z-20 ${
											showIconNum ? "absolute" : "hidden"
										} -top-1 bg-tertiary-100  text-sm text-primary rounded-full font-medium  ${
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
									<SvgIcon icon={navIcon.icon(`w-8 h-8 text-secondary ${currentPath === `/${navIcon.href}` ? "fill-secondary" : ""}`)} />
								</Link>
							))}

							<Link
								to={"#"}
								className="grid-center block ml-1 w-[30px] relative navNotActive "
								onClick={() => setUserIconFocus(!userIconFocus)}
								onBlur={() =>
									setTimeout(() => {
										setUserIconFocus(false);
									}, 150)
								}>
								<SvgIcon icon={user()} />
								{userIconFocus && (
									<span className="absolute bottom-[150%] xl:top-[110%]  right-0 w-[150px] z-[100]">
										<Link
											to={"/signin"}
											className="justify-start gap-2 p-2 flex-center bg-extraColor hover:font-medium"
											onClick={() => handleActiveNav()}>
											<SvgIcon icon={signIn("w-7 h-7")} /> <p>Log In</p>
										</Link>
										<Link
											to={"/signup"}
											className="justify-start gap-2 p-2 flex-center bg-extraColor hover:font-medium"
											onClick={() => handleActiveNav()}>
											<SvgIcon icon={signUp("w-7 h-7")} /> <p>Sign Up</p>
										</Link>
									</span>
								)}
							</Link>
						</div>
					</div>
				</nav>
			</header>
		</>
	);
};

export default Navbar;
