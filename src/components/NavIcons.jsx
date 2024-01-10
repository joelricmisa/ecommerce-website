import React, { useContext, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
    FaCircleUser,
    FaRegUser,
    FaUserPlus,
    FaUserGear,
} from "react-icons/fa6";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { ShopContext } from "../contexts/ShopContext";
import { navIconLinks } from "../constants";
import { useAuth, useLogout, useWishlist } from "../hooks";

const NavIcons = ({ setIsMenuOpen }) => {
    const { cartItems } = useContext(ShopContext);
    const { wishlistItems } = useWishlist();

    const RenderNavIconLink = ({ label, href, icon, storageName }) => {
        const location = useLocation();
        const currentPath = location.pathname;

        return (
            <NavLink
                key={label}
                to={href}
                onClick={setIsMenuOpen}
                className={`grid-center relative ml-1  w-[30px] ${
                    currentPath === href ? "navActive" : "navNotActive"
                }`}
            >
                <span
                    className={`absolute -top-2 z-20 rounded-full  bg-tertiary-100 text-sm font-medium text-primary  ${
                        wishlistItems?.length || cartItems?.length <= 99
                            ? "-right-2 px-1.5"
                            : "-right-4 px-1"
                    } `}
                >
                    {storageName === "wishlistItems"
                        ? wishlistItems?.length
                        : cartItems?.length}
                </span>
                {icon}
            </NavLink>
        );
    };

    const RenderUserIconSection = () => {
        const { auth } = useAuth();
        const [userIconFocus, setUserIconFocus] = useState(false);
        const handleLogout = useLogout();

        const iconStyle = "mr-2 text-xl";
        const userIconLinkStyle =
            "flex-center cursor-pointer justify-start gap-2 bg-extraColor p-2 px-4 hover:font-medium";

        return (
            <button
                type="button"
                className=" navNotActive grid-center relative ml-1 w-[30px]  "
                onClick={() => setUserIconFocus(!userIconFocus)}
                onBlur={() =>
                    setTimeout(() => {
                        setUserIconFocus(false);
                    }, 150)
                }
            >
                {/* display user icon  */}
                {!auth ? (
                    <FaRegUser className=" text-2xl" />
                ) : (
                    <FaCircleUser className=" text-2xl" />
                )}

                {/* display when user icon is click  */}
                {userIconFocus && (
                    <span className="absolute bottom-[150%] right-0  z-[100] w-[170px] xl:top-[110%]">
                        {auth ? (
                            <>
                                <Link
                                    to={"/account"}
                                    className={userIconLinkStyle}
                                    onClick={setIsMenuOpen}
                                >
                                    <FaUserGear className={iconStyle} />

                                    <p>Account</p>
                                </Link>

                                <Link
                                    to={"/"}
                                    className={userIconLinkStyle}
                                    onClick={() => {
                                        setIsMenuOpen();
                                        handleLogout();
                                    }}
                                >
                                    <FaSignOutAlt className={iconStyle} />
                                    <p>Logout</p>
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link
                                    to={"/signin"}
                                    className={userIconLinkStyle}
                                    onClick={setIsMenuOpen}
                                >
                                    <FaSignInAlt className={iconStyle} />
                                    <p>Log In</p>
                                </Link>

                                <Link
                                    to={"/signup"}
                                    className={userIconLinkStyle}
                                    onClick={setIsMenuOpen}
                                >
                                    <FaUserPlus className={iconStyle} />
                                    <p>Sign Up</p>
                                </Link>
                            </>
                        )}
                    </span>
                )}
            </button>
        );
    };

    return (
        <div className="flex-center w-full justify-end xl:w-2/6 ">
            {navIconLinks.map((navIcon, index) => (
                <RenderNavIconLink {...navIcon} key={index} />
            ))}

            {<RenderUserIconSection />}
        </div>
    );
};

export default NavIcons;
