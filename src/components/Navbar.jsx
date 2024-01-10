import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { FaBars } from "react-icons/fa6";
import { NavLinks, SearchBar, NavIcons } from "./index";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const headerStyle = `border-bottom sticky top-0 z-50 bg-primary shadow-md`;
    const promoBoxStyle = `flex-center w-full flex-col justify-evenly bg-secondary p-2 text-center text-primary xl:flex-row xl:p-4`;
    const navBoxStyle = `padding-x flex flex-col transition-all xl:h-auto  xl:flex-row xl:items-center xl:border-b-2`;
    const menuOpenStyle = `visible fixed top-0 z-50 h-[100dvh] w-full bg-primary xl:static xl:h-auto`;
    const menuCloseStyle = `invisible h-0 xl:visible  xl:h-auto`;
    const searchBoxStyle = `flex-center relative w-full  justify-start  xl:w-4/12`;
    const navLinkandIconBoxStyle = `flex-center h-full w-full flex-col items-start  justify-between py-5 xl:w-5/12 xl:flex-row xl:items-center xl:py-3`;

    return (
        <>
            <header className={headerStyle}>
                {/* promo banner */}
                <div className={promoBoxStyle}>
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
                {/* navbar initial when width < 1285 px */}
                <div className="flex-between padding-x w-full py-3 xl:hidden ">
                    <NavLink to="/" className="font-inter text-2xl font-bold">
                        Exclusive
                    </NavLink>
                    <button
                        className="flex-center xl:hidden"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <FaBars />
                    </button>
                </div>
                {/* navbar initial when width > 1285 px and when the menu is open */}
                <nav
                    className={`${navBoxStyle} ${
                        isMenuOpen ? menuOpenStyle : menuCloseStyle
                    } `}
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
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <FaBars />
                        </button>
                    </div>

                    <div className={searchBoxStyle}>
                        <SearchBar />
                    </div>

                    <div className={navLinkandIconBoxStyle}>
                        <NavLinks
                            setIsMenuOpen={() => setIsMenuOpen(!isMenuOpen)}
                        />

                        <NavIcons
                            setIsMenuOpen={() => setIsMenuOpen(!isMenuOpen)}
                        />
                    </div>
                </nav>
            </header>
        </>
    );
};

export default Navbar;
