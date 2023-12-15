import {
    product,
    product2,
    product3,
    product4,
    product5,
    product6,
    product7,
    product8,
    product9,
    product10,
    product11,
    product12,
    product13,
    product14,
    product15,
    product16,
    fiveStar,
    fourHalfStar,
    fourStar,
    threeStar,
    person1,
    person2,
    person3,
    hero1,
    hero2,
    hero3,
    hero4,
    hero5,
    playStation,
    attractiveWoman,
    speaker,
    gucciPerfume,
} from "../assets/images";

import {
    FaBagShopping,
    FaCamera,
    FaCartShopping,
    FaComputer,
    FaDollarSign,
    FaGamepad,
    FaHeadphones,
    FaHeadset,
    FaHeart,
    FaInstagram,
    FaLinkedinIn,
    FaMobileScreen,
    FaRegCircleCheck,
    FaRegHeart,
    FaSackDollar,
    FaSquareCheck,
    FaStore,
    FaTruckFast,
    FaXTwitter,
} from "react-icons/fa6";

import { GiWatch } from "react-icons/gi";

export const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/contact", label: "Contact" },
    { href: "/about", label: "About" },
];

export const navIconLinks = [
    {
        href: "/wishlist",
        label: "Wishlist",
        icon: <FaRegHeart className="text-2xl" />,
        storageName: "wishlistItems",
    },
    {
        href: "/cart",
        label: "Cart",
        icon: <FaCartShopping className="text-2xl" />,
        storageName: "cartItems",
    },
];

export const sideLinks = [
    { label: "Women's Fashion", category: "Women's Fashion" },
    { label: "Men's Fashion", category: "Men's Fashion" },
    { label: "Electronics", category: "Electronics" },
    { label: "Home & Lifestyle", category: "Home & Lifestyle" },
    { label: "Medicine", category: "Medicine" },
    { label: "Sports & Outdoor", category: "Sports & Outdoor" },
    { label: "Baby’s & Toys", category: "Baby’s & Toys" },
    { label: "Groceries & Pets", category: "Groceries & Pets" },
    { label: "Health & Beauty", category: "Health & Beauty" },
];

export const HeroData = [
    { title: "iPhone 14 ", voucher: 10, img: hero1 },
    { title: "CANON Camera ", voucher: 25, img: hero2 },
    { title: "BOSE Headphone ", voucher: 40, img: hero3 },
    { title: "Sony Gamepad ", voucher: 50, img: hero4 },
    { title: "ASUS Laptop", voucher: 15, img: hero5 },
];

export const NewArrivalData = [
    {
        title: "PlayStation 5",
        description: "Black and White version of the PS5 coming out on sale.",
        img: playStation,
    },
    {
        title: "Women’s Collections",
        description: "Featured woman collections that give you another vibe.",
        img: attractiveWoman,
    },
    {
        title: "Speakers",
        description: "Amazon wireless speakers.",
        img: speaker,
    },
    {
        title: "Perfume",
        description: "Gucci Intense Oud Edp",
        img: gucciPerfume,
    },
];

export const browseByCategory = [
    {
        categoryName: "Phones",
        categoryImage: <FaMobileScreen className="text-3xl" />,
    },
    {
        categoryName: "Computers",
        categoryImage: <FaComputer className="text-3xl" />,
    },
    {
        categoryName: "SmartWatch",
        categoryImage: <GiWatch className="text-3xl" />,
    },
    {
        categoryName: "Camera",
        categoryImage: <FaCamera className="text-3xl" />,
    },
    {
        categoryName: "HeadPhones",
        categoryImage: <FaHeadphones className="text-3xl" />,
    },
    {
        categoryName: "Gaming",
        categoryImage: <FaGamepad className="text-3xl" />,
    },
];

export const shopInfo = [
    {
        label: "shop",
        shopInfoIcon: <FaStore className="fill-white text-2xl" />,
        shopInfoNumber: "10.5k ",
        shopInfoDescription: "Active sellers in our site",
    },
    {
        label: "moneySign",
        shopInfoIcon: <FaDollarSign className="fill-white text-2xl" />,
        shopInfoNumber: "33k",
        shopInfoDescription: "Monthly Product Sales",
    },
    {
        label: "shoppingBag",
        shopInfoIcon: <FaBagShopping className="fill-white text-2xl" />,
        shopInfoNumber: "45.5k",
        shopInfoDescription: "Active customers in our site",
    },
    {
        label: "moneyBag",
        shopInfoIcon: <FaSackDollar className="fill-white text-2xl" />,
        shopInfoNumber: "25k",
        shopInfoDescription: "Anual gross sales in our site",
    },
];
export const services = [
    {
        serviceImg: <FaTruckFast className=" fill-white text-4xl" />,
        serviceTitle: "FREE AND FAST DELIVERY",
        serviceDescription: "Free delivery for all orders over $140",
    },
    {
        serviceImg: <FaHeadset className=" fill-white text-4xl" />,
        serviceTitle: "24/7 CUSTOMER SERVICE",
        serviceDescription: "Friendly 24/7 customer support",
    },
    {
        serviceImg: <FaRegCircleCheck className="fill-white  text-4xl " />,
        serviceTitle: "MONEY BACK GUARANTEE",
        serviceDescription: "We reurn money within 30 days",
    },
];

export const people = [
    {
        personImg: person1,
        personName: "John Doe",
        position: "Founder & Chairman",
    },
    {
        personImg: person2,
        personName: "Jane Watson",
        position: "Managing Director",
    },
    {
        personImg: person3,
        personName: "Mike Rose",
        position: "Product Designer",
    },
];

export const socials = [
    {
        name: "Twitter",
        icon: <FaXTwitter />,
    },
    {
        name: "Instagram",
        icon: <FaInstagram />,
    },
    {
        name: "LinkedIn",
        icon: <FaLinkedinIn />,
    },
];

export const footerLinks = [
    {
        title: "Exclusive",
        links: [
            { href: "", label: "Subscribe" },
            { href: "", label: "Get 10% off your first order" },
        ],
    },
    {
        title: "Support",
        links: [
            {
                href: "",
                label: "20 Aurora Compound St., Metro Manila, Marikina, Philippines.",
            },
            { href: "", label: "exclusive@gmail.com" },
            { href: "", label: "+99075-11111-77777" },
        ],
    },
    {
        title: "Account",
        links: [
            { href: "", label: "My Account" },
            { href: "", label: "Login / Register" },
            { href: "", label: "Cart" },
            { href: "", label: "Wishlist" },
            { href: "", label: "Shop" },
            { href: "", label: "" },
        ],
    },
    {
        title: "Quick Link",
        links: [
            { href: "", label: "Privacy Policy" },
            { href: "", label: "Terms Of Use" },
            { href: "", label: "FAQ" },
            { href: "", label: "Contact" },
        ],
    },
    {
        title: "Download App",
        links: [{ href: "", label: "Save $3 with App New User Only" }],
    },
];

export const billingDetails = [
    {
        id: "name",
        label: "Name",
        type: "text",
    },
    {
        id: "street",
        label: "Street Address",
        type: "text",
    },
    {
        id: "apartment",
        label: "Apartment, floor, etc. (optional)",
        type: "text",
    },
    {
        id: "city",
        label: "Town/City",
        type: "text",
    },
    {
        id: "phone",
        label: "Phone Number",
        type: "number",
    },
    {
        id: "email",
        label: "Email Address",
        type: "email",
    },
];
