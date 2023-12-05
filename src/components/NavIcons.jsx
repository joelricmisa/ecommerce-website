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
import useAuth from "../hooks/useAuth";
import useLogout from "../hooks/useLogout";

const NavIcons = () => {
    const { cartItems, wishlistItems } = useContext(ShopContext);

    const RenderNavIconLink = ({ label, href, icon, storageName }) => {
        const location = useLocation();
        const currentPath = location.pathname;

        return (
            <NavLink
                key={label}
                to={href}
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
                        ? wishlistItems?.length <= 99
                            ? wishlistItems?.length
                            : "99"
                        : storageName === "cartItems"
                        ? cartItems?.length <= 99
                            ? cartItems?.length
                            : "99"
                        : ""}
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
            <Link
                role="button"
                to={"#"}
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
                                >
                                    <FaUserGear className={iconStyle} />

                                    <p>Account</p>
                                </Link>

                                <Link
                                    to={"/"}
                                    className={userIconLinkStyle}
                                    onClick={() => {
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
                                >
                                    <FaSignInAlt className={iconStyle} />
                                    <p>Log In</p>
                                </Link>

                                <Link
                                    to={"/signup"}
                                    className={userIconLinkStyle}
                                >
                                    <FaUserPlus className={iconStyle} />
                                    <p>Sign Up</p>
                                </Link>
                            </>
                        )}
                    </span>
                )}
            </Link>
        );
    };

    return (
        <div className="flex-center w-full justify-end xl:w-2/6 ">
            {navIconLinks.map((navIcon) => (
                <RenderNavIconLink {...navIcon} />
            ))}

            {<RenderUserIconSection />}
        </div>
    );
};

export default NavIcons;
