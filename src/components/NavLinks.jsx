import React, { useContext } from "react";
import { ShopContext } from "../contexts/ShopContext";
import { NavLink, useLocation } from "react-router-dom";
import { navLinks } from "../constants";
import { useCategory } from "../hooks";

const NavLinks = ({ setIsMenuOpen }) => {
    const location = useLocation();
    const currentPath = location.pathname;
    const { setCategory } = useCategory();

    const currentActive = navLinks.filter((link) => link.href === currentPath);
    const activeNav = currentActive[0]?.label;

    const navLinkBoxStyle = `xl:flex-center w-full justify-start xl:w-4/6 xl:gap-6`;

    return (
        <ul className={navLinkBoxStyle}>
            {navLinks.map((link) => (
                <li key={link.label}>
                    <NavLink
                        className="navLink"
                        to={link.href}
                        onClick={() => {
                            setCategory("all");
                            setIsMenuOpen();
                        }}
                    >
                        <span
                            className={`relative ${
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
    );
};

export default NavLinks;
