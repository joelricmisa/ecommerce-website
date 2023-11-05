import { NavLink, Link, useLocation } from "react-router-dom";
import { navLinks, navIconLinks, shopProductsData } from "../constants";
import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../contexts/ShopContext";
import useAuth from "../hooks/useAuth";
import {
    FaBars,
    FaMagnifyingGlass,
    FaRegUser,
    FaUserPlus,
} from "react-icons/fa6";
import { FaCog, FaRegListAlt, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";

const Navbar = () => {
    const location = useLocation();
    const { cartItems, wishlistItems, setCategory } = useContext(ShopContext);

    const [currentPath, setCurrentPath] = useState(location.pathname);
    const currentActive = navLinks.filter(
        (link) =>
            (link.href.includes("/") ? `${link.href}` : `/${link.href}`) ===
            currentPath,
    );
    const [activeNav, setActiveNav] = useState(currentActive[0]?.label);
    const [toggle, setToggle] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [searchFocus, setSearchFocus] = useState(false);
    const [userIconFocus, setUserIconFocus] = useState(false);
    const [showIconNum, setShowIconNum] = useState(true);
    const { auth } = useAuth();

    useEffect(() => {
        setCurrentPath(location.pathname);
        currentActive;
        setActiveNav(currentActive[0]?.label);
    }, [currentActive, currentPath]);

    useEffect(() => {
        const filtered = shopProductsData.filter((product) =>
            product.productName
                .toLowerCase()
                .includes(searchInput.toLowerCase()),
        );

        filtered.length !== 0 ? setSearchResult(filtered) : setSearchResult([]);
    }, [searchInput]);

    const handleActiveNav = (label = "") => {
        setActiveNav(label);
        setToggle(!toggle);
        setCategory("all");
    };

    return (
        <>
            <header className="border-bottom sticky top-0 z-50 bg-primary shadow-md">
                <div className="flex-center w-full flex-col justify-evenly bg-secondary p-2 text-center text-primary xl:flex-row xl:p-4">
                    <p>
                        Summer Sale For All Swim Suits And Free Express Delivery
                        - OFF 50%!
                        <Link to="/products" className="link ml-2">
                            ShopNow
                        </Link>
                    </p>
                    <select
                        className="cursor-pointer self-end bg-secondary px-2 text-sm"
                        name="english"
                        id=""
                    >
                        <option value="english">English</option>
                        <option value="tagalog">Tagalog</option>
                    </select>
                </div>
                <div className="flex-between padding-x w-full py-3 xl:hidden ">
                    <NavLink to="/" className="font-inter text-2xl font-bold">
                        Exclusive
                    </NavLink>
                    <button
                        className="flex-center xl:hidden"
                        onClick={() => setToggle(!toggle)}
                    >
                        <FaBars />
                    </button>
                </div>
                <nav
                    className={`${
                        toggle
                            ? "visible fixed top-0 z-50 h-[100dvh] w-full bg-primary xl:static xl:h-auto"
                            : "invisible h-0 xl:visible  xl:h-auto"
                    } padding-x flex flex-col transition-all xl:h-auto  xl:flex-row xl:items-center xl:border-b-2`}
                >
                    <div className="flex-between w-full py-3 xl:w-3/12 ">
                        <NavLink
                            to="/"
                            className="font-inter text-2xl font-bold"
                        >
                            Exclusive
                        </NavLink>
                        <button
                            className="flex-center xl:hidden"
                            onClick={() => setToggle(!toggle)}
                        >
                            <FaBars />{" "}
                        </button>
                    </div>

                    <div
                        className={`flex-center relative w-full  justify-start  xl:w-4/12`}
                    >
                        <label
                            htmlFor="search"
                            className="relative block w-full xl:w-11/12 "
                        >
                            <span className="sr-only">Search</span>
                            <button
                                type="button"
                                className="flex-center absolute inset-y-0 right-0 p-2 pr-4"
                            >
                                <FaMagnifyingGlass />
                            </button>
                            <input
                                className="input rounded-md border border-slate-300 py-2 pr-9 placeholder:text-sm placeholder:text-slate-400"
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
                            <div className="absolute top-[100%] z-50 w-full rounded-md bg-extraColor xl:w-11/12">
                                {searchResult.length === 0 ? (
                                    <span className="searchResultLink ">
                                        No results found <FaMagnifyingGlass />
                                    </span>
                                ) : (
                                    searchResult.map((item, index) => (
                                        <Link
                                            key={index}
                                            className="searchResultLink "
                                            to={`/products/${item.id}`}
                                            onClick={() => {
                                                setSearchFocus(false);
                                                setToggle(!toggle);
                                                setSearchInput("");
                                            }}
                                        >
                                            {item.productName}
                                            <FaMagnifyingGlass />
                                        </Link>
                                    ))
                                )}
                            </div>
                        )}
                    </div>

                    <div
                        className={`flex-center h-full w-full flex-col items-start  justify-between py-5 xl:w-5/12 xl:flex-row xl:items-center xl:py-3  `}
                    >
                        <ul className="xl:flex-center w-full justify-start xl:w-4/6 xl:gap-6 ">
                            {navLinks.map((link) => (
                                <li key={link.label}>
                                    <NavLink
                                        className="navLink "
                                        to={link.href}
                                        onClick={() =>
                                            handleActiveNav(link.label)
                                        }
                                    >
                                        <span
                                            className={` relative  ${
                                                link.label === activeNav
                                                    ? "navActive"
                                                    : "navNotActive"
                                            } `}
                                        >
                                            {link.label}
                                        </span>
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                        <div className="flex-center w-full justify-end xl:w-2/6 ">
                            {navIconLinks.map((navIcon) => (
                                <Link
                                    key={navIcon.label}
                                    to={navIcon.href}
                                    className={`grid-center relative ml-1  w-[30px] ${
                                        currentPath === `/${navIcon.href}`
                                            ? "navActive"
                                            : "navNotActive"
                                    }`}
                                    onClick={() => handleActiveNav()}
                                >
                                    <span
                                        className={`z-20 ${
                                            showIconNum ? "absolute" : "hidden"
                                        } -top-2 rounded-full  bg-tertiary-100 text-sm font-medium text-primary  ${
                                            navIcon.storageName ===
                                            "wishlistItems"
                                                ? wishlistItems.length <= 99
                                                    ? "-right-2 px-1.5"
                                                    : "-right-4 px-1"
                                                : navIcon.storageName ===
                                                  "cartItems"
                                                ? cartItems.length <= 99
                                                    ? "-right-2 px-1.5"
                                                    : "-right-4 px-1"
                                                : ""
                                        } `}
                                    >
                                        {navIcon.storageName === "wishlistItems"
                                            ? wishlistItems.length <= 99
                                                ? wishlistItems.length
                                                : "99"
                                            : navIcon.storageName ===
                                              "cartItems"
                                            ? cartItems.length <= 99
                                                ? cartItems.length
                                                : "99"
                                            : ""}
                                    </span>
                                    {navIcon.icon}
                                </Link>
                            ))}

                            <Link
                                to={"#"}
                                className=" navNotActive grid-center relative ml-1 w-[30px]  "
                                onClick={() => setUserIconFocus(!userIconFocus)}
                                onBlur={() =>
                                    setTimeout(() => {
                                        setUserIconFocus(false);
                                    }, 150)
                                }
                            >
                                <FaRegUser className="text-2xl" />
                                {userIconFocus && (
                                    <span className="absolute bottom-[150%] right-0  z-[100] w-[170px] xl:top-[110%]">
                                        {auth?.user ? (
                                            <>
                                                <Link
                                                    to={"/account"}
                                                    className="userIconLink"
                                                    onClick={() =>
                                                        handleActiveNav()
                                                    }
                                                >
                                                    <FaCog className="mr-2 text-3xl" />
                                                    <p>Manage My Account</p>
                                                </Link>
                                                <Link
                                                    to={"/"}
                                                    className="userIconLink"
                                                    onClick={() =>
                                                        handleActiveNav()
                                                    }
                                                >
                                                    <FaRegListAlt className="mr-2 text-xl" />
                                                    <p>My Order</p>
                                                </Link>
                                                <Link
                                                    to={"/"}
                                                    className="userIconLink"
                                                    onClick={() =>
                                                        handleActiveNav()
                                                    }
                                                >
                                                    <FaSignOutAlt className="mr-2 text-xl" />
                                                    <p>Logout</p>
                                                </Link>
                                            </>
                                        ) : (
                                            <>
                                                <Link
                                                    to={"/signin"}
                                                    className="userIconLink"
                                                    onClick={() =>
                                                        handleActiveNav()
                                                    }
                                                >
                                                    <FaSignInAlt className="mr-2 text-xl" />
                                                    <p>Log In</p>
                                                </Link>
                                                <Link
                                                    to={"/signup"}
                                                    className="userIconLink"
                                                    onClick={() =>
                                                        handleActiveNav()
                                                    }
                                                >
                                                    <FaUserPlus className="mr-2 text-xl" />
                                                    <p>Sign Up</p>
                                                </Link>
                                            </>
                                        )}
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
